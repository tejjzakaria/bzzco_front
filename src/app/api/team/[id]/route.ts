import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Team from '@/models/Team';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

// GET - Get single team member
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = protectRoute(req, { checkOrigin: true });
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
    const teamMember = await Team.findById(id).select('-email -__v');

    if (!teamMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(
      { teamMember },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}

// PATCH - Update team member (Admin only)
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

    // Validate status if provided
    if (data.status && !['active', 'inactive'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Invalid status value. Must be "active" or "inactive"' },
        { status: 400 }
      );
    }

    // Check if email is being changed and if it already exists
    if (data.email) {
      const existingMember = await Team.findOne({
        email: data.email,
        _id: { $ne: id }
      });
      if (existingMember) {
        return NextResponse.json(
          { error: 'A team member with this email already exists.' },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (data.name) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    if (data.status) updateData.status = data.status;
    if (data.email) updateData.email = data.email;
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin;
    if (data.image !== undefined) updateData.image = data.image;

    const teamMember = await Team.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Team member updated successfully',
        teamMember
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE - Delete team member (Admin only)
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
    const teamMember = await Team.findByIdAndDelete(id);

    if (!teamMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Team member deleted successfully'
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
