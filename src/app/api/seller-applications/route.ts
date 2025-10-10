import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SellerApplication from '@/models/SellerApplication';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

// POST - Submit a new seller application
export async function POST(req: NextRequest) {
  // Apply protection
  const authError = protectRoute(req, { checkOrigin: true });
  if (authError) return authError;

  // Apply stricter rate limiting for POST (5 requests per minute)
  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 5 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  await dbConnect();

  try {
    const data = await req.json();

    // Validate required fields
    const requiredFields = [
      'shopName',
      'ownerName',
      'email',
      'phone',
      'businessType',
      'address',
      'city',
      'postalCode',
      'country',
      'businessDescription',
      'agreementAccepted'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if email already exists
    const existingApplication = await SellerApplication.findOne({ email: data.email });
    if (existingApplication) {
      if (existingApplication.status === 'pending' || existingApplication.status === 'under-review') {
        return NextResponse.json(
          { error: 'An application with this email is already pending review.' },
          { status: 409 }
        );
      }
      if (existingApplication.status === 'approved') {
        return NextResponse.json(
          { error: 'This email is already registered as a seller.' },
          { status: 409 }
        );
      }
    }

    // Create new application
    const application = await SellerApplication.create({
      ...data,
      status: 'pending',
      submittedAt: new Date()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your seller application has been submitted successfully! We will review it and get back to you within 3-5 business days.',
        applicationId: application._id
      },
      {
        status: 201,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  } catch (error) {
    console.error('Seller application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - Get all applications (Admin only - requires API key)
export async function GET(req: NextRequest) {
  // Apply protection with API key requirement
  const authError = protectRoute(req, { checkOrigin: true, requireApiKey: true });
  if (authError) return authError;

  // Apply rate limiting
  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 30 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = {};
    if (status && ['pending', 'approved', 'rejected', 'under-review'].includes(status)) {
      query = { status };
    }

    const applications = await SellerApplication
      .find(query)
      .sort({ submittedAt: -1 })
      .select('-__v');

    return NextResponse.json(
      { applications, total: applications.length },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
