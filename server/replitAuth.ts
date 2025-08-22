import { RequestHandler } from "express";

// Mock authentication for demo purposes
export async function setupAuth(app: any): Promise<void> {
  console.log("Auth setup complete (mock mode)");
}

export const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  // Mock user for demo
  req.user = {
    claims: {
      sub: 'demo-user-1',
      email: 'demo@example.com',
      name: 'Demo User'
    }
  };
  next();
};