
import { startApp } from '../server/index.js';

let app: any = null;

export default async function handler(req: any, res: any) {
  // Cache the app instance for better performance
  if (!app) {
    app = await startApp();
  }
  
  // Handle CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return app(req, res);
}
