# ✈️ TripVault — Travel Memory Journal

TripVault is a full-stack MERN (MongoDB, Express, Node.js, React) application built as part of the **Virtual Internship Program (Powered by CodGen)**.

---

## 📌 Project Features Overview

### 🔐 Week 1: Authentication System
- **User Registration**: Create a new account with name, email, and password.
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
  - `PUT /api/trips/:id` — Update trip fields (`title`, `destination`, dates, `description`, `rating`) with ownership verification (`trip.user.toString() === req.user.id`).
  - `DELETE /api/trips/:id` — Delete a trip permanently (with ownership verification).
- **Automated JWT Interceptor**: Axios interceptor (`client/src/api/axios.js`) automatically attaching `Bearer <token>` to request headers.
- **Interactive Trip Management UI**:
  - **Dashboard**: Displays user's trip collection in a responsive glass grid with floating hover animation effects.
  - **Create & Edit Forms**: Glass form pre-filled when editing, complete with interactive 5-star rating selector.
  - **Delete Prompt**: Confirmation prompt before deleting a trip, triggering automatic list refresh upon success.
  - **Empty State**: Friendly animated floating map illustration (`🗺️`) when no trips have been added yet.

---

## 🛠️ Stack & Technologies
- **Frontend**: React, Vite, React Router DOM, Custom Glassmorphism CSS Design System, Axios Interceptors
- **Backend**: Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, `dotenv`, `cors`
- **Database**: MongoDB Atlas / Mongoose ODM

---

## 📡 API Endpoints Reference

### 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT | ❌ No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user details | ✅ Yes (Bearer JWT) |

### 2. Trip Management Routes (`/api/trips`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips` | Create a new trip for logged-in user | ✅ Yes (Bearer JWT) |
| `GET` | `/api/trips` | Get all trips for logged-in user | ✅ Yes (Bearer JWT) |
| `GET` | `/api/trips/:id` | Get single trip details by ID | ✅ Yes (Bearer JWT) |
| `PUT` | `/api/trips/:id` | Update trip details (Owner only) | ✅ Yes (Bearer JWT) |
| `DELETE` | `/api/trips/:id` | Delete a trip by ID (Owner only) | ✅ Yes (Bearer JWT) |

---

## 🗄️ Database Schemas

### 1. User Schema (`server/models/User.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamps: true
}
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas database URI or local MongoDB instance

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
- **Current Milestone**: Week 2 of 4 (Trip Management & CRUD Operations)
