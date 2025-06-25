# Nexusly - Digital Agency Web Application

## Overview

Nexusly is a modern, responsive web application for a digital agency built with React, TypeScript, and Node.js. The application showcases the agency's services, portfolio, and provides a contact form for potential clients. It features a beautiful landing page with smooth animations, multiple sections highlighting services and testimonials, and a robust backend for handling contact submissions.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture:
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and effects
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and production builds

### Backend Architecture
The backend follows a RESTful API design pattern:
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (via Neon serverless)
- **Email Service**: Nodemailer for contact form submissions
- **Development**: Hot reload with Vite integration

### UI Component System
The application uses shadcn/ui as the primary component library, providing:
- Consistent design tokens and theming
- Accessible components built on Radix UI primitives
- Customizable components with class-variance-authority
- Dark mode support (configured but not actively used)

## Key Components

### Database Schema
The application uses two main database tables:
- **Users**: For potential admin/authentication functionality
- **Contacts**: Stores contact form submissions with fields for name, email, project type, and message

### Contact Form System
A comprehensive contact form that:
- Validates input using Zod schemas
- Stores submissions in PostgreSQL database
- Sends professional confirmation emails to users via SMTP
- Forwards submissions to internal team emails
- Handles email failures gracefully with fallback notifications
- Uses secure environment variables for SMTP credentials
- Provides real-time feedback to users

### Landing Page Sections
The homepage consists of multiple animated sections:
- **Hero Section**: Main value proposition with call-to-action
- **Stats Section**: Key metrics and achievements
- **Services Section**: Detailed service offerings
- **Projects Section**: Featured project showcases with real metrics
- **About Section**: Team member profiles with social links
- **Testimonials Section**: Client feedback with ratings and project badges
- **FAQs Section**: Common questions with expandable answers
- **Contact Section**: Contact form with SMTP email integration

### Animation System
Uses Framer Motion for:
- Page load animations with staggered timing
- Scroll-triggered animations via Intersection Observer
- Floating background elements
- Smooth transitions between states

## Data Flow

1. **Client Request**: User visits the application
2. **Static Delivery**: Vite serves the React application
3. **API Calls**: Frontend makes requests to Express backend
4. **Database Operations**: Drizzle ORM handles PostgreSQL queries
5. **Email Notifications**: Nodemailer sends emails for contact submissions
6. **Response**: JSON responses sent back to frontend
7. **UI Updates**: React components update based on API responses

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **nodemailer**: Email sending functionality

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **lucide-react**: Icon library

### Development Dependencies
- **typescript**: Static type checking
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Development Server**: Runs on port 5000
- **Hot Reload**: Vite provides instant feedback during development

### Production Build
- **Build Process**: Vite bundles frontend, esbuild bundles backend
- **Static Assets**: Served from dist/public directory
- **Server**: Express serves both API routes and static files
- **Database Migrations**: Drizzle Kit handles schema changes

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SMTP_***: Email service configuration
- **NODE_ENV**: Environment detection

## Changelog

```
Changelog:
- June 25, 2025. Initial setup
- June 25, 2025. Implemented complete contact form email system with SMTP integration
- June 25, 2025. Added testimonials and FAQ sections to complete consulting website
- June 25, 2025. Transformed analytics section into projects showcase
- June 25, 2025. Created team member profiles in about section
- June 25, 2025. Fixed TypeScript error in email service configuration
- June 25, 2025. Updated Vercel deployment configuration for serverless functions
- June 25, 2025. Created serverless-compatible API endpoint in api/index.ts
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```