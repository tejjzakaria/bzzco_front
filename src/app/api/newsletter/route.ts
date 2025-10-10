import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import NewsletterSubscriber from '../../../models/NewsletterSubscriber';
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
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    // Prevent duplicate subscriptions
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
    }
    const subscriber = await NewsletterSubscriber.create({ email });
    return NextResponse.json({ success: true, subscriber }, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
