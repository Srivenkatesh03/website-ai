import express from 'express';
import Invoice from '../models/Invoice.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all invoices
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const invoices = await Invoice.findAll({
    where: { userId: req.user.id }
  });
  res.json(invoices);
}));

// Create invoice
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const invoice = await Invoice.create({
    ...req.body,
    userId: req.user.id
  });
  res.status(201).json(invoice);
}));

// Get invoice
router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice || invoice.userId !== req.user.id) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  res.json(invoice);
}));

// Update invoice
router.patch('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice || invoice.userId !== req.user.id) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  await invoice.update(req.body);
  res.json(invoice);
}));

// Delete invoice
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice || invoice.userId !== req.user.id) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  await invoice.destroy();
  res.status(204).send();
}));

export default router;
