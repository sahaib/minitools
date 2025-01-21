import { NextResponse } from "next/server";
import { z } from "zod";
import { db, suggestions } from "@/lib/db";
import { eq, and, gte } from "drizzle-orm";
import { rateLimit } from "@/lib/rate-limit";
import { sendWelcomeEmail } from "@/lib/sendgrid";

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
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  
  return "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const { email, suggestion } = await request.json();
    const identifier = getClientIp(request);

    const rateLimitResult = await rateLimit(identifier);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. You can submit ${rateLimitResult.limit} suggestions per hour. Please try again later.` 
        },
        { status: 429 }
      );
    }

    await db.insert(suggestions).values({
      email,
      suggestion,
      ip: identifier,
      createdAt: new Date(),
    });

    await sendWelcomeEmail(email);

    return NextResponse.json({ 
      message: "Suggestion submitted successfully",
      remaining: rateLimitResult.remaining
    });
  } catch (error) {
    console.error("Error submitting suggestion:", error);
    return NextResponse.json(
      { error: "Failed to submit suggestion" },
      { status: 500 }
    );
  }
} 