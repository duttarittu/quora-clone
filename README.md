# Quora-Like Website

## Overview

The project is a Quora-like platform where users can create accounts, log in, post content, and interact with posts. The backend is built with Node.js, Express, and MongoDB, and includes JWT authentication and core functionalities for posts and comments.

## Backend Implementation

### 1. Project Setup

- Initialized the project.
- Set up `mongoose` for MongoDB connection.
- Configured environment variables for sensitive data (e.g., JWT secret, MongoDB URI).

### 2. Models

- **User Model (`models/User.js`):** Fields: `username`, `email`, `password`, `createdAt`.
- **Post Model (`models/Post.js`):** Fields: `user`, `subject`, `description`, `tags`, `likes`, `comments`, `createdAt`.
- **Comment Model (`models/Comment.js`):** Fields: `user`, `post`, `text`, `createdAt`.

### 3. Authentication

- **User Registration (`/api/users/register`):** Registers a new user.
- **User Login (`/api/users/login`):** Authenticates a user and generates a JWT token.

### 4. Post Routes (`routes/posts.js`):

- **Add a Comment to a Post (`POST /api/posts/:postId/comments`):** Allows authenticated users to add comments.
- **Get a Single Post (`GET /api/posts/:id`):** Retrieves a specific post by ID.
- **Get Posts by Tag (`GET /api/posts/tag/:tag`):** Retrieves posts filtered by a specific tag.
- **Like a Post (`POST /api/posts/:postId/like`):** Allows users to like a post.

### 5. Error Handling

- Added error handling for various routes.

## Future Work

- **Frontend Implementation:** Create a frontend to interact with the backend.
- **Additional Features:** Implement functionality for updating and deleting posts, notifications, user profiles, etc.