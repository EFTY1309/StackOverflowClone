import { Container, Card, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa'; // Import bell icon from react-icons

const Hero = () => {
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
            {/* Posts Button */}
            <Button variant='primary' href='/posts' className='me-3'>
              View Posts
            </Button>
            
            {/* Create New Post Button */}
            <Button variant='success' href='/create-post' className='me-3'>
              Create a New Post
            </Button>
            
            {/* Notification Icon */}
            <Button variant='outline-secondary' href='/notifications' className='d-flex align-items-center'>
              <FaBell size={20} className='me-2' />
              Notifications
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
