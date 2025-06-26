const { pgTable, text, serial, timestamp } = require("drizzle-orm/pg-core");
const { createInsertSchema } = require("drizzle-zod");
const { z } = require("zod");

const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

module.exports = { contacts, insertContactSchema };