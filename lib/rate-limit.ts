/**
 * Simple in-memory rate limiter
 * For production, consider using @vercel/edge-config or Redis
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per interval
}

/**
 * Rate limiter for API routes
 *
 * Usage:
 * const limiter = rateLimit({ interval: 60000, maxRequests: 10 })
 * const result = await limiter.check(request, 'unique-identifier')
 */
export function rateLimit(options: RateLimitOptions) {
  const { interval, maxRequests } = options;

  return {
    check: async (request: Request, identifier?: string): Promise<void> => {
      // Get identifier from IP or custom identifier
      let key = identifier;

      if (!key) {
        // Try to get IP from headers
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
        key = ip;
      }

      const now = Date.now();
      const record = store[key];

      // Clean up old records (simple cleanup)
      if (record && now > record.resetTime) {
        delete store[key];
      }

      // Initialize or get current record
      const current = store[key] || {
        count: 0,
        resetTime: now + interval,
      };

      // Check if limit exceeded
      if (current.count >= maxRequests) {
        const retryAfter = Math.ceil((current.resetTime - now) / 1000);
        throw new RateLimitError(
          `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
          retryAfter
        );
      }

      // Increment counter
      current.count++;
      store[key] = current;
    },
  };
}

/**
 * Custom error for rate limiting
 */
export class RateLimitError extends Error {
  public retryAfter: number;

  constructor(message: string, retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Helper to handle rate limit errors in API routes
 */
export function handleRateLimitError(error: unknown) {
  if (error instanceof RateLimitError) {
    return {
      status: 429,
      body: {
        error: error.message,
        retryAfter: error.retryAfter,
      },
      headers: {
        'Retry-After': error.retryAfter.toString(),
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
      },
    };
  }
  throw error;
}

/**
 * Cleanup old records (call periodically if needed)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

// Auto-cleanup every 10 minutes
if (typeof globalThis !== 'undefined') {
  setInterval(cleanupRateLimitStore, 10 * 60 * 1000);
}
