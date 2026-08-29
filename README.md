# ✈️ TripVault — Full Stack MERN Travel Memory Journal

[![Vercel Deployment](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://tripvault.vercel.app)
[![Render Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://tripvault-api.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](LICENSE)
[![CodGen Internship](https://img.shields.io/badge/CodGen-Virtual%20Internship-purple?style=for-the-badge)](https://codgen.in)

> **TripVault** is a modern full-stack (MERN) web application designed to capture, organize, and share your travel memories and adventures. Built with a sleek glassmorphism UI, Cloudinary photo uploads, JWT authentication, and shareable public traveller profiles.

---

## 🔗 Live Application Links

- 🌐 **Live Web Application (Vercel)**: [https://tripvault.vercel.app](https://tripvault.vercel.app) *(Replace with your deployed Vercel link)*
- ⚡ **Live Backend API (Render)**: [https://tripvault-api.onrender.com/api/health](https://tripvault-api.onrender.com/api/health) *(Replace with your deployed Render link)*
- 📦 **GitHub Repository**: [https://github.com/vinu-buddy326/Tripvauit-auth-System](https://github.com/vinu-buddy326/Tripvauit-auth-System)

---

## 🎨 Application Screenshots & Preview

| Dashboard & Memory Feed | Mobile Responsive Navbar |
| :---: | :---: |
| ![TripVault Dashboard](https://raw.githubusercontent.com/vinu-buddy326/Tripvauit-auth-System/main/client/public/dashboard-preview.png) | ![Mobile View](https://raw.githubusercontent.com/vinu-buddy326/Tripvauit-auth-System/main/client/public/mobile-preview.png) |

*(Note: Replace preview images with real screenshots of your deployed app)*

---

## ✨ Features Highlight

- 🔐 **JWT User Authentication**: Secure registration, login, token-based session persistence, and protected routes.
- 🗺️ **Full Trip CRUD**: Create, read, update, and delete travel entries with destination names, dates, notes, and 1-5 star ratings.
- 📸 **Cloud Photo Uploads**: Seamless image upload to **Cloudinary** for cover photos and trip photo galleries.
- 🌐 **Public Shareable Profiles**: Shareable public URLs (`/profile/:username`) displaying a user's travel log without requiring login.
- 🔔 **Toast Notifications (`react-toastify`)**: Instant visual feedback for logins, registrations, trip creation/update/deletion, and photo uploads.
- 📱 **100% Mobile Responsive Design**: Glassmorphism aesthetic tailored with standard CSS Flexbox/Grid, built-in hamburger menu toggle on mobile devices (tested down to 375px screens).
- ⏳ **Loading & Empty States**: Polished loading spinners and friendly empty states across all pages.
- 🔒 **Data Protection & Ownership Scoping**: Users can only modify or delete their own trip entries and profile details.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)** with **Vite** build tooling
- **React Router (v7)** for dynamic client-side routing
- **Axios** for API integration with request interceptors
- **React Toastify** for toast notifications
- **Vanilla CSS** with glassmorphism design tokens & custom media queries

### Backend
- **Node.js** & **Express.js (v5)** framework
- **MongoDB Atlas** database with **Mongoose ODM**
- **JSON Web Tokens (JWT)** & **Bcrypt.js** for authentication & password hashing
- **Multer** & **Multer Storage Cloudinary** for file handling

### Infrastructure & Hosting
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render (Web Service)
- **Database Hosting**: MongoDB Atlas
- **Media Storage**: Cloudinary

---

## 📁 Repository Directory Structure

```
TripVault/
├── client/                     # React Frontend Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance configured with base URL
│   │   ├── components/
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── Footer.jsx      # App Footer with GitHub link
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx      # Responsive Navbar with mobile hamburger menu
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TripCard.jsx    # Memory card with photo lightbox
│   │   │   └── TripForm.jsx    # Create/Edit trip modal & photo upload
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   └── Register.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css           # Core design system & responsive rules
│   │   └── main.jsx
│   ├── .env.example            # Client env template
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js Express Backend
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── upload.js           # Multer + Cloudinary storage engine
│   ├── models/
│   │   ├── Trip.js             # Mongoose Trip Schema
│   │   └── User.js             # Mongoose User Schema
│   ├── routes/
│   │   ├── auth.js             # Login, register, get user routes
│   │   ├── trips.js            # Trip CRUD & photo upload routes
│   │   └── users.js            # Public profile & profile edit routes
│   ├── .env.example            # Server env template
│   ├── index.js                # Express app entry point
│   └── package.json
└── README.md
```

---

## 🚀 Quickstart & Local Setup Guide

Follow these steps to get a local development environment up and running:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or local MongoDB instance
- [Cloudinary Account](https://cloudinary.com/) (Free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/vinu-buddy326/Tripvauit-auth-System.git
cd Tripvauit-auth-System
```

### 2. Configure Backend (`server/`)
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tripvault?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev
# Server running on port 5000
```

### 3. Configure Frontend (`client/`)
In a new terminal window:
```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
# App running at http://localhost:5173
```

Open your browser and navigate to `http://localhost:5173` to start using TripVault locally!

---

## 🔌 API Endpoint Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **GET** | `/api/health` | Backend status health check | ❌ |
| **POST** | `/api/auth/register` | Register a new user | ❌ |
| **POST** | `/api/auth/login` | Login user & return JWT token | ❌ |
| **GET** | `/api/auth/me` | Fetch authenticated user data | ✅ |
| **GET** | `/api/trips` | Get all trips for logged in user | ✅ |
| **POST** | `/api/trips` | Create a new trip memory | ✅ |
| **PUT** | `/api/trips/:id` | Update trip details | ✅ |
| **DELETE** | `/api/trips/:id` | Delete a trip entry | ✅ |
| **POST** | `/api/trips/:id/upload` | Upload trip photo to Cloudinary | ✅ |
| **GET** | `/api/users/:username/profile` | Get public profile & shared trips | ❌ |
| **PUT** | `/api/users/profile` | Update user username and bio | ✅ |

---

## 🌐 Deployment Instructions

### Backend Deployment (Render)
1. Push your latest code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New Web Service**.
3. Connect your GitHub repository.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `node index.js`.
7. In **Environment Variables**, add:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
8. Click **Deploy Web Service**.

### Frontend Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/) → **Add New Project**.
2. Import your GitHub repository.
3. Set **Root Directory** to `client`.
4. Framework Preset: **Vite**.
5. In **Environment Variables**, add:
   - `VITE_API_URL` = `https://<your-render-backend-url>.onrender.com/api`
6. Click **Deploy**.

---

## ✅ Final Deliverables Checklist

- [x] **Loading States**: Spinners & skeleton states on all data fetching pages
- [x] **Error Handling**: Graceful error alert messages & toasts on API failures
- [x] **Toast Notifications**: Integrated `react-toastify` for auth, CRUD, uploads, & profile edits
- [x] **Empty States**: Clear, encouraging empty state cards when no trips exist
- [x] **Navbar**: Logo, navigation links, avatar chip, and logout button
- [x] **Footer**: Developer credits, internship details, and GitHub repository link
- [x] **Consistent Styling**: Unified dark glassmorphism theme, CSS variables, and fonts
- [x] **Mobile Responsiveness**: Adaptive layouts tested down to 375px width
- [x] **Hamburger Menu**: Mobile navbar collapse with toggleable dropdown
- [x] **Backend Deployment Ready**: Health check endpoint & env configurations for Render
- [x] **Frontend Deployment Ready**: Dynamic `VITE_API_URL` environment configuration for Vercel
- [x] **Professional Documentation**: Comprehensive README with setup guide & API docs

---

## 📄 License & Acknowledgments

This project was built as part of the **CodGen Virtual Internship Program (Full Stack MERN)**.

Created with ❤️ by **Vinut** — [GitHub Profile](https://github.com/vinu-buddy326)
