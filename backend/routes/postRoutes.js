import { getPosts, createPost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

// Route to get latest posts of all users except the logged-in user
router.get('/', protect, getPosts);

// Route to create a new post (without file upload middleware)
router.post('/', protect, createPost);

export default router;
