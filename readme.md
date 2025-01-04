Overview

A distributed Mini Stack Overflow clone built with modern web technologies, aiming to provide a platform for users to ask questions, share knowledge, and receive personalized notifications. The project is designed with scalability in mind, with plans to transition from the current monolithic architecture to a microservices-based architecture.

Features

User Authentication: Secure user registration and login system.

Personalized Notifications: Real-time notifications for user interactions 

Responsive Design: Aesthetic and user-friendly UI powered by Tailwind CSS.

File Storage: MinIO object storage integration for handling file uploads.

Scalable Architecture: Docker and Nginx for containerization and load balancing.

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Object Storage: MinIO

Containerization: Docker

Reverse Proxy: Nginx

Future Plans

Transition to a microservices architecture for better scalability and maintainability.

Enhance notification system with additional features like email and SMS alerts.

Add advanced search and tagging functionality.

Installation

Prerequisites

Node.js

Docker and Docker Compose

MongoDB

Steps

Clone the repository:

git clone https://github.com/EFTY1309/mini-stack-overflow-clone.git
cd mini-stack-overflow-clone

Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

MONGO_URI=<your_mongo_connection_string>
MINIO_ACCESS_KEY=<your_minio_access_key>
MINIO_SECRET_KEY=<your_minio_secret_key>
JWT_SECRET=<your_jwt_secret>

Build and start the application:

docker-compose up --build

Access the application:

Frontend: http://localhost

Backend API: http://localhost:3000

Usage

Register as a new user or log in with existing credentials.

View and manage notifications for your activities.

Upload and manage files with MinIO.

Contributing

Contributions are welcome! To contribute:

Fork the repository.

Create a new branch for your feature/bugfix.

Submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions or suggestions, feel free to reach out at bsse1309@iit.du.ac.bd
