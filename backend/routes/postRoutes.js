import { getPosts, createPost, getPostById } from '../controllers/postController.js'; // Import getPostById
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

// Route to get latest posts of all users except the logged-in user
router.get('/', protect, getPosts);

// Route to create a new post (without file upload middleware)
router.post('/', protect, createPost);

// Route to get a single post by ID
router.get('/:id', protect, getPostById); // Add this line

export default router;
