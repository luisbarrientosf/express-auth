import request from 'supertest';
import express from 'express';
import { StartedTestContainer } from 'testcontainers';
import { setupTestPostgres } from '../../_helpers/setupPostgreSQLContainer';
import { v4 as uuid } from 'uuid';

let container: StartedTestContainer;
let app: express.Express;

describe('UserController', () => {
  beforeAll(async () => {
    container = (await setupTestPostgres()).container;
    const userRoutes = require('../../../src/presentation/user/userRoutes').default;

    app = express();
    app.use(express.json());
    app.use('/api/user', userRoutes);
  });

  afterAll(async () => {
    await container.stop();
  });

  describe('DELETE /api/user/:id', () => {
    it('should delete a user by id', async () => {
      // Create a user first
      const createRes = await request(app)
        .post('/api/user')
        .send({ email: 'deleteuser@example.com', password: 'deletepass' });
      const userId = createRes.body.id;
      // Delete the user
      expect(createRes.status).toBe(201);
      expect(createRes.body).toHaveProperty('id');
      console.log({ userId });
      const res = await request(app)
        .delete(`/api/user/${userId}`);
      expect(res.status).toBe(204);
      // Try to get the user
      const getRes = await request(app)
        .get(`/api/user/${userId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 if user does not exist', async () => {
      const nonExistentId = uuid();
      const res = await request(app)
        .delete(`/api/user/${nonExistentId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 for invalid UUID', async () => {
      const res = await request(app)
        .delete('/api/user/invalid-uuid');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/user/:id', () => {
    it('should return a user by id', async () => {
      const createRes = await request(app)
        .post('/api/user')
        .send({ email: 'getuser@example.com', password: 'getpass' });
      const userId = createRes.body.id;
      const res = await request(app)
        .get(`/api/user/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', userId);
      expect(res.body).toHaveProperty('email', 'getuser@example.com');
    });
    it('should return 404 if user does not exist', async () => {
      const nonExistentId = uuid();
      const res = await request(app)
        .get(`/api/user/${nonExistentId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message');
    });
    it('should return 400 for invalid UUID', async () => {
      const res = await request(app)
        .get('/api/user/invalid-uuid');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('PUT /api/user/:id', () => {
    it('should update a user by id', async () => {
      const createRes = await request(app)
        .post('/api/user')
        .send({ email: 'updateuser@example.com', password: 'updatepass' });
      const userId = createRes.body.id;
      const res = await request(app)
        .put(`/api/user/${userId}`)
        .send({ email: 'updateduser@example.com', password: 'newpass' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', userId);
      expect(res.body).toHaveProperty('email', 'updateduser@example.com');
    });
    it('should return 404 if user does not exist', async () => {
      const nonExistentId = uuid();
      console.log({ nonExistentId });
      const res = await request(app)
        .put(`/api/user/${nonExistentId}`)
        .send({ email: 'updated@example.com', password: 'updated' });
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message');
    });
    it('should return 400 for invalid UUID', async () => {
      const res = await request(app)
        .put('/api/user/invalid-uuid')
        .send({ email: 'updated@example.com', password: 'updated' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });
});
