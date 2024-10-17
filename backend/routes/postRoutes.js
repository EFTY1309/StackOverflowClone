import express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get latest posts of all users except the logged-in user
router.get('/', protect, getPosts);

// Route to create a new post
router.post('/', protect, createPost);

export default router;
