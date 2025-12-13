import request from 'supertest';
import app from '../app';

let token: string;

beforeEach(async () => {
  await request(app)
    .post('/api/auth/register')
    .send({ email: 'u@u.com', password: '123456' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'u@u.com', password: '123456' });

  token = res.body.token;
});

test('creates a sweet with token', async () => {
  const res = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Ladoo',
      category: 'Indian',
      price: 10,
      quantity: 5
    });

  expect(res.status).toBe(201);
});

test('rejects access without token', async () => {
  const res = await request(app).get('/api/sweets');
  expect(res.status).toBe(401);
});
test('purchases a sweet (decreases quantity)', async () => {
  // create sweet
  const createRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Jalebi',
      category: 'Indian',
      price: 15,
      quantity: 10
    });

  const sweetId = createRes.body.id;

  // purchase
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set('Authorization', `Bearer ${token}`)
    .send({ amount: 3 });

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(7);
});

test('cannot purchase more than available quantity', async () => {
  const createRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Barfi',
      category: 'Indian',
      price: 20,
      quantity: 2
    });

  const sweetId = createRes.body.id;

  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set('Authorization', `Bearer ${token}`)
    .send({ amount: 5 });

  expect(res.status).toBe(400);
});
test('admin can restock a sweet', async () => {
  // create admin
  await request(app)
    .post('/api/auth/register')
    .send({ email: 'admin@a.com', password: '123456' });

  // manually promote to ADMIN
  const prisma = (await import('../utils/prisma')).default;
  await prisma.user.update({
    where: { email: 'admin@a.com' },
    data: { role: 'ADMIN' }
  });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@a.com', password: '123456' });

  const adminToken = loginRes.body.token;

  // create sweet
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Peda',
      category: 'Indian',
      price: 12,
      quantity: 5
    });

  const sweetId = sweetRes.body.id;

  // restock
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ amount: 10 });

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(15);
});

test('non-admin cannot restock', async () => {
  const sweetRes = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Halwa',
      category: 'Indian',
      price: 10,
      quantity: 5
    });

  const sweetId = sweetRes.body.id;

  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set('Authorization', `Bearer ${token}`)
    .send({ amount: 5 });

  expect(res.status).toBe(403);
});


