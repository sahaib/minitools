import { NextResponse } from "next/server";
import { z } from "zod";
import { db, suggestions } from "@/lib/db";
import { eq, and, gte } from "drizzle-orm";

// Schema for validation
const suggestionSchema = z.object({
  email: z.string().email("Invalid email format"),
  suggestion: z.string()
    .min(10, "Suggestion must be at least 10 characters")
    .max(1000, "Suggestion must not exceed 1000 characters")
    .refine(
      (value) => {
        // Check for common spam patterns
        const spamPatterns = [
          /\b(viagra|cialis|casino|lottery|prize)\b/i,
          /\b(buy|sell|cheap|discount)\b.*\b(now|online|here)\b/i,
          /\b(http|https|www)\b/i,
        ];
        return !spamPatterns.some(pattern => pattern.test(value));
      },
      { message: "Invalid suggestion content" }
    ),
});

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwardedFor) {
    // Get the first IP if there are multiple
    const ips = forwardedFor.split(',');
    return ips[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = getClientIp(request);

    // Validate input
    const validatedData = suggestionSchema.parse(body);

    // Check for duplicate suggestions from the same IP in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentSuggestions = await db.select()
      .from(suggestions)
      .where(
        and(
          eq(suggestions.ip, identifier),
          gte(suggestions.createdAt, oneHourAgo)
        )
      );

    if (recentSuggestions.length >= 5) {
      return NextResponse.json(
        { error: "Too many suggestions. Please try again later." },
        { status: 429 }
      );
    }

    // Store suggestion
    await db.insert(suggestions).values({
      email: validatedData.email,
      suggestion: validatedData.suggestion,
      ip: identifier,
    });

    return NextResponse.json(
      { message: "Suggestion received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Suggestion submission error:", error);
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0]?.message || "Invalid input";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit suggestion" },
      { status: 500 }
    );
  }
} 