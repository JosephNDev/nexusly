
import express, { type Request, Response, NextFunction } from "express";
import { emailService } from "../server/email.js";
import { storage } from "../server/storage.js";
import { insertContactSchema } from "../shared/schema.js";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact form submission endpoint
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const contactData = insertContactSchema.parse(req.body);
    
    // Store contact in database
    const contact = await storage.createContact(contactData);
    
    // Process email notifications
    const emailResult = await emailService.processContactForm({
      name: `${contactData.firstName} ${contactData.lastName}`,
      email: contactData.email,
      message: contactData.message,
      serviceType: contactData.projectType
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

// Get all contacts endpoint
app.get("/api/contacts", async (req: Request, res: Response) => {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export for Vercel
export default app;
