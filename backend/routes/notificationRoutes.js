import express from 'express';
import { getNotifications, deleteNotification } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getNotifications);
router.route('/:id').delete(protect, deleteNotification); // New route to delete a specific notification by ID

export default router;

