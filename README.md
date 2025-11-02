# Blog App — Fullstack (Frontend + Backend)

Short description

This is a simple full-stack blog application composed of:

- A backend API (Node.js + Express + MongoDB) that handles authentication, posts, and comments.
- A frontend single-page app (React + Vite + TypeScript) that consumes the API, allows users to register/login, create and edit posts, and add comments.

The backend exposes REST endpoints under `/api` and includes JWT-based authentication. The frontend uses Axios and reads the API base URL from Vite env variables.

## Quick architecture

- Backend: Express routes in `src/routes/`, controllers in `src/controllers/`, and Mongoose models in `src/models/`.
- Frontend: React components in `src/components/`, pages in `src/pages/`, API wrapper in `src/lib/api.ts`.

## Prerequisites

- Node.js (LTS recommended) and npm installed.
- MongoDB (local or MongoDB Atlas) or an accessible MongoDB connection string.

## Install and run locally (Windows PowerShell)

1. Clone or copy the repository so you have both `blog-backend` and `blog-frontend` folders.

2. Backend

```powershell
cd f:\Programming\React\blog-backend
# copy env template
copy .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET as needed (see below)
npm install
# for development with auto-restart
npm run dev
# or to run normally
npm start
```

- Important `.env` variables used by the backend (create or edit `.env` in `blog-backend`):
  - `MONGO_URI` — MongoDB connection string (default: `mongodb://localhost:27017/blog`).
  - `JWT_SECRET` — secret used to sign JWT tokens (default falls back to `change_me` if not set).
  - `PORT` — optional, port to run the server on (default: `4000`).

3. Frontend

```powershell
cd f:\Programming\React\blog-frontend
# create a .env.local file or use the Vite env file convention
# Example: create .env with a line like VITE_API_URL="http://localhost:4000"
npm install
npm run dev
```

- The frontend reads the API base URL from `VITE_API_URL` (if not provided it uses `http://localhost:4000`).

4. Using the app

- Backend health check: `GET http://localhost:4000/health`
- Typical API base: `http://localhost:4000/api`
- Register/login endpoints are under `/api/auth`.

## Notes and tips

- For local development, running MongoDB locally is simplest. If you use Atlas, paste the connection string into `MONGO_URI`.
- If you get CORS issues, the backend already includes `cors()` in the middleware.
- The backend will not crash on initial DB connection errors — it logs the error and continues (useful when developing without DB).

## Dependencies

### Backend (blog-backend/package.json)

Dependencies:

- bcryptjs: ^3.0.2
- cors: ^2.8.5
- dotenv: ^17.2.3
- express: ^5.1.0
- express-validator: ^7.3.0
- jsonwebtoken: ^9.0.2
- mongoose: ^8.19.2

DevDependencies:

- eslint: ^9.39.0
- nodemon: ^3.1.10
- prettier: ^3.6.2

Scripts:

- dev: nodemon src/index.js
- start: node src/index.js

---

### Frontend (blog-frontend/package.json)

Dependencies:

- axios: ^1.13.1
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^7.9.5

DevDependencies:

- @types/react: ^19.2.2
- @types/react-dom: ^19.2.2
- @types/react-router-dom: ^5.3.3
- eslint: ^9.39.0
- prettier: ^3.6.2
- typescript: ~5.9.3
- vite: ^7.1.7

Scripts:

- dev: vite
- build: tsc && vite build
- preview: vite preview

---

If you'd like, I can also:

- Update the existing README files in each folder to point to this consolidated README, or
- Add sample `.env` files with example values, or
- Provide PowerShell scripts to run both backend and frontend together.

Let me know which of those you'd like next.
