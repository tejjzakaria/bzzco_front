import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import ContactMessage from '../../../models/ContactMessage';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const contact = await ContactMessage.create({ name, email, message });
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
