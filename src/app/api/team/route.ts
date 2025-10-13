import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Team from '@/models/Team';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

// GET - Get all active team members (Public)
export async function GET(req: NextRequest) {
  // Apply protection
  const authError = protectRoute(req, { checkOrigin: true });
  if (authError) return authError;

  // Apply rate limiting (60 requests per minute)
  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 60 });
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

    // Build query - only show active members by default for public
    // Allow admin to see all statuses if they provide status param
    const query: { status?: string } =
      status && ['active', 'inactive'].includes(status)
        ? { status }
        : { status: 'active' };

    const teamMembers = await Team
      .find(query)
      .sort({ createdAt: 1 }) // Show oldest members first (founding team)
      .select('-email -__v'); // Don't expose email addresses publicly

    return NextResponse.json(
      {
        teamMembers,
        total: teamMembers.length
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST - Create new team member (Admin only - requires API key)
export async function POST(req: NextRequest) {
  // Require API key for admin actions
  const authError = protectRoute(req, { checkOrigin: true, requireApiKey: true });
  if (authError) return authError;

  // Apply stricter rate limiting for POST
  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 10 });
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
    const requiredFields = ['name', 'role', 'email'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if email already exists
    const existingMember = await Team.findOne({ email: data.email });
    if (existingMember) {
      return NextResponse.json(
        { error: 'A team member with this email already exists.' },
        { status: 409 }
      );
    }

    // Create new team member
    const teamMember = await Team.create({
      name: data.name,
      role: data.role,
      status: data.status || 'active',
      email: data.email,
      linkedin: data.linkedin,
      image: data.image
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Team member added successfully!',
        teamMember
      },
      {
        status: 201,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member. Please try again.' },
      { status: 500 }
    );
  }
}
