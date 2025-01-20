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

    try {
      await sendWelcomeEmail(email);
      return NextResponse.json(
        { message: "Successfully subscribed" },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error("Failed to send welcome email:", emailError);
      return NextResponse.json(
        { error: emailError.message || "Failed to send welcome email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
} 