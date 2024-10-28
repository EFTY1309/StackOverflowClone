import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const Hero = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    // Fetch the count of unread notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/api/notifications');
                setNotificationCount(data.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    // Mark notifications as read when clicking on the notification button
    const handleNotificationsClick = async () => {
        try {
            await axios.post('/api/notifications/mark-as-read');
            setNotificationCount(0); // Reset count once notifications are marked as read
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    return (
        <div className='hero-section py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 shadow-lg'>
                    <h1 className='text-center mb-4'>Stack Overflow</h1>
                    <p className='text-center mb-4'>
                        Stack Overflow is a popular online platform where developers can ask and answer coding-related questions. 
                        It serves as a collaborative space for sharing programming knowledge and solutions.
                    </p>
                    <div className='d-flex justify-content-center'>
                        <Button variant='primary' href='/posts' className='me-3'>
                            View Posts
                        </Button>
                        <Button variant='success' href='/create-post' className='me-3'>
                            Create a New Post
                        </Button>
                        <Button variant='outline-secondary' href='/notifications' className='d-flex align-items-center' onClick={handleNotificationsClick}>
                            <FaBell size={20} className='me-2' />
                            Notifications
                            {notificationCount > 0 && (
                                <span className="badge bg-danger text-white ms-2">
                                    {notificationCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero;
