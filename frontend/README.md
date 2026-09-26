# Tripora frontend

Premium travel-planning UI for Tripora.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Run

```bash
cd frontend
npm install
npm run dev
```

## Scripts

- `npm run dev` — local development
- `npm run build` — typecheck and production build
- `npm run preview` — preview the production build

## Architecture

UI talks to `src/services` only. Those modules currently return mock data from `src/data`. Replace service implementations with API calls when the backend is ready — pages and components should not need a rewrite.
