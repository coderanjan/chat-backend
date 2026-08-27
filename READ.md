# Real-Time Chat Application — Backend

A Node.js backend for a real-time chat application built with Express.js, MongoDB, Mongoose, JWT authentication, and Socket.IO.

The backend provides user authentication, user management, protected APIs, real-time messaging, chat history persistence, and application statistics.

## Features

### Authentication & Users

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Authorization middleware
* User CRUD operations
* Current authenticated user endpoint

### Real-Time Chat

* Real-time messaging using Socket.IO
* User join notifications
* User leave notifications
* Message broadcasting
* Messages saved in MongoDB
* Chat history retrieval

### Statistics

* Total registered users
* Total chat messages

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JSON Web Token (JWT)
* JavaScript

## Project Structure

```text
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```



## Installation

Clone the backend repository:

```bash
git clone https://github.com/coderanjan/chat-backend.git
cd https://github.com/coderanjan/chat-backend.git
```

Install dependencies:

```bash
npm install
```


## Start Development Server

```bash
npm run dev
```

The backend server will start on the configured port.



## API Functionality

The backend provides APIs for:

* User registration
* User login
* Get current authenticated user
* User CRUD operations
* Fetch chat history
* Fetch chat statistics

Protected routes require a valid JWT token in the request header:

```text
Authorization: Bearer <token>
```

## Socket.IO Events

### Client → Server

* `user-join` — notifies the server when a user joins the chat
* `message` — sends a new chat message

### Server → Client

* `message` — broadcasts a new message
* `user-join` — notifies connected users when someone joins
* `user-left` — notifies connected users when someone leaves

## Chat Persistence

When a user sends a message, the backend saves the message in MongoDB.

Previously stored messages can then be retrieved through the chat history API.

This allows users to see previous conversations after refreshing or reopening the application.

## CORS

The backend is configured to allow requests from the frontend application.

Make sure the frontend's API and Socket.IO URLs point to the correct backend server.

## Running the Application

Start the backend:

```bash
npm run dev
```

Then start the frontend in its separate repository:

```bash
npm run dev
```

The frontend communicates with this backend through REST APIs and Socket.IO.

## Notes

* A running MongoDB database is required.
* Keep `.env` private.
* Use `.env.example` as a template.
* Make sure the backend port matches the URL configured in the frontend.
* Make sure CORS is configured correctly for the frontend URL.

## Author

Anjan Pajiyar
