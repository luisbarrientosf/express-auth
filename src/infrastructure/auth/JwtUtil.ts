import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_TOKEN || 'JWT_SECRET_TOKEN';

export const JwtUtil = {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  },
  verify(token: string): object | null {
    try {
      return jwt.verify(token, JWT_SECRET) as object;
    } catch (error) {
      console.error('JWT verification error:', error);
      return null;
    }
  }
};