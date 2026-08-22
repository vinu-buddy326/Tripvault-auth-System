# ✈️ TripVault — Travel Memory Journal

TripVault is a full-stack MERN (MongoDB, Express, Node.js, React) application built as part of the **Virtual Internship Program (Powered by CodGen)**.

---

## 📌 Project Features Overview

### 🔐 Week 1: Authentication System
- **User Registration**: Create a new account with name, username, email, and password.
- **Password Security**: Passwords hashed securely using `bcryptjs` before database storage.
- **JWT Authentication**: Issue JSON Web Tokens (JWT) upon successful login for statelessly securing sessions.
- **Protected React Routes**: Frontend client router (`ProtectedRoute.jsx`) safeguarding private pages.
- **Glassmorphism Auth UI**: User interface with animated background ambient glow for Login and Registration pages.

### 🧳 Week 2: Trip Management (CRUD API & Dashboard UI)
- **MongoDB Trip Schema**: Mongoose model with `title`, `destination`, `startDate`, `endDate`, `description`, `rating` (1–5 stars), and relational `user` reference (`ObjectId`).
- **Protected Trip API Endpoints**:
  - `POST /api/trips` — Create a new travel memory linked to the logged-in user.
  - `GET /api/trips` — Retrieve trips belonging strictly to the authenticated user.
  - `GET /api/trips/:id` — Retrieve a single trip by ID (with ownership check).
  - `PUT /api/trips/:id` — Update trip fields (`title`, `destination`, dates, `description`, `rating`) with ownership verification.
  - `DELETE /api/trips/:id` — Delete a trip permanently (with ownership verification).
- **Automated JWT Interceptor**: Axios interceptor (`client/src/api/axios.js`) automatically attaching `Bearer <token>` to request headers.
- **Interactive Trip Management UI**:
  - **Dashboard**: Displays user's trip collection in a responsive glass grid with floating hover animation effects.
  - **Create & Edit Forms**: Glass form pre-filled when editing, complete with interactive 5-star rating selector.
  - **Delete Prompt**: Confirmation prompt before deleting a trip, triggering automatic list refresh upon success.

### 📸 Week 3: Cloudinary Photo Uploads & Public User Profiles
- **Cloud Media Storage (Cloudinary + Multer)**:
  - Backend integration with Cloudinary Node.js SDK and `multer-storage-cloudinary`.
  - Added `coverImage` (String) and `photos` (Array of Strings) fields to the `Trip` model.
  - Dedicated file upload middleware (`server/middleware/upload.js`) with 5MB image size limit and image filter.
- **Photo Upload API (`POST /api/trips/:id/upload`)**:
  - Protected endpoint receiving image uploads via `FormData`, transferring them to Cloudinary, and linking the uploaded URL to the trip.
- **Frontend Photo Gallery & Upload UI**:
  - File picker in Create/Edit Trip forms with instant image previews before uploading.
  - Trip card cover image banner display and photo count pill.
  - Interactive photo lightbox modal to view enlarged memory photos.
- **Public User Profiles**:
  - Updated `User` model with `username` (unique, required) and `bio` (optional).
  - Public route `GET /api/users/:username/profile` — viewable without authentication. Excludes sensitive fields (`password`, `email`) for maximum user privacy.
  - Profile Update API `PUT /api/users/profile` — enables authenticated users to edit their bio and handle from the dashboard.
- **Public Profile React View (`/profile/:username`)**:
  - Accessible without login, displaying traveler handle, avatar, bio, total trip count, and trip cards grid.
  - Navigation links: "My Profile" button in Dashboard header for instant access to user's public page.

---

## 🛠️ Stack & Technologies
- **Frontend**: React, Vite, React Router DOM, Custom Glassmorphism CSS Design System, Axios Interceptors
- **Backend**: Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, `multer`, `cloudinary`, `multer-storage-cloudinary`, `dotenv`, `cors`
- **Database**: MongoDB Atlas / Mongoose ODM

---

## 📡 API Endpoints Reference

### 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user with handle | ❌ No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT | ❌ No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user details | ✅ Yes (Bearer JWT) |

### 2. Trip Management & Photo Upload Routes (`/api/trips`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips` | Create a new trip for logged-in user | ✅ Yes (Bearer JWT) |
| `GET` | `/api/trips` | Get all trips for logged-in user | ✅ Yes (Bearer JWT) |
| `GET` | `/api/trips/:id` | Get single trip details by ID | ✅ Yes (Bearer JWT) |
| `PUT` | `/api/trips/:id` | Update trip details (Owner only) | ✅ Yes (Bearer JWT) |
| `DELETE` | `/api/trips/:id` | Delete a trip by ID (Owner only) | ✅ Yes (Bearer JWT) |
| `POST` | `/api/trips/:id/upload` | Upload photo to Cloudinary & attach URL | ✅ Yes (Bearer JWT) |

### 3. Public & Profile Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/:username/profile` | Public user profile & trips (safe fields only) | ❌ No |
| `PUT` | `/api/users/profile` | Update logged-in user's bio & username | ✅ Yes (Bearer JWT) |

---

## 🗄️ Database Schemas

### 1. User Schema (`server/models/User.js`)
```javascript
{
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  timestamps: true
}
```

### 2. Trip Schema (`server/models/Trip.js`)
```javascript
{
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  coverImage: { type: String, default: '' },
  photos: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamps: true
}
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas database URI
- Cloudinary Account credentials (cloud_name, api_key, api_secret)

### 1. Backend Server Setup
```bash
cd server
npm install
```
Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```bash
npm run dev
```

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎓 Internship Project Info
- **Program**: Full Stack (MERN) Virtual Internship Program
- **Powered by**: CodGen • [codgen.in](https://codgen.in)
- **Current Milestone**: Week 3 of 4 (Photo Uploads & Public User Profiles)
