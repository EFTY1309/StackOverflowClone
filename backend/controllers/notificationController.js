import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

// @desc    Get notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create notifications for all users except the post creator
export const createPostNotification = async (post) => {
    try {
        const users = await User.find({ _id: { $ne: post.user._id } }); // Exclude the creator
        const notifications = users.map((user) => ({
            user: user._id,
            post: post._id, // Reference to the post ID
            message: `${post.user.name} uploaded a post on "${post.title}"`,
        }));

        // Insert notifications in bulk
        await Notification.insertMany(notifications);
    } catch (error) {
        console.error('Error creating notifications:', error);
    }
};