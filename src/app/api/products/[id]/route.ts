import { NextResponse, NextRequest } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  // Apply protection
  const authError = protectRoute(request, { checkOrigin: true });
  if (authError) return authError;

  // Apply rate limiting (60 requests per minute)
  const rateLimitResult = rateLimit(request, { interval: 60000, maxRequests: 60 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  await connectToDatabase();
  const { id } = await context.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
