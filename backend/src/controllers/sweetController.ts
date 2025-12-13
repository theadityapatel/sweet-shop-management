import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export async function createSweet(req: Request, res: Response) {
  const sweet = await prisma.sweet.create({
    data: req.body
  });
  res.status(201).json(sweet);
}

export async function listSweets(req: Request, res: Response) {
  const sweets = await prisma.sweet.findMany();
  res.json(sweets);
}

export async function purchaseSweet(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    return res.status(404).json({ error: 'Sweet not found' });
  }

  if (sweet.quantity < amount) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }

  const updated = await prisma.sweet.update({
    where: { id },
    data: {
      quantity: sweet.quantity - amount
    }
  });

  res.status(200).json(updated);
}
export async function restockSweet(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) {
    return res.status(404).json({ error: 'Sweet not found' });
  }

  const updated = await prisma.sweet.update({
    where: { id },
    data: {
      quantity: sweet.quantity + amount
    }
  });

  res.status(200).json(updated);
}
export async function searchSweets(req: Request, res: Response) {
  const { name, category, minPrice, maxPrice } = req.query;

  const filters: any = {};

  if (name) {
    filters.name = {
      contains: String(name)
    };
  }

  if (category) {
    filters.category = String(category);
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.gte = Number(minPrice);
    if (maxPrice) filters.price.lte = Number(maxPrice);
  }

  const sweets = await prisma.sweet.findMany({
    where: filters
  });

  res.status(200).json(sweets);
}
