import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

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

  try {
    console.log('[API] Connecting to MongoDB...');
    await connectToDatabase();
    console.log('[API] Connected. Fetching products...');
    const products = await Product.find({});
    console.log(`[API] Retrieved ${products.length} products.`);

    return NextResponse.json(products, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (error) {
    console.error('[API] Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
