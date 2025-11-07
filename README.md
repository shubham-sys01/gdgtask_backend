# Todo App - Backend

A Node.js and Express.js REST API backend for a full-stack Todo application with JWT authentication and MongoDB integration.

## Features

- User authentication (register/login) with JWT tokens
- Password hashing using bcrypt
- Protected routes with JWT middleware
- CRUD operations for todos
- MongoDB Atlas integration with Mongoose
- CORS enabled for frontend communication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn



## API Endpoints

### Authentication

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Todos (Protected Routes - Requires Authorization Header)

All todo endpoints require the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

#### GET `/todos`
Get all todos for the authenticated user.

**Response:** `200 OK`
```json
[
  {
    "_id": "todo_id",
    "userId": "user_id",
    "title": "Complete project",
    "completed": false,
    "createdAt": "2025-11-07T12:00:00.000Z",
    "updatedAt": "2025-11-07T12:00:00.000Z"
  }
]
```

#### POST `/todos`
Create a new todo.

**Request Body:**
```json
{
  "title": "New todo item"
}
```

**Response:** `201 Created`
```json
{
  "_id": "todo_id",
  "userId": "user_id",
  "title": "New todo item",
  "completed": false,
  "createdAt": "2025-11-07T12:00:00.000Z",
  "updatedAt": "2025-11-07T12:00:00.000Z"
}
```

#### PUT `/todos/:id`
Update a todo by ID.

**Request Body:**
```json
{
  "title": "Updated title",
  "completed": true
}
```

**Response:** `200 OK`
```json
{
  "_id": "todo_id",
  "userId": "user_id",
  "title": "Updated title",
  "completed": true,
  "createdAt": "2025-11-07T12:00:00.000Z",
  "updatedAt": "2025-11-07T12:00:00.000Z"
}
```

#### DELETE `/todos/:id`
Delete a todo by ID.

**Response:** `200 OK`
```json
{
  "message": "Todo deleted"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── todoController.js  # Todo CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User model schema
│   │   └── Todo.js            # Todo model schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── todos.js           # Todo routes
│   └── server.js              # Express app entry point
├── .env                       # Environment variables (create this)
├── package.json
└── README.md
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via MongoDB Atlas)
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-reload



## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- Protected routes verify JWT tokens
- CORS configured for secure cross-origin requests

