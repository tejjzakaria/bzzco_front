import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
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
  const data = await req.json();
  try {
    const order = await Order.create(data);
    return NextResponse.json(order, {
      status: 201,
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  // Apply protection - require API key for listing all orders
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
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
