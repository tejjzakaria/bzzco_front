import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Page from '@/models/Page';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  // Apply protection
  const authError = protectRoute(req, { checkOrigin: true });
  if (authError) return authError;

  // Apply rate limiting
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

  try {
    await connectToDatabase();
    const pages = await Page.find({ status: 'published' }).sort({ order: 1 });
    return NextResponse.json(pages, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (error) {
    console.error('[API] Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
