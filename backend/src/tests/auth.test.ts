import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(201);
  });

  it('logs in a user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@test.com', password: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: '123456' });

    expect(res.body.token).toBeDefined();
  });
});
