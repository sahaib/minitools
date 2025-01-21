import { db, suggestions } from "./db";
import { and, eq, gte } from "drizzle-orm";

export async function rateLimit(identifier: string) {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    // Count suggestions from this IP in the last hour
    const recentSuggestions = await db.select()
      .from(suggestions)
      .where(
        and(
          eq(suggestions.ip, identifier),
          gte(suggestions.createdAt, oneHourAgo)
        )
      );

    return { 
      success: recentSuggestions.length < 5,
      current: recentSuggestions.length,
      limit: 5,
      remaining: Math.max(0, 5 - recentSuggestions.length)
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // If check fails, allow the request
    return { success: true, current: 0, limit: 5, remaining: 5 };
  }
} 