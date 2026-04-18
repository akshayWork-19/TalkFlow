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
TalkFlow is a fully integrated fullstack forum platform. Users can register, log in, create posts, vote on discussions, leave comments, and explore content by category or search. The architecture prioritizes security, performance (Redis), and a real-time community feel (Socket.io).

### 🎨 Frontend Highlights
- **Modern Design System**: Built with **Tailwind CSS v4** and customized HSL tokens for a premium, high-contrast dark mode.
- **Glassmorphism UI**: High-end aesthetics using transparent, blurred elements and smooth micro-animations.
- **Live Data Feed**: Home feed powered by real MongoDB data with real-time upvote/downvote counts.
- **User Reputation & Badges**: Visual display of user status (Karma) and milestone badges (Bronze, Silver, Gold).
- **Global Search**: Unified search bar in the Navbar returning Posts, Users, and Tags instantly.

### 🛡 Backend Highlights
- **High-Performance Caching**: **Redis** integration for static data (Tags, Profiles) with an **automatic In-Memory fallback** for zero-downtime if Redis is offline.
- **Real-time Notifications**: Hybrid persistent notification system—saved to MongoDB for history and emitted via **Socket.io** for live browser alerts.
- **Gamification Engine**: Logic for **User Reputation** and virtual badges based on engagement quality.
- **Security-First Architecture**: Stabilized for **Express v5** with NoSQL injection protection and custom error handling.
- **Performance Profiling**: Custom `Server-Timing` API middleware for deep network insight.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide Icons, React Router v7, Axios |
| **Backend** | Node.js, Express.js v5 |
| **Caching** | Redis (with local fallback) |
| **Real-time** | Socket.io |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (JSON Web Tokens), bcrypt |

---

## 🚀 Key Features

| Feature | Status |
|---|---|
| Responsive Navbar with Unified Search | ✅ Live |
| Real-time Socket.io Notifications | ✅ Live |
| Redis Caching (Tags & Profiles) | ✅ Live |
| User Reputation & Badge System | ✅ Live |
| Home Feed with Pagination | ✅ Live |
| Follow / Unfollow System | ✅ Live |
| Nested Comments & Live Voting | ✅ Live |

---

## 🔗 API Endpoints

### Auth (`/forum/api/auth`)
| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |
| `GET` | `/auth/me` | 🔒 Get currentUser profile |

### Posts & Search (`/forum/api/post`)
| Method | Route | Description |
|---|---|---|
| `GET` | `/post` | Get all posts (paginated) |
| `GET` | `/post/search/all` | **Unified Global Search** (Users, Posts, Tags) |
| `POST` | `/post` | 🔒 Create a new post |

### Notifications (`/forum/api/notifications`) — 🔒 
| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Fetch recent notifications |
| `GET` | `/unread-count` | Get unread notification dot count |
| `PUT` | `/:id/read` | Mark a notification as read |

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
- [x] **Phase 2**: Backend Full API Integration
- [x] **Phase 3**: User Profiles & Reputation (Live)
- [x] **Phase 4**: Real-time Socket Notifications (Live)
- [ ] **Phase 5**: Image/Media Uploads (Cloudinary)
- [ ] **Phase 6**: Moderation & Reported Content Panel

---

## 📁 Project Structure

```
.
├── Backend/
│   ├── config/           # DB & Redis connection
│   ├── controllers/      # post, like, comment, user, follow logic
│   ├── middlewares/      # auth, serverTiming
│   ├── models/           # Post, User, Vote, Comment, Notification, Tag
│   └── server.js         # Entry point
├── Frontend/
│   └── src/
│       ├── components/   # PostCard, Navbar, Sidebar
│       ├── lib/          # axios client
│       └── pages/        # Home, Profile, Search
```
