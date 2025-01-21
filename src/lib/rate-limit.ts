import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function rateLimit(identifier: string) {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  // Rate limit: 5 requests per hour
  const hourlyLimit = 5;
  const hourlyWindow = 60 * 60 * 1000; // 1 hour in milliseconds

  try {
    const reqs = await redis.get<number[]>(key) || [];
    const recentReqs = reqs.filter(time => now - time < hourlyWindow);

    if (recentReqs.length >= hourlyLimit) {
      return { success: false };
    }

    recentReqs.push(now);
    await redis.set(key, recentReqs, { ex: 60 * 60 }); // Expire after 1 hour
    return { success: true };
  } catch (error) {
    console.error("Rate limit error:", error);
    // If Redis fails, we'll still allow the request
    return { success: true };
  }
} 