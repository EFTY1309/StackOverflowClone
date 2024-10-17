import Post from '../models/postModel.js';

// @desc    Get latest posts of all users except logged-in user
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        // Fetch posts excluding the logged-in user's posts
        const posts = await Post.find({ user: { $ne: req.user._id } }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const post = new Post({
            user: req.user._id,  // Assuming req.user contains logged-in user's ID from authMiddleware
            title,
            content
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
 