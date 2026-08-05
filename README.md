# TripVault - Week 1

This is the Week 1 deliverable for the TripVault Virtual Internship Program.

## Features Built
- Backend server running on Node.js and Express
- MongoDB integration using Mongoose
- User Authentication (Register & Login) with JWT
- Password hashing with bcryptjs
- React Frontend powered by Vite
- Protected Routes for Dashboard

## How to Run

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Update the `.env` file with your MongoDB Atlas URI.
4. Start the backend server:
   ```bash
   npm run dev
   # or node index.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Go to `http://localhost:5173/` in your browser.
- Register a new user and login to view your dashboard.
