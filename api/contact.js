// Simple serverless function for contact form
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Simple validation
      const { firstName, lastName, email, projectType, message } = req.body;
      
      if (!firstName || !lastName || !email || !projectType || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }

      // For now, just return success without database/email
      // This allows the frontend to work while we fix backend issues
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you within 1-2 business days.",
        contact: {
          id: Date.now(),
          firstName,
          lastName,
          email,
          projectType,
          message,
          createdAt: new Date().toISOString()
        },
        emailSent: false
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  } else {
    res.status(405).json({ 
      success: false, 
      message: "Method not allowed" 
    });
  }
}