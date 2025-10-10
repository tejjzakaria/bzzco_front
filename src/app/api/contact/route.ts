import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import ContactMessage from '../../../models/ContactMessage';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  // Apply protection
  const authError = protectRoute(req, { checkOrigin: true });
  if (authError) return authError;

  // Apply stricter rate limiting for POST (10 requests per minute)
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
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const contact = await ContactMessage.create({ name, email, message });
    return NextResponse.json({ success: true, contact }, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch {
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
