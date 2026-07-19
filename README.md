# Authenticator
Authentication app using MERNstack 

# MERN Authentication System

A full-stack authentication system built with the MERN stack.

## Features

- User Registration
- User Login
- Secure Password Hashing
- Passport.js Authentication
- Express Sessions
- Protected Profile Route
- Auto Login After Registration
- Logout
- Delete Account
- React Frontend
- MongoDB Database
- Error Handling
- CORS Configuration

## Tech Stack

### Frontend
- React
- React Router
- Fetch API
- CSS

### Backend
- Node.js
- Express.js
- Passport.js
- passport-local
- passport-local-mongoose
- express-session
- CORS

### Database
- MongoDB
- Mongoose

## Installation

```bash
git clone <repository-url>
cd Authenticator
```

Backend

```bash
npm install
npm start
```

Frontend

```bash
cd client
npm install
npm run dev
```

## Environment

MongoDB must be running locally.

Default connection:

```
mongodb://127.0.0.1:27017/authenticate
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /home/register | Register a new user |
| POST | /home/login | Login |
| GET | /home/profile | Get logged in user's profile |
| POST | /home/logout | Logout |
| DELETE | /home/delete | Delete account |
/ is root route 

## What I Learned

- React Hooks
- React Router
- Fetch API
- Express Routing
- MongoDB & Mongoose
- Passport Authentication
- Sessions & Cookies
- Protected Routes
- CORS
- REST APIs
- Full-stack debugging