// NotificationScreen.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('/api/notifications', config);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (userInfo) fetchNotifications();
    }, [userInfo]);

    const handleViewPost = async (notificationId, postId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            await axios.delete(`/api/notifications/${notificationId}`, config);
            
            // Remove the notification from the local state
            setNotifications(notifications.filter((notif) => notif._id !== notificationId));
            
            // Redirect to the post
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
                        <p className="text-lg">{notification.message}</p>
                        <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
                        <button
                            onClick={() => handleViewPost(notification._id, notification.post)}
                            className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                            View Post
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationScreen;
