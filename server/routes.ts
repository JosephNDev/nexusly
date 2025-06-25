import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./email";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Store contact in database
      const contact = await storage.createContact(contactData);
      
      // Process email notifications
      const emailResult = await emailService.processContactForm({
        name: contactData.name,
        email: contactData.email,
        message: contactData.message
      });
      
      if (emailResult.success) {
        res.json({ 
          success: true, 
          message: emailResult.message, 
          contact,
          emailSent: true 
        });
      } else {
        // Contact saved but email failed - still return success but with warning
        res.json({ 
          success: true, 
          message: "Contact saved successfully, but email notification failed. We'll still get back to you!", 
          contact,
          emailSent: false 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
