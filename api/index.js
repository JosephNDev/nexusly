import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import required modules
const express = require('express');
const { neonConfig } = require('@neondatabase/serverless');
const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { contacts } = require('../shared/schema.js');
const nodemailer = require('nodemailer');
const ws = require('ws');

// Configure Neon WebSocket
neonConfig.webSocketConstructor = ws;

// Initialize database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { contacts } });

// Email service configuration
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    this.fromEmail = process.env.FROM_EMAIL || "hello@nexulsly.ca";
    this.teamEmails = (process.env.TEAM_EMAILS || "nikuzabo.j@gmail.com,fabrice.ndizihiwe@gmail.com")
      .split(",")
      .map(email => email.trim());
  }

  async sendConfirmationEmail(data) {
    const serviceTypeMap = {
      web_development: "Web Development",
      mobile_development: "Mobile Development", 
      digital_marketing: "Digital Marketing",
      consulting: "Consulting",
      other: "Custom Solution"
    };
    
    const serviceType = serviceTypeMap[data.projectType] || data.projectType;
    
    const mailOptions = {
      from: `"Nexulsly Team" <${this.fromEmail}>`,
      to: data.email,
      subject: `Thank you for your ${serviceType} inquiry - We'll be in touch soon!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; }
              .content { padding: 40px 30px; }
              .service-info { background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
              .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${data.firstName}!</h1>
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
                  <li><strong>Follow-up:</strong> If needed, we'll schedule a call to discuss your project in detail</li>
                </ul>
                
                <p>If you have any urgent questions, feel free to reply to this email.</p>
              </div>
              <div class="footer">
                <p><strong>Nexulsly Digital Solutions</strong><br>
                Ottawa, ON, Canada<br>
                Email: hello@nexulsly.ca</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${data.firstName},\n\nThank you for reaching out to Nexulsly about ${serviceType}! We've received your message and our team will review your requirements within 24 hours.\n\nWe'll get back to you within 1-2 business days.\n\nBest regards,\nThe Nexulsly Team`
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendInternalNotification(data) {
    const serviceTypeMap = {
      web_development: "Web Development",
      mobile_development: "Mobile Development", 
      digital_marketing: "Digital Marketing", 
      consulting: "Consulting",
      other: "Custom Solution"
    };
    
    const serviceType = serviceTypeMap[data.projectType] || data.projectType;
    
    const mailOptions = {
      from: `"Nexulsly Contact Form" <${this.fromEmail}>`,
      to: this.fromEmail,
      bcc: this.teamEmails,
      subject: `🚨 New ${serviceType} Inquiry: ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Service Requested:</strong> ${serviceType}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 10px 0;">${data.message}</div>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Action Required:</strong> Please respond within 24 hours.</p>
      `,
      replyTo: data.email,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

// Main handler function
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/contact') {
    try {
      const { firstName, lastName, email, projectType, message } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !projectType || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      // Save to database
      const [contact] = await db
        .insert(contacts)
        .values({
          firstName,
          lastName,
          email,
          projectType,
          message,
        })
        .returning();

      // Send emails
      let emailSent = false;
      try {
        const emailService = new EmailService();
        await Promise.all([
          emailService.sendConfirmationEmail({ firstName, lastName, email, projectType, message }),
          emailService.sendInternalNotification({ firstName, lastName, email, projectType, message })
        ]);
        emailSent = true;
        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue without failing - contact is still saved
      }

      res.status(200).json({
        success: true,
        message: emailSent 
          ? "Your message has been sent successfully! We'll get back to you within 1-2 business days."
          : "Your message has been received! We'll get back to you soon.",
        contact,
        emailSent
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later."
      });
    }
  } else {
    res.status(404).json({ message: 'Not found' });
  }
}