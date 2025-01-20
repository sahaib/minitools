import sgMail, { MailDataRequired } from "@sendgrid/mail";

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendWelcomeEmail = async (email: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not configured");
  }

  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;

  const msg: MailDataRequired = {
    to: email,
    from: "hello@minitools.dev",
    subject: "Welcome to Mini Tools! 🚀",
    trackingSettings: {
      clickTracking: { enable: true },
      openTracking: { enable: true },
      subscriptionTracking: { enable: true },
    },
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Mini Tools</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #09090b;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #09090b;
    }
    @media (min-width: 768px) {
      .container {
        padding: 40px;
      }
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 20px;
    }
    @media (min-width: 768px) {
      .logo {
        font-size: 32px;
      }
    }
    .gradient-text {
      background: linear-gradient(to right, #8b5cf6, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .content {
      background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1));
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
    }
    @media (min-width: 768px) {
      .content {
        padding: 32px;
      }
    }
    .button {
      display: inline-block;
      background: linear-gradient(to right, #8b5cf6, #6366f1);
      color: #ffffff !important;
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
    .tools {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-top: 32px;
    }
    @media (min-width: 768px) {
      .tools {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .tool {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 16px;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .tool:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.08);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #a1a1aa;
      font-size: 14px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 20px;
    }
    .social-link {
      color: #a1a1aa !important;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .social-link:hover {
      color: #ffffff !important;
    }
    .unsubscribe {
      color: #a1a1aa !important;
      text-decoration: none;
      font-size: 12px;
      margin-top: 20px;
      display: inline-block;
      transition: color 0.2s ease;
    }
    .unsubscribe:hover {
      color: #ffffff !important;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }
    @media (min-width: 768px) {
      h1 {
        font-size: 28px;
      }
    }
    h2 {
      font-size: 20px;
      margin-top: 32px;
      margin-bottom: 16px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }
    p {
      line-height: 1.6;
      margin: 0 0 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Mini<span class="gradient-text">Tools</span></div>
    </div>
    
    <div class="content">
      <h1>Welcome to Mini Tools! 🚀</h1>
      <p>Thank you for subscribing to our newsletter. We're excited to have you join our community of developers who use our tools to streamline their workflow.</p>
      
      <h2>Our Tools</h2>
      <div class="tools">
        <div class="tool">
          <h3>IP Index</h3>
          <p>A comprehensive IP address lookup and analysis tool</p>
          <a href="https://ipindex.sahaibsingh.com/" class="button">Try IP Index</a>
        </div>
        <div class="tool">
          <h3>DNS Index</h3>
          <p>DNS lookup and analysis tool for domain names</p>
          <a href="https://dns-index.sahaibsingh.com/" class="button">Try DNS Index</a>
        </div>
      </div>
      
      <p style="margin-top: 32px;">Stay tuned for more exciting tools and features coming soon!</p>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="https://github.com/sahaib" class="social-link">GitHub</a>
        <a href="https://twitter.com/imsahaib" class="social-link">Twitter</a>
      </div>
      <p style="margin-top: 20px;">You're receiving this email because you subscribed to Mini Tools newsletter.</p>
      <p>© ${new Date().getFullYear()} Mini Tools. All rights reserved.</p>
      <a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe from newsletter</a>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}; 