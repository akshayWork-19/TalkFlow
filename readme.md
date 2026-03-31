# 🗣️ TalkFlow - Fullstack Community Platform

A modern, high-performance discussion platform built with a **React (Vite)** frontend and a **Node.js/Express** backend. This project features a premium UI, robust API security, real-time voting, commenting, and a scalable fullstack architecture.

---

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Frontend Features](#-frontend-features)
- [Backend Features](#-backend-features)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Project Structure](#-project-structure)

---

## 🌟 Project Overview
TalkFlow is a fully integrated fullstack forum platform. Users can register, log in, create posts, vote on discussions, leave comments, and explore content by category or search. The architecture prioritizes security, developer experience, and UI premium feel.

### 🎨 Frontend Highlights
- **Live Data Feed**: Home feed powered by real MongoDB data via REST API.
- **JWT Auth Flow**: Login/Register pages with token persistence and auto-redirect on expiry.
- **LeetCode-Style Voting**: Separate live Upvote/Downvote counts per post with visual feedback.
- **Nested Comments**: Toggle-able comment section per post with real-time submission.
- **Global Search**: Search posts by keyword directly from the Navbar (hits backend `$regex`).
- **Category Filtering**: Click any tag on a post to see all posts in that category.
- **Protected Routes**: Settings and Profile pages require authentication.
- **Popular Page**: Posts sorted by net vote score.
- **Authenticated Navbar**: Displays logged-in username with avatar initials and Logout.

### 🛡 Backend Highlights
- **Secure REST API**: JWT authentication, input validation, and rate limiting.
- **Smart Post Feed**: Single `GET /post` endpoint supports `?search=` and `?tag=` filters.
- **Voting Engine**: Three-way vote sync — `upVotesCount`, `downVotesCount`, and `votesCount` (net).
- **Comment System**: Nested comment support with `parentComment` reference.
- **Server Timing API**: Custom middleware adds `Server-Timing` headers for performance profiling.
- **Performance Monitoring**: DB query durations visible in Chrome DevTools → Network → Timing.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Shadcn UI, Lucide Icons, React Router v6, Axios |
| **Backend** | Node.js, Express.js v5 |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (JSON Web Tokens), bcrypt |
| **Security** | CORS, Rate Limiting, Express-mongo-sanitize |
| **Dev Tools** | Server Timing API, dotenv |

---

## 🚀 Frontend Features

| Feature | Status |
|---|---|
| Responsive Navbar with Search | ✅ Live |
| Login / Register Pages | ✅ Live |
| JWT Auth Context + Token Interceptor | ✅ Live |
| Home Feed (Real Posts from DB) | ✅ Live |
| Create Post Modal | ✅ Live |
| LeetCode-Style Voting (Up/Down) | ✅ Live |
| Toggle Comments per Post | ✅ Live |
| Global Search (hits backend) | ✅ Live |
| Category Detail (tag filter) | ✅ Live |
| Popular Posts (sorted by votes) | ✅ Live |
| Protected Routes (Settings/Profile) | ✅ Live |
| Auto-redirect on token expiry | ✅ Live |
| Notification Popover | ✅ UI Ready |
| User Profile Page | 🔄 In Progress |
| Trending Page | 🔄 In Progress |

---

## 🔗 API Endpoints

### Auth (`/forum/api/auth`)
| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |

### Posts (`/forum/api/post`) — 🔒 Auth Required
| Method | Route | Description |
|---|---|---|
| `GET` | `/post` | Get all posts (supports `?search=` and `?tag=`) |
| `POST` | `/post` | Create a new post |
| `GET` | `/post/:id` | Get a specific post |
| `PUT` | `/post/:id` | Update a post |
| `DELETE` | `/post/:id` | Delete a post |

### Votes (`/forum/api/like`) — 🔒 Auth Required
| Method | Route | Description |
|---|---|---|
| `POST` | `/like/:id/vote` | Toggle upvote/downvote on a post |
| `GET` | `/like/:id/votes` | Get vote counts for a post |
| `GET` | `/like/my-votes` | Get the current user's vote history |

### Comments (`/forum/api/comment`)
| Method | Route | Description |
|---|---|---|
| `POST` | `/comment` | 🔒 Create a comment on a post |
| `GET` | `/comment` | Get all comments (paginated) |
| `GET` | `/comment/:id` | Get a specific comment |

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/forum-backend.git
   cd forum-backend
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd Backend
   npm install

   # Frontend
   cd ../Frontend
   npm install
   ```

3. Set up your `.env` in `/Backend`:
   ```env
   PORT=4000
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_atlas_uri
   NODE_ENV=development
   ```

4. Seed the database with demo data:
   ```bash
   cd Backend
   node demo.js
   ```
   > Creates a `demo@talkflow.com` user (password: `password123`) and 3 sample posts.

5. Run both servers:
   ```bash
   # Terminal 1 — Backend
   cd Backend
   npm run start

   # Terminal 2 — Frontend
   cd Frontend
   npm run dev
   ```

6. Open `http://localhost:5173` and login with `demo@talkflow.com` / `password123`.

---

## 📅 Roadmap

- [x] **Phase 1**: Frontend UI & Routing
- [x] **Phase 2**: Backend-Frontend Integration (Auth, Posts, Votes, Comments, Search)
- [ ] **Phase 3**: User Profiles & Activity Feed
- [ ] **Phase 4**: Image Uploads (Multer/Cloudinary)
- [ ] **Phase 5**: Real-time Notifications (WebSockets)
- [ ] **Phase 6**: Admin Panel & Moderation Tools

---

## 📁 Project Structure

```
.
├── Backend/
│   ├── config/           # DB connection
│   ├── controllers/      # post, like, comment, user logic
│   ├── middlewares/      # auth, validation, error, serverTiming
│   ├── models/           # Post, User, Vote, Comment schemas
│   ├── Routes/           # API route definitions
│   ├── utils/            # Custom error classes
│   ├── demo.js           # Database seeding script
│   └── server.js         # Express app entry point
├── Frontend/
│   └── src/
│       ├── components/
│       │   ├── custom/   # PostCard, Navbar, Sidebar, CreatePostModal, ProtectedRoute
│       │   └── ui/       # Shadcn primitives
│       ├── context/      # AuthContext (JWT state management)
│       ├── lib/          # axios.js (API client + interceptors)
│       ├── pages/        # Home, Login, Register, Categories, Popular, etc.
│       └── layouts/      # MainLayout wrapper
```
