import sgMail, { MailDataRequired } from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(data: EmailData) {
  const msg: MailDataRequired = {
    to: data.to,
    from: data.from || "hello@minitools.dev",
    subject: data.subject,
    html: data.html,
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    throw new Error("Failed to send email");
  }
}

export async function sendWelcomeEmail(email: string) {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
  
  const msg: MailDataRequired = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || "sahaiburrahman@gmail.com",
    subject: "Welcome to Mini Tools! 🚀",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Mini Tools</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; color: #ffffff; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <!-- Wrapper table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #09090b;">
    <tr>
      <td align="center" style="padding: 20px;">
        <!-- Main content table -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #ffffff;">
                Mini<span style="background: linear-gradient(to right, #8b5cf6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Tools</span>
              </div>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 32px;">
              <h1 style="font-size: 28px; margin: 0 0 16px 0; color: #ffffff;">Welcome to Mini Tools! 🚀</h1>
              <p style="line-height: 1.6; margin: 0 0 16px 0;">Thank you for subscribing to our newsletter. We're excited to have you join our community of developers who use our tools to streamline their workflow.</p>
              
              <h2 style="font-size: 24px; margin: 32px 0 16px 0; color: #ffffff;">Our Tools</h2>
              
              <!-- Tools Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- IP Index Tool -->
                  <td style="padding: 0 8px 16px 0;" width="50%">
                    <table role="presentation" width="100%" cellpadding="16" cellspacing="0" border="0" style="background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                      <tr>
                        <td>
                          <h3 style="font-size: 18px; margin: 0 0 8px 0; color: #ffffff;">IP Index</h3>
                          <p style="line-height: 1.6; margin: 0 0 16px 0;">A comprehensive IP address lookup and analysis tool</p>
                          <a href="https://ipindex.sahaibsingh.com/" style="display: inline-block; background: linear-gradient(to right, #8b5cf6, #6366f1); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">Try IP Index</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- DNS Index Tool -->
                  <td style="padding: 0 0 16px 8px;" width="50%">
                    <table role="presentation" width="100%" cellpadding="16" cellspacing="0" border="0" style="background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                      <tr>
                        <td>
                          <h3 style="font-size: 18px; margin: 0 0 8px 0; color: #ffffff;">DNS Index</h3>
                          <p style="line-height: 1.6; margin: 0 0 16px 0;">DNS lookup and analysis tool for domain names</p>
                          <a href="https://dns-index.sahaibsingh.com/" style="display: inline-block; background: linear-gradient(to right, #8b5cf6, #6366f1); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">Try DNS Index</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="line-height: 1.6; margin: 32px 0 0 0;">Stay tuned for more exciting tools and features coming soon!</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <!-- Social Links -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 0 8px;"><a href="https://github.com/sahaib" style="color: #a1a1aa; text-decoration: none;">GitHub</a></td>
                  <td style="padding: 0 8px;"><a href="https://twitter.com/imsahaib" style="color: #a1a1aa; text-decoration: none;">Twitter</a></td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #a1a1aa; font-size: 14px;">You're receiving this email because you subscribed to Mini Tools newsletter.</p>
              <p style="margin: 0; color: #a1a1aa; font-size: 14px;">© 2024 Mini Tools. All rights reserved.</p>
              <a href="${unsubscribeUrl}" style="color: #a1a1aa; text-decoration: none; font-size: 12px; margin-top: 20px; display: inline-block;">Unsubscribe from newsletter</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
    throw new Error("Failed to send welcome email");
  }
} 