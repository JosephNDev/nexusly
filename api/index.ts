
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Schema for contact form validation
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

interface EmailData {
  name: string;
  email: string;
  message: string;
  serviceType: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private teamEmails: string[];

  constructor() {
    // Validate required environment variables
    const requiredVars = ["SMTP_USER", "SMTP_PASSWORD"];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`,
      );
    }

    // Configure SMTP transporter
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });

    this.fromEmail = process.env.FROM_EMAIL || "hello@nexulsly.ca";
    this.teamEmails = (
      process.env.TEAM_EMAILS ||
      "nikuzabo.j@gmail.com,fabrice.ndizihiwe@gmail.com"
    )
      .split(",")
      .map((email) => email.trim());
  }

  private generateConfirmationEmailHtml(name: string, serviceType: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Thank You for Contacting Nexulsly</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 30px; }
            .message { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
            .service-info { background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
            .button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
              <p>We've received your ${serviceType} inquiry and will get back to you soon.</p>
            </div>
            <div class="content">
              <div class="service-info">
                <strong>🎯 Service Requested:</strong> ${serviceType}<br>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #64748b;">Our ${serviceType.toLowerCase()} specialists will review your requirements and provide tailored recommendations.</p>
              </div>
              
              <h2>What happens next?</h2>
              <ul>
                <li><strong>Review:</strong> Our team will review your ${serviceType.toLowerCase()} requirements within 24 hours</li>
                <li><strong>Response:</strong> We'll get back to you within 1-2 business days with initial insights</li>
                <li><strong>Follow-up:</strong> If needed, we'll schedule a call to discuss your ${serviceType.toLowerCase()} project in detail</li>
              </ul>
              
              <div class="message">
                <strong>💡 Pro Tip:</strong> While you wait, check out our recent projects and case studies on our website to see how we've helped other businesses transform their digital presence.
              </div>
              
              <p>If you have any urgent questions, feel free to reply to this email or call us directly.</p>
              
              <a href="https://test.nexusly.ca" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p><strong>Nexulsly Digital Solutions</strong><br>
              Ottawa, ON, Canada<br>
              Email: hello@nexulsly.ca</p>
              
              <p style="font-size: 12px; color: #64748b;">
                This email was sent because you contacted us through our website. 
                If you didn't expect this email, please ignore it.
              </p>
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
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .field { margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #3b82f6; }
            .field label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
            .message-content { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; }
            .metadata { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Contact Form Submission</h1>
              <p>A potential client has reached out through the website</p>
            </div>
            <div class="content">
              <div class="field">
                <label>👤 Name:</label>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <label>📧 Email:</label>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              <div class="field">
                <label>🎯 Service Requested:</label>
                <div class="value" style="color: #059669; font-weight: 600;">${data.serviceType}</div>
              </div>
              
              <div class="field">
                <label>💬 Message:</label>
                <div class="message-content">${data.message}</div>
              </div>
              
              <div class="metadata">
                <strong>📅 Received:</strong> ${new Date().toLocaleString("en-US", {
                  timeZone: "America/Toronto",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}<br>
                <strong>🌐 Source:</strong> Contact Form (test.nexusly.ca)
              </div>
              
              <p style="margin-top: 30px; padding: 20px; background: #dcfce7; border-radius: 8px; border-left: 4px solid #16a34a;">
                <strong>Action Required:</strong> Please respond to this inquiry within 24 hours to maintain our excellent customer service standards.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async sendConfirmationEmail(data: EmailData): Promise<void> {
    const mailOptions = {
      from: `"Nexulsly Team" <${this.fromEmail}>`,
      to: data.email,
      subject: `Thank you for your ${data.serviceType} inquiry - We'll be in touch soon!`,
      html: this.generateConfirmationEmailHtml(data.name, data.serviceType),
      text: `Hi ${data.name},\n\nThank you for reaching out to Nexulsly about ${data.serviceType}! We've received your message and our team will review your requirements within 24 hours.\n\nWe'll get back to you within 1-2 business days to discuss how we can help with your ${data.serviceType.toLowerCase()} project.\n\nBest regards,\nThe Nexulsly Team\n\nNexulsly Digital Solutions\nOttawa, ON, Canada\nEmail: hello@nexulsly.ca`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendInternalNotification(data: EmailData): Promise<void> {
    const mailOptions = {
      from: `"Nexulsly Contact Form" <${this.fromEmail}>`,
      to: this.fromEmail,
      bcc: this.teamEmails,
      subject: `🚨 New ${data.serviceType} Inquiry: ${data.name}`,
      html: this.generateInternalNotificationHtml(data),
      text: `New contact form submission:\n\nName: ${data.name}\nEmail: ${data.email}\nService Requested: ${data.serviceType}\n\nMessage:\n${data.message}\n\nReceived: ${new Date().toLocaleString()}\nSource: Contact Form (test.nexusly.ca)\n\nPlease respond within 24 hours.`,
      replyTo: data.email,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async processContactForm(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Validate input data
      if (!data.name || !data.email || !data.message || !data.serviceType) {
        throw new Error("Missing required fields");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
      }

      // Send both emails concurrently
      await Promise.all([
        this.sendConfirmationEmail(data),
        this.sendInternalNotification(data),
      ]);

      return {
        success: true,
        message: "Your message has been sent successfully! We'll get back to you within 1-2 business days.",
      };
    } catch (error) {
      console.error('Contact form processing failed:', error);
      return {
        success: false,
        message: "Failed to send your message. Please try again or contact us directly.",
      };
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle contact form submission
  if (req.method === 'POST' && req.url?.includes('/contact')) {
    try {
      const contactData = contactSchema.parse(req.body);
      
      const emailService = new EmailService();
      const emailResult = await emailService.processContactForm({
        name: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        message: contactData.message,
        serviceType: contactData.projectType
      });
      
      if (emailResult.success) {
        res.status(200).json({ 
          success: true, 
          message: emailResult.message,
          emailSent: true 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: emailResult.message,
          emailSent: false 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error('API Error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
    return;
  }

  // Handle 404 for unknown routes
  res.status(404).json({ success: false, message: 'Route not found' });
}
