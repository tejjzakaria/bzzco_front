import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import JobApplication from '../../../models/JobApplication';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const BUCKET = process.env.S3_BUCKET_NAME;

export async function POST(req: NextRequest) {
  // Apply protection
  const authError = protectRoute(req, { checkOrigin: true });
  if (authError) return authError;

  // Apply very strict rate limiting for file uploads (5 requests per minute)
  const rateLimitResult = rateLimit(req, { interval: 60000, maxRequests: 5 });
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
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const cv = formData.get('cv');

    if (!name || !email || !phoneNumber || !cv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload CV to S3
    const cvFile = cv as File;
    const buffer = await cvFile.arrayBuffer();
    const fileName = `${Date.now()}_${cvFile.name}`;
    const s3Key = `cvs/${fileName}`;
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      Body: Buffer.from(buffer),
      ContentType: cvFile.type,
      // ACL removed, bucket policy should handle public access
    }));
    const cvUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

    // Save application
    const application = await JobApplication.create({
      name,
      email,
      phoneNumber,
      cvUrl,
    });
    return NextResponse.json({ success: true, application }, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
