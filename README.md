# Task Manager (MERN Stack)

A full-stack productivity app with JWT authentication, private per-user task workspaces, filtering/search/sort, and a stats dashboard.

## Tech Stack
- MongoDB + Mongoose
- Express.js + JWT + bcryptjs + express-validator
- React.js (Vite) + Tailwind CSS + React Router + Axios + react-hot-toast

## Project Structure
```
task-manager/
  backend/
    config/db.js
    models/User.js
    models/Task.js
    middleware/auth.js
    middleware/validate.js
    middleware/errorHandler.js
    controllers/authController.js
    controllers/taskController.js
    routes/authRoutes.js
    routes/taskRoutes.js
    server.js
  frontend/
    src/
      api/axios.js
      context/AuthContext.jsx
      components/
      pages/
      App.jsx
      main.jsx
```

## Setup Instructions

### Backend
```
cd backend
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Runs on `http://localhost:5000`.

### Frontend
```
cd frontend
cp .env.example .env   # set VITE_API_URL
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## Deployment
- Backend → Render/Railway (set `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `CLIENT_URL` env vars)
- Frontend → Vercel/Netlify (set `VITE_API_URL` to deployed backend URL)
- Database → MongoDB Atlas

## API Documentation

Base URL: `/api`

### Auth
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/auth/register` | No | `{ name, email, password }` |
| POST | `/auth/login` | No | `{ email, password }` |
| GET | `/auth/me` | Yes | - |

All authenticated requests require header: `Authorization: Bearer <token>`

### Tasks
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/tasks?status=&search=&sortBy=` | Yes | List tasks (status: all/pending/completed, sortBy: newest/oldest/priority/dueDate) |
| GET | `/tasks/stats` | Yes | Total/completed/pending/overdue counts |
| GET | `/tasks/:id` | Yes | Get single task (owner only) |
| POST | `/tasks` | Yes | `{ title, description, priority, dueDate, completed }` |
| PUT | `/tasks/:id` | Yes | Update task (owner only) |
| PATCH | `/tasks/:id/toggle` | Yes | Toggle completion |
| DELETE | `/tasks/:id` | Yes | Delete a task (owner only) |
| DELETE | `/tasks/completed` | Yes | Delete all completed tasks |

All task endpoints verify `task.user === req.user._id` before update/delete, returning `403` otherwise.
