import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */
export function rateLimit(
  req: NextRequest,
  options: {
    interval: number; // time window in milliseconds
    maxRequests: number; // max requests per interval
  } = { interval: 60000, maxRequests: 60 }
): { success: boolean; remaining: number; resetTime: number } {
  const identifier = getIdentifier(req);
  const now = Date.now();
  const { interval, maxRequests } = options;

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    cleanupStore(now);
  }

  // Get or create rate limit entry
  if (!store[identifier] || store[identifier].resetTime < now) {
    store[identifier] = {
      count: 0,
      resetTime: now + interval,
    };
  }

  const entry = store[identifier];

  // Check if rate limit exceeded
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment counter
  entry.count++;

  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get identifier for rate limiting (IP address or API key)
 */
function getIdentifier(req: NextRequest): string {
  // Use API key if present
  const apiKey = req.headers.get('x-api-key');
  if (apiKey) {
    return `apikey:${apiKey}`;
  }

  // Use IP address
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Clean up expired entries from store
 */
function cleanupStore(now: number): void {
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(
  result: { remaining: number; resetTime: number }
): Record<string, string> {
  return {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };
}
