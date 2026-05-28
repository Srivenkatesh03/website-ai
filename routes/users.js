import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get profile
router.get('/profile', authMiddleware, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });
  res.json(user);
}));

// Update profile
router.patch('/profile', authMiddleware, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  await user.update(req.body);
  res.json({ success: true });
}));

export default router;
