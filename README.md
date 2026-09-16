# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Structure

### Frontend (`client/`)
| Package | Purpose |
|---|---|
| **React** |  |
| **Vite** |  |

### Backend (`server/`)
| Package | Purpose |
|---|---|
| **Express** | Web framework that handles routes and requests |
| **dotenv** | Loads secrets/config from `.env` |
| **cors** | Allows the frontend (different origin) to call the API |
| **pg** | Postgres driver that connects to our database |
| **nodemon** *(dev only)* | Auto-restarts the server on file changes |

## Setup

### 1. Frontend
```bash
cd client
npm install
npm run dev
```
→ `http://localhost:5173`

### 2. Backend
```bash
cd server
npm install
cp .env.example .env   # fill in real values
npm run dev
```
→ `http://localhost:3000`

> `.env` is gitignored and never comes from git. `npm install` alone won't set it up.