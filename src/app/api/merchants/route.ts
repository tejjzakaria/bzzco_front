import dbConnect from '../../../lib/dbConnect';
import Merchant from '../../../models/Merchant';
import '../../../models/Categories'; // Ensure Category model is registered
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
        const merchants = await Merchant.find({ status: 'active' })
            .sort({ createdAt: -1 })
            .populate('category');
        return NextResponse.json(merchants, {
            headers: getRateLimitHeaders(rateLimitResult)
        });
    } catch (error) {
        console.error('Merchant API error:', error);
        return NextResponse.json({ error: 'Failed to fetch merchants', details: typeof error === 'object' && error !== null ? (error as Error).message : String(error) }, { status: 500 });
    }
}
