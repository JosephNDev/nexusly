const nodemailer = require('nodemailer');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { contacts, insertContactSchema } = require('../shared/schema.js');
const { z } = require('zod');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

// Initialize database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { contacts } });

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Use the schema from shared directory

async function sendConfirmationEmail(name, email) {
  const fromEmail = process.env.FROM_EMAIL || 'joseph@nexulsly.com';
  
  const mailOptions = {
    from: `"Nexulsly Team" <${fromEmail}>`,
    to: email,
    subject: 'Thank you for contacting Nexulsly - We\'ll be in touch soon!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
          <p style="margin: 10px 0 0;">We've received your message and will get back to you soon.</p>
        </div>
        <div style="padding: 40px 30px; background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2>What happens next?</h2>
          <ul style="line-height: 1.6;">
            <li><strong>Review:</strong> Our team will review your message within 24 hours</li>
            <li><strong>Response:</strong> We'll get back to you within 1-2 business days</li>
            <li><strong>Follow-up:</strong> If needed, we'll schedule a call to discuss your project</li>
          </ul>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <strong>💡 Pro Tip:</strong> While you wait, check out our recent projects and case studies to see how we've helped other businesses transform their digital presence.
          </div>
          <p>Best regards,<br>The Nexulsly Team</p>
        </div>
      </div>
    `,
    text: `Hi ${name},\n\nThank you for reaching out to Nexulsly! We've received your message and our team will review it within 24 hours.\n\nWe'll get back to you within 1-2 business days to discuss how we can help transform your digital presence.\n\nBest regards,\nThe Nexulsly Team`
  };

  await emailTransporter.sendMail(mailOptions);
}

async function sendInternalNotification(data) {
  const fromEmail = process.env.FROM_EMAIL || 'joseph@nexulsly.com';
  const teamEmails = (process.env.TEAM_EMAILS || 'nikuzabo.j@gmail.com,fabrice.ndizihiwe@gmail.com').split(',').map(email => email.trim());
  
  const mailOptions = {
    from: `"Nexulsly Contact Form" <${fromEmail}>`,
    to: teamEmails,
    subject: `🚨 New Contact: ${data.firstName} ${data.lastName} - ${data.email}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1>🚨 New Contact Form Submission</h1>
          <p>A potential client has reached out through the website</p>
        </div>
        <div style="padding: 30px; background: white; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #3b82f6;">
            <strong>👤 Name:</strong> ${data.firstName} ${data.lastName}
          </div>
          <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #3b82f6;">
            <strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
          </div>
          <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #3b82f6;">
            <strong>🎯 Project Type:</strong> ${data.projectType}
          </div>
          <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #3b82f6;">
            <strong>💬 Message:</strong><br>${data.message}
          </div>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px;">
            <strong>📅 Received:</strong> ${new Date().toLocaleString()}<br>
            <strong>🌐 Source:</strong> Contact Form (nexulsly.com)
          </div>
          <p style="margin-top: 30px; padding: 20px; background: #dcfce7; border-radius: 8px; border-left: 4px solid #16a34a;">
            <strong>Action Required:</strong> Please respond to this inquiry within 24 hours to maintain our excellent customer service standards.
          </p>
        </div>
      </div>
    `,
    text: `New contact form submission:\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}\n\nReceived: ${new Date().toLocaleString()}\nSource: Contact Form (nexulsly.com)\n\nPlease respond within 24 hours.`,
    replyTo: data.email
  };

  await emailTransporter.sendMail(mailOptions);
}

module.exports = async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Store contact in database
      const [contact] = await db.insert(contacts).values(contactData).returning();
      
      // Process email notifications
      try {
        await Promise.all([
          sendConfirmationEmail(`${contactData.firstName} ${contactData.lastName}`, contactData.email),
          sendInternalNotification(contactData)
        ]);
        
        res.status(200).json({ 
          success: true, 
          message: "Your message has been sent successfully! We'll get back to you within 1-2 business days.", 
          contact,
          emailSent: true 
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        res.status(200).json({ 
          success: true, 
          message: "Contact saved successfully, but email notification failed. We'll still get back to you!", 
          contact,
          emailSent: false 
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to submit contact form" });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const allContacts = await db.select().from(contacts);
      res.status(200).json(allContacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ success: false, message: "Failed to fetch contacts" });
    }
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
};