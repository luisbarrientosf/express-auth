import { JwtUtil } from '@infrastructure/auth/JwtUtil';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Missing authorization token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    if (JwtUtil.verify(token)) {
      next();
    }
  } catch {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
  }
}