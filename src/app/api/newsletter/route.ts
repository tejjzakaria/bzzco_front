import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import NewsletterSubscriber from '../../../models/NewsletterSubscriber';

export async function POST(req: Request) {
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
    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
