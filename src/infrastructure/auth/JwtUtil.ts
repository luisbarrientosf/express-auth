import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JWTAccessToken, JWTRefreshToken, JWTPayload } from './types/Jwt.types';
import { InvalidJWTTokenException } from './exceptions/InvalidJWTTokenException';

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'JWT_ACCESS_TOKEN_SECRET';
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'JWT_REFRESH_TOKEN_SECRET';
const JWT_REFRESH_TOKEN_EXPIRES_IN = Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN) || 30 * 24 * 3600;
const JWT_ACCESS_TOKEN_EXPIRES_IN = Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN) || 3600;

export class JwtUtil {
  static sign(payload: JWTPayload): string {
    const NOW = Math.floor(Date.now() / 1000);
    const jwtPayload: JWTAccessToken = {
      ...payload,
      jti: uuidv4(),
      type: 'access_token',
      iat: NOW,
      exp: NOW + JWT_ACCESS_TOKEN_EXPIRES_IN
    };
    return jwt.sign(jwtPayload, JWT_ACCESS_TOKEN_SECRET);
  }

  static verify(token: string): JWTAccessToken {
    try {
      return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JWTAccessToken;
    } catch {
      throw new InvalidJWTTokenException();
    }
  }

  static signRefreshToken(userId: string): string {
    const NOW = Math.floor(Date.now() / 1000);
    const payload: JWTRefreshToken = {
      userId,
      jti: uuidv4(),
      type: 'refresh_token',
      iat: NOW,
      exp: NOW + Number(JWT_REFRESH_TOKEN_EXPIRES_IN)
    };
    return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET);
  }

  static verifyRefreshToken(token: string): JWTRefreshToken {
    try {
      return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as JWTRefreshToken;
    } catch {
      throw new InvalidJWTTokenException();
    }
  }
}