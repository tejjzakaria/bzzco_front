import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    console.log('[API] Connecting to MongoDB...');
    await connectToDatabase();
    console.log('[API] Connected. Fetching products...');
    const products = await Product.find({});
    console.log(`[API] Retrieved ${products.length} products.`);
    return NextResponse.json(products);
  } catch (error) {
    console.error('[API] Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
