
import { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactSchema } from '../shared/schema';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Email configuration from environment variables
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: parseInt(process.env.SMTP_PORT || '587') === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

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
    this.transporter = nodemailer.createTransporter(emailConfig);
    this.fromEmail = process.env.SMTP_FROM || "hello@nexusly.ca";
    this.teamEmails = (
      process.env.TEAM_EMAILS || "nikuzabo.j@gmail.com"
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
              <p>We've received your ${serviceType} inquiry and will get back to you soon.</p>
            </div>
            <div class="content">
              <p>Our team will review your requirements within 24 hours and get back to you within 1-2 business days.</p>
              <p>Best regards,<br>The Nexulsly Team</p>
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 30px; text-align: center; }
            .field { margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Contact Form Submission</h1>
            </div>
            <div class="field">
              <strong>Name:</strong> ${data.name}<br>
              <strong>Email:</strong> ${data.email}<br>
              <strong>Service:</strong> ${data.serviceType}<br>
              <strong>Message:</strong> ${data.message}<br>
              <strong>Received:</strong> ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async processContactForm(data: EmailData): Promise<{ success: boolean; message: string }> {
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
        message: "Your message has been sent successfully! We'll get back to you within 1-2 business days."
      };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        message: "Failed to send your message. Please try again or contact us directly."
      };
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse and validate the contact form data
    const contactData = insertContactSchema.parse(req.body);
    
    // Initialize email service
    const emailService = new VercelEmailService();
    
    // Process email notifications
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
        message: emailResult.message 
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  }
}
