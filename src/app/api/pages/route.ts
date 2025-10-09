import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Page from '@/models/Page';

export async function GET() {
  try {
    await connectToDatabase();
    const pages = await Page.find({ status: 'published' }).sort({ order: 1 });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('[API] Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
