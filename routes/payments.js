import express from 'express';
import stripe from 'stripe';
import Payment from '../models/Payment.js';
import Invoice from '../models/Invoice.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import logger from '../config/logger.js';

const router = express.Router();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/intent', authMiddleware, asyncHandler(async (req, res) => {
  const { invoiceId, amount } = req.body;

  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice || invoice.userId !== req.user.id) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: invoice.currency.toLowerCase(),
    metadata: { invoiceId, userId: req.user.id }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
}));

// Confirm payment
router.post('/confirm', authMiddleware, asyncHandler(async (req, res) => {
  const { invoiceId, transactionId } = req.body;

  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice || invoice.userId !== req.user.id) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const paymentIntent = await stripeClient.paymentIntents.retrieve(transactionId);

  if (paymentIntent.status === 'succeeded') {
    await Payment.create({
      invoiceId,
      userId: req.user.id,
      amount: paymentIntent.amount / 100,
      method: 'card',
      status: 'completed',
      transactionId: paymentIntent.id,
      paymentDate: new Date()
    });

    await invoice.update({ status: 'paid' });
    logger.info(`Payment completed for invoice: ${invoiceId}`);
    res.json({ success: true, invoice });
  } else {
    res.status(400).json({ error: 'Payment not confirmed' });
  }
}));

export default router;
