import prisma from '../utils/prisma';

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
