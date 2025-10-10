import dbConnect from '../../../lib/dbConnect';
import Slider from '../../../models/Slider';
import { NextRequest, NextResponse } from 'next/server';
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

    await dbConnect();
    try {
        const sliders = await Slider.find({ status: 'active' }).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(sliders, {
            headers: getRateLimitHeaders(rateLimitResult)
        });
    } catch (error) {
        console.error('Slider API error:', error);
        return NextResponse.json({ error: 'Failed to fetch sliders', details: typeof error === 'object' && error !== null ? (error as Error).message : String(error) }, { status: 500 });
    }
}
