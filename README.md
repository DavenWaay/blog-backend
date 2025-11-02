# Activity 4: Weather Proxy API

This application allows users to view the **current temperature** and **weather condition** of any city they enter.

It uses the **OpenWeatherMap API** to retrieve real-time weather data, which the backend filters and returns in a simplified format.

The system consists of:
- A **NestJS backend** (acts as proxy + Swagger docs)
- A **React (Vite) frontend** (UI for user to search/view results)

---

## Repositories

- Backend (weather-proxy): https://github.com/DavenWaay/weather-proxy
- Frontend (weather-frontend): https://github.com/DavenWaay/weather-frontend.git

---

## Prerequisites

- Node.js
- npm or yarn
- Code editor
- OpenWeatherMap API key (environment variable: `OWM_KEY`)

---

## How to Run Locally

1. Clone both repositories

```
git clone https://github.com/DavenWaay/weather-proxy
git clone https://github.com/DavenWaay/weather-frontend.git
```

2. Install dependencies for both repos

```
npm install
# or
yarn install
```

3. In the backend repo, create `.env` file and add:

```
OWM_KEY=your_api_key_here
```

4. Run backend

```
npm run start:dev
```

Swagger Docs → http://localhost:3000/api

5. Run frontend

```
npm run dev
```

Frontend → http://localhost:5173

---

## Dependencies

### Backend (weather-proxy)
- NestJS core libs (`@nestjs/common`, `@nestjs/core`, `@nestjs/config`, etc.)
- `axios` (API calls)
- `@nestjs/swagger`, `swagger-ui-express`
- `reflect-metadata`, `rxjs`

**Dev deps:** `ts-node`, `typescript`, `jest`, `eslint`, etc.

### Frontend (weather-frontend)
- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`, `eslint`, etc.

> Exact versions are in each repository's `package.json`
