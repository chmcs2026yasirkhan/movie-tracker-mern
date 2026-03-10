# 🎬 Movie Tracker Application — MERN Stack

A full-stack Movie Tracker web application built using **MongoDB, Express.js, React.js, and Node.js (MERN Stack)**. This application allows users to track movies they have watched, are currently watching, or plan to watch in the future.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend | `https://jolly-meringue-5f33a3.netlify.app` |
| ⚙️ Backend API | `https://movie-tracker-mern.onrender.com` |
| 📁 GitHub Repo | `https://github.com/chmcs2026yasirkhan/movie-tracker-mern` |

> ⚠️ Replace the above URLs with your actual deployed URLs before evaluation.

---

## 📌 Project Overview

The Movie Tracker Application is a MERN stack project that enables users to:
- Maintain a personal movie watchlist
- Track watch status (Watched, Watching, Plan to Watch)
- Rate and review movies
- Search and filter their movie collection
- Add movie posters via thumbnail URLs

---

## ✨ Features Implemented

### Core Features
- ✅ **Add Movie** — Add movies with full details (title, genre, director, year, rating, platform, poster, review)
- ✅ **View All Movies** — Display all movies in a responsive card grid layout
- ✅ **Edit Movie** — Update any movie details with a pre-filled form
- ✅ **Delete Movie** — Remove movies with confirmation prompt
- ✅ **Search by Title** — Real-time search filtering by movie title

### Additional Features
- ✅ **Filter by Genre** — Filter movies by genre (Action, Drama, Sci-Fi, etc.)
- ✅ **Filter by Watch Status** — Filter by Watched / Watching / Plan to Watch
- ✅ **Star Rating Display** — Visual star rating on each movie card
- ✅ **Stats Dashboard** — Live count of Total, Watched, Watching, Plan to Watch
- ✅ **Toast Notifications** — Success/error feedback using react-hot-toast
- ✅ **Movie Poster Support** — Display movie posters via thumbnail URLs
- ✅ **Responsive Design** — Works on mobile, tablet, and desktop
- ✅ **DaisyUI Dark Theme** — Clean, modern dark UI with DaisyUI components

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, DaisyUI |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Deployment (Frontend) | Netlify |
| Deployment (Backend) | Render.com |

---

## 📁 Project Structure

```
movie-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB Atlas connection
│   │   ├── models/
│   │   │   └── movieModel.js          # Mongoose Schema
│   │   ├── controllers/
│   │   │   └── movieController.js     # CRUD logic
│   │   ├── routes/
│   │   │   └── movieRoutes.js         # API routes
│   │   └── server.js                  # Express server
│   ├── .env                           # Environment variables (not pushed to GitHub)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── movieService.js        # Axios API calls
    │   ├── components/
    │   │   ├── MovieForm.jsx          # Add/Edit form
    │   │   ├── MovieList.jsx          # Movie cards grid
    │   │   └── SearchBar.jsx          # Search + filters
    │   ├── App.jsx                    # Main component
    │   ├── main.jsx                   # Entry point
    │   └── index.css                  # Tailwind styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 📊 Movie Schema

| Field | Type | Required | Description |
|---|---|---|---|
| title | String | ✅ | Movie title |
| genre | String | ✅ | Movie genre |
| director | String | ✅ | Director name |
| releaseYear | Number | ✅ | Year of release |
| rating | Number | No | Rating out of 10 |
| watchStatus | String | No | Watched / Watching / Plan to Watch |
| platform | String | No | Streaming platform |
| thumbnailURL | String | No | Movie poster image URL |
| review | String | No | Personal review/notes |
| createdAt | Date | Auto | Mongoose timestamp |
| updatedAt | Date | Auto | Mongoose timestamp |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get single movie |
| POST | `/api/movies` | Create new movie |
| PUT | `/api/movies/:id` | Update movie |
| DELETE | `/api/movies/:id` | Delete movie |

---

## 🔄 Application Flow

```
React Frontend (Axios)
        ↓  HTTP Request
Express Backend (Node.js)
        ↓  Query
Mongoose ODM
        ↓  Operation
MongoDB Atlas (Cloud Database)
        ↓  Result
Mongoose → Express → React UI Updates
```

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOURUSERNAME/movie-tracker-mern.git
cd movie-tracker-mern
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/movietracker?retryWrites=true&w=majority
PORT=3000
```

Start the backend:
```bash
npm run dev
```
✅ Backend runs at: `http://localhost:3000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs at: `http://localhost:5173`

---

## ☁️ Deployment

### Backend — Render.com
- Connect GitHub repo to Render
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node src/server.js`
- Add `MONGO_URI` and `PORT` as environment variables

### Frontend — Netlify
- Connect GitHub repo to Netlify
- Base Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `frontend/dist`

---

## 👨‍💻 Developer

- **Project:** Movie Tracker Application
- **Stack:** MERN (MongoDB, Express, React, Node.js)
- **Course:** Full Stack Development Lab