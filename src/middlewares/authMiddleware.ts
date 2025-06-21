import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number }; 
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({
      status: 401,
      message: 'Authentication token required',
      data: null,
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, user: any) => {
    if (err) {
      res.status(403).json({
        status: 403,
        message: 'Invalid token',
        data: null,
      });
      return;
    }
    req.user = user as { id: number };
    next();
  });
};