# 🗣️ Forum Fullstack Application

A modern, high-performance discussion platform built with a **React (Vite)** frontend and a **Node.js/Express** backend. This project features a premium UI, robust API security, and a scalable architecture designed for high engagement.

---

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Frontend Features](#-frontend-features)
- [Backend Features](#-backend-features)
- [Getting Started](#-getting-started)
- [Upcoming Integration & Roadmap](#-upcoming-integration--roadmap)
- [Project Structure](#-project-structure)

---

## 🌟 Project Overview
This application is being evolved from a standalone backend API into a full-stack forum. It prioritizes user experience with a "wow-factor" design, smooth transitions, and real-time interaction patterns.

### 🎨 Frontend Highlights
- **Vibrant & Modern UI**: Built with Shadcn UI components and Lucide icons.
- **Glassmorphism & Gradients**: Premium aesthetic with dark/light mode foundations.
- **Responsive Layout**: Seamless experience across mobile, tablet, and desktop.
- **Interactive Navigation**: Optimized Sidebar and Navbar with active state tracking.

### 🛡 Backend Highlights
- **Secure REST API**: Authentication, validation, and rate limiting baked in.
- **Scalable DB Schema**: MongoDB/Mongoose with optimized relations for posts and comments.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS v4, Shadcn UI, Lucide Icons, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (JSON Web Tokens) |
| **Security** | Helmet, Express-mongo-sanitize, CORS, Rate Limiting |
| **Docs** | Swagger, Scalar |

---

## 🚀 Frontend Features
- **Feed System**: Interactive post cards with engagement stats.
- **Category Explorer**: Grid-based navigation with dynamic category detail pages.
- **Notification System**: Interactive popover for likes, comments, and follows.
- **User Dashboard**: Profiles showcasing user activity and contribution stats.
- **Support Center**: Integrated help guides and search-based FAQ mockup.

---

## 🔗 Upcoming Integration
We are currently bridging the frontend mockups with the existing backend API. Key upcoming features include:
- **Real-time Sync**: Connecting the frontend state to MongoDB via the REST API.
- **Dynamic Content**: Replacing mockup cards with live post data from the database.
- **Auth Flow**: Implementing secure Login/Register persistence using the JWT system.
- **Live Notifications**: Triggering UI notifications on actual user interactions.

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/forum-backend.git
   cd forum-backend
   ```
2. Install dependencies for both parts:
   ```bash
   # Root / Parent
   npm install
   
   # Frontend
   cd Frontend
   npm install
   ```
3. Set up your `.env` in the root:
   ```env
   PORT=4000
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_uri
   ```
4. Run the application:
   ```bash
   # Run Backend (Root)
   npm run start
   
   # Run Frontend
   cd Frontend
   npm run dev
   ```

---

## 📅 Roadmap & User Features
- [ ] **Phase 1 (Current)**: Frontend Mockup & Routing UI [COMPLETED]
- [ ] **Phase 2**: Backend-Frontend Handshake [IN PROGRESS]
- [ ] **Phase 3**: User Profiles & Post Creation Flow
- [ ] **Phase 4**: Image Uploads (Multer/Cloudinary)
- [ ] **Phase 5**: Real-time Chat & Nested Replis Fixes
- [ ] **Phase 6**: Admin Panel & Moderation Tools

---

## 📁 Project Structure
```
.
├── Backend/              # REST API Controllers, Models, Routes
│   ├── config/           # Database & Security configs
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   └── Routes/           # API endpoints
├── Frontend/             # React (Vite) Application
│   ├── src/
│   │   ├── components/   # UI & Custom components
│   │   ├── pages/        # Main views (Home, Categories, etc.)
│   │   ├── layouts/      # MainLayout wrappers
│   │   └── lib/          # Utils & Theme config
└── server.js             # Root server entry
```
