import request from 'supertest';
import express from 'express';
import authRoutes from '../../../src/presentation/auth/authRoutes';
import { JwtUtil } from '../../../src/infrastructure/auth/JwtUtil';

process.env.JWT_SECRET_TOKEN = 'JWT_SECRET_TOKEN';

describe('AuthController', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  describe('GET /api/auth/me', () => {
    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 401 if token is invalid', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should return payload if token is valid', async () => {
      const payload = { userId: '123', email: 'user@example.com' };
      const token = JwtUtil.sign(payload);
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(payload);
    });
  });
});
