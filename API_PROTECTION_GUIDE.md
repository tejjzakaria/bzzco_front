# API Protection Guide

This guide explains how your APIs are now protected and how to use them.

## Security Features Implemented

### 1. **Origin Validation**
- APIs only accept requests from your own domain
- Blocks direct external API calls
- Works in both development and production

### 2. **Rate Limiting**
- Prevents abuse by limiting requests per IP/API key
- Different limits for different endpoints:
  - GET requests: 60 per minute
  - POST requests: 10 per minute
  - Admin endpoints: 30 per minute

### 3. **API Key Authentication** (Optional)
- Sensitive endpoints require API keys
- Example: GET /api/orders requires API key

### 4. **Automatic Protection**
- All protected routes return proper HTTP status codes:
  - `401 Unauthorized`: Invalid API key
  - `403 Forbidden`: Invalid origin
  - `429 Too Many Requests`: Rate limit exceeded

## Environment Variables

Add these to your `.env.local` file:

```bash
# Optional: Only needed if you want to enforce API key authentication
API_SECRET_KEY=your_secret_key_here

# Set your production URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## How to Apply Protection to New API Routes

Here's an example of a protected API route:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { protectRoute } from '@/lib/apiAuth';
import { rateLimit, getRateLimitHeaders } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  // Apply origin validation
  const authError = protectRoute(req, {
    checkOrigin: true,      // Validate origin/referer
    requireApiKey: false    // Set to true for sensitive endpoints
  });
  if (authError) return authError;

  // Apply rate limiting
  const rateLimitResult = rateLimit(req, {
    interval: 60000,    // 1 minute
    maxRequests: 60     // max requests per interval
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  // Your API logic here...
  const data = { message: 'Hello World' };

  return NextResponse.json(data, {
    headers: getRateLimitHeaders(rateLimitResult)
  });
}
```

## Making API Calls from Your Frontend

No changes needed! Your frontend code will work as-is since requests come from the same origin:

```typescript
// This works fine - same origin
const response = await fetch('/api/products');
const data = await response.json();
```

## Making Server-to-Server Calls (with API Key)

For endpoints that require API keys:

```typescript
const response = await fetch('https://yourdomain.com/api/orders', {
  headers: {
    'x-api-key': process.env.API_SECRET_KEY
  }
});
```

## Protected Endpoints

### Public Endpoints (Origin Check + Rate Limit)
- `GET /api/products` - 60 req/min
- `GET /api/pages` - 60 req/min
- `GET /api/categories` - 60 req/min
- `GET /api/merchants` - 60 req/min
- `POST /api/contact` - 10 req/min
- `POST /api/newsletter` - 10 req/min
- `POST /api/orders` - 10 req/min

### Admin Endpoints (Origin Check + API Key + Rate Limit)
- `GET /api/orders` - 30 req/min (requires API key)

## Testing Protection

### Test Origin Protection
Try calling your API from a different domain or using curl:

```bash
# This should be blocked (403 Forbidden)
curl https://yourdomain.com/api/products
```

### Test Rate Limiting
Make rapid requests to see rate limiting in action:

```bash
# Make 100 requests quickly
for i in {1..100}; do
  curl https://yourdomain.com/api/products
done
```

After 60 requests in a minute, you'll get a 429 error.

## Production Deployment

### Vercel Environment Variables

Add to your Vercel project settings:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `API_SECRET_KEY` (optional, for admin endpoints)
   - `NEXT_PUBLIC_APP_URL` (your production domain)

### Vercel Automatically Sets
- `VERCEL_URL` - Automatically set by Vercel

## Customizing Protection

### Adjust Rate Limits

Edit the limits in your route files:

```typescript
const rateLimitResult = rateLimit(req, {
  interval: 300000,  // 5 minutes instead of 1
  maxRequests: 100   // 100 requests instead of 60
});
```

### Disable Origin Check (Not Recommended)

```typescript
const authError = protectRoute(req, {
  checkOrigin: false  // Allows external calls
});
```

### Add API Key Requirement

```typescript
const authError = protectRoute(req, {
  checkOrigin: true,
  requireApiKey: true  // Now requires API key
});
```

## Troubleshooting

### "Invalid origin" error in development
- Make sure you're accessing via `localhost` or `127.0.0.1`
- The protection automatically allows localhost in development

### "Invalid API key" error
- Check that `API_SECRET_KEY` is set in `.env.local`
- Verify you're sending the correct header: `x-api-key`

### Rate limit too strict
- Adjust the `maxRequests` and `interval` parameters
- Consider implementing Redis-based rate limiting for production

## Upgrading to Redis Rate Limiting (Production)

For production with multiple servers, consider Redis:

```bash
npm install @upstash/redis
```

Update `src/lib/rateLimit.ts` to use Redis instead of in-memory storage.

## Security Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Keep API keys in environment variables
3. ✅ Never commit `.env.local` to git
4. ✅ Use different API keys for different environments
5. ✅ Monitor rate limit metrics
6. ✅ Regularly rotate API keys
7. ✅ Use CORS headers appropriately
8. ✅ Validate and sanitize all inputs

## Next Steps

1. Add API key authentication to sensitive endpoints
2. Consider implementing user authentication (JWT/sessions)
3. Add request logging and monitoring
4. Implement Redis for distributed rate limiting
5. Add API versioning
6. Create admin dashboard for monitoring API usage
