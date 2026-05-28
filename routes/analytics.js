import express from 'express';
import Invoice from '../models/Invoice.js';
import Payment from '../models/Payment.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get dashboard stats
router.get('/dashboard', authMiddleware, asyncHandler(async (req, res) => {
  const invoices = await Invoice.findAll({
    where: { userId: req.user.id }
  });

  const payments = await Payment.findAll({
    where: { userId: req.user.id, status: 'completed' }
  });

  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const pendingInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'viewed').length;

  res.json({
    totalRevenue,
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    conversionRate: totalInvoices > 0 ? ((paidInvoices / totalInvoices) * 100).toFixed(2) : 0
  });
}));

export default router;
