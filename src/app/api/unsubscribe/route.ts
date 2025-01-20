import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Remove the email from your newsletter list
    // 2. Update your database
    // For now, we'll just return a success response

    return new NextResponse(
      `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed - Mini Tools</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #09090b;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 20px;
    }
    .gradient-text {
      background: linear-gradient(to right, #8b5cf6, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .content {
      background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1));
      border-radius: 12px;
      padding: 32px;
      margin: 32px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(to right, #8b5cf6, #6366f1);
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      margin-top: 24px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Mini<span class="gradient-text">Tools</span></div>
    <div class="content">
      <h1>Successfully Unsubscribed</h1>
      <p>You've been unsubscribed from the Mini Tools newsletter.</p>
      <p>We're sorry to see you go! If you change your mind, you can always subscribe again from our website.</p>
      <a href="/" class="button">Return to Mini Tools</a>
    </div>
  </div>
</body>
</html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
} 