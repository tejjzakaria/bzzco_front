import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Categories";
import { NextRequest, NextResponse } from "next/server";
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
        const categories = await Category.find({ status: "active" });
        return NextResponse.json(categories, {
            headers: getRateLimitHeaders(rateLimitResult)
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
