import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/sendgrid";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await sendWelcomeEmail(email);

    return NextResponse.json(
      { message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to subscribe";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 