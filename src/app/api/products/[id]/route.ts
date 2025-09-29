import { NextResponse, NextRequest } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest, context: { params: { id: string } }): Promise<Response> {
  await connectToDatabase();
  const { params } = context;
  try {
    // Populate vendor (seller) info
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
