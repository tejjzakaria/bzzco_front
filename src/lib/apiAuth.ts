import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates that the request is coming from the same origin (your app)
 * This prevents direct API calls from external sources
 */
export function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  // In production, check against your actual domain
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    `https://${host}`,
    `http://${host}`,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);

  // Allow requests from same origin
  if (origin && allowedOrigins.some(allowed => origin.includes(allowed as string))) {
    return true;
  }

  // Allow requests with referer from same domain
  if (referer && allowedOrigins.some(allowed => referer.includes(allowed as string))) {
    return true;
  }

  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    if (origin?.includes('localhost') || referer?.includes('localhost')) {
      return true;
    }
  }

  return false;
}

/**
 * Validates API key for server-to-server requests
 */
export function validateApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.API_SECRET_KEY;

  if (!validApiKey) {
    // If no API key is configured, skip this check
    return true;
  }

  return apiKey === validApiKey;
}

/**
 * Middleware to protect API routes
 * Returns null if valid, or NextResponse with error if invalid
 */
export function protectRoute(req: NextRequest, options: {
  requireApiKey?: boolean;
  checkOrigin?: boolean;
} = {}): NextResponse | null {
  const { requireApiKey = false, checkOrigin = true } = options;

  // Check origin/referer
  if (checkOrigin && !validateOrigin(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid origin' },
      { status: 403 }
    );
  }

  // Check API key if required
  if (requireApiKey && !validateApiKey(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid API key' },
      { status: 401 }
    );
  }

  return null;
}

/**
 * Check if request is from server-side (not browser)
 */
export function isServerRequest(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') || '';
  const hasApiKey = req.headers.get('x-api-key');

  // If it has an API key, treat as server request
  if (hasApiKey) return true;

  // Check if it looks like a server request (no browser user agent)
  return !userAgent.includes('Mozilla');
}
