
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Contact schema validation
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface EmailData {
  name: string;
  email: string;
  message: string;
  serviceType: string;
}

class VercelEmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private teamEmails: string[];

  constructor() {
    // Validate required environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('Missing required environment variables: SMTP_USER and SMTP_PASSWORD');
    }

    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    this.fromEmail = process.env.FROM_EMAIL || "hello@nexusly.ca";
    this.teamEmails = (
      process.env.TEAM_EMAILS ||
      "nikuzabo.j@gmail.com,fabrice.ndizihiwe@gmail.com"
    ).split(",").map((email) => email.trim());
  }

  private generateConfirmationEmailHtml(name: string, serviceType: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You for Contacting Nexulsly</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
              <p>We've received your ${serviceType} inquiry and will get back to you soon.</p>
            </div>
            <div class="content">
              <h2>What happens next?</h2>
              <ul>
                <li>Review: Our team will review your ${serviceType.toLowerCase()} requirements within 24 hours</li>
                <li>Response: We'll get back to you within 1-2 business days</li>
                <li>Follow-up: If needed, we'll schedule a call to discuss your project</li>
              </ul>
            </div>
            <div class="footer">
              <p><strong>Nexulsly Digital Solutions</strong><br>
              Ottawa, ON, Canada<br>
              Email: hello@nexulsly.ca</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateInternalNotificationHtml(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .field { margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <strong>Name:</strong> ${data.name}
              </div>
              <div class="field">
                <strong>Email:</strong> ${data.email}
              </div>
              <div class="field">
                <strong>Service:</strong> ${data.serviceType}
              </div>
              <div class="field">
                <strong>Message:</strong><br>${data.message}
              </div>
              <div class="field">
                <strong>Received:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async sendEmails(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Send confirmation email to user
      await this.transporter.sendMail({
        from: `"Nexulsly Team" <${this.fromEmail}>`,
        to: data.email,
        subject: `Thank you for your ${data.serviceType} inquiry - We'll be in touch soon!`,
        html: this.generateConfirmationEmailHtml(data.name, data.serviceType),
      });

      // Send notification to team
      await this.transporter.sendMail({
        from: `"Nexulsly Contact Form" <${this.fromEmail}>`,
        to: this.fromEmail,
        bcc: this.teamEmails,
        subject: `🚨 New ${data.serviceType} Inquiry: ${data.name}`,
        html: this.generateInternalNotificationHtml(data),
        replyTo: data.email,
      });

      return {
        success: true,
        message: "Emails sent successfully"
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const contactData = contactSchema.parse(req.body);
    
    // Initialize email service
    const emailService = new VercelEmailService();
    
    // Prepare email data
    const emailData: EmailData = {
      name: `${contactData.firstName} ${contactData.lastName}`,
      email: contactData.email,
      message: contactData.message,
      serviceType: contactData.projectType
    };
    
    // Send emails
    const emailResult = await emailService.sendEmails(emailData);
    
    if (emailResult.success) {
      res.status(200).json({
        success: true,
        message: "Your message has been sent successfully! We'll get back to you within 1-2 business days.",
        emailSent: true
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Email sending failed: ${emailResult.message}`,
        emailSent: false
      });
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to process contact form"
      });
    }
  }
}
