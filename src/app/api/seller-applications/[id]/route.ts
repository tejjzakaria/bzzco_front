import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SellerApplication from '@/models/SellerApplication';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

// GET - Get single application
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = protectRoute(req, { checkOrigin: true, requireApiKey: true });
  if (authError) return authError;

  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 30 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  await dbConnect();

  try {
    const { id } = await context.params;
    const application = await SellerApplication.findById(id);

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(
      { application },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

// PATCH - Update application status (Admin only)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Require API key for admin actions
  const authError = protectRoute(req, { checkOrigin: true, requireApiKey: true });
  if (authError) return authError;

  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 20 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  await dbConnect();

  try {
    const { id } = await context.params;
    const data = await req.json();
    const { status, rejectionReason, approvalNotes, reviewedBy } = data;

    // Validate status
    if (status && !['pending', 'approved', 'rejected', 'under-review'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // If rejecting, require rejection reason
    if (status === 'rejected' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required when rejecting an application' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      reviewedAt: new Date()
    };

    if (status) updateData.status = status;
    if (rejectionReason) updateData.rejectionReason = rejectionReason;
    if (approvalNotes) updateData.approvalNotes = approvalNotes;
    if (reviewedBy) updateData.reviewedBy = reviewedBy;

    const application = await SellerApplication.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Application ${status || 'updated'} successfully`,
        application
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE - Delete application (Admin only)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = protectRoute(req, { checkOrigin: true, requireApiKey: true });
  if (authError) return authError;

  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 10 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  await dbConnect();

  try {
    const { id } = await context.params;
    const application = await SellerApplication.findByIdAndDelete(id);

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application deleted successfully'
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
