
import { startApp } from '../server/index.js';

export default async function handler(req: any, res: any) {
  const app = await startApp();
  return app(req, res);
}
