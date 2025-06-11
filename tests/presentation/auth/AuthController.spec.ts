import request from 'supertest';
import express from 'express';
import { JwtUtil } from '../../../src/infrastructure/auth/JwtUtil';
import { StartedTestContainer } from 'testcontainers';
import { setupTestPostgres } from '../../_helpers/setupPostgreSQLContainer';

let container: StartedTestContainer;
let app: express.Express;

describe('AuthController', () => {
  beforeAll(async () => {
    container = (await setupTestPostgres()).container;

    const authRoutes = require('../../../src/presentation/auth/authRoutes').default;

    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
  });

  afterAll(async () => {
    await container.stop();
  });

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

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'newuser@example.com', password: 'password123' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email', 'newuser@example.com');
    });

    it('should not allow duplicate registration', async () => {
      // Register once
      await request(app)
        .post('/api/auth/register')
        .send({ email: 'dupeuser@example.com', password: 'password123' });
      // Register again with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'dupeuser@example.com', password: 'password123' });
      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'notfound@example.com', password: 'wrongpass' });
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message');
    });

    it('should login with valid credentials', async () => {
      // Register a user first
      await request(app)
        .post('/api/auth/register')
        .send({ email: 'validuser@example.com', password: 'validpass123' });
      // Now login
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'validuser@example.com', password: 'validpass123' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 if email or password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: '', password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');

      const res2 = await request(app)
        .post('/api/auth/login')
        .send({ email: 'example@example.com', password: '' });
      expect(res2.status).toBe(400);
      expect(res2.body).toHaveProperty('errors');
    });
  });
});
