# Gram_X – Smart Farming Assistant

An AI-powered agriculture super app for rural Indian farmers: crop advisory, live mandi prices, government schemes, equipment rental, expense tracking, livestock management, and a marketplace — all in one place.

## Run & Operate

- `pnpm --filter @workspace/gram-x run dev` — run the frontend (React + Vite)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Wouter routing, TanStack Query, Framer Motion, Recharts, shadcn/ui
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle table definitions (one file per domain)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/gram-x/src/pages/` — React page components
- `artifacts/gram-x/src/components/` — Shared UI components including Layout
- `lib/api-client-react/src/generated/` — Generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — Generated Zod schemas for server validation (do not edit)

## Architecture decisions

- Contract-first: OpenAPI spec gates codegen → no hand-written API types anywhere
- All numeric DB columns (numeric/decimal) are cast to `Number()` before Zod parse to avoid string-number mismatch
- AI assistant uses keyword-matching fallback (no external API key required) — easy to swap with Gemini/OpenAI
- Weather and crop advisor use deterministic mock data — can be wired to real APIs (OpenWeather, Gemini)
- Expenses summary is computed server-side on every request (no materialized view needed at current scale)

## Product

Gram_X gives farmers:
- Live mandi prices for 12+ crops with price trend indicators
- Government scheme browser (7 national schemes with eligibility info)
- Equipment rental marketplace with owner contact
- Expense tracker with profit/loss charts by category and crop
- Livestock manager with feed schedule and vaccination reminders
- Buy/sell marketplace with direct farmer contact
- AI farming assistant with quick prompt chips
- 7-day weather forecast with farming-specific tips
- Crop advisor with soil/season-based recommendations

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- Numeric fields from Drizzle numeric/decimal columns come back as strings — always cast with `Number()` before passing to Zod
- The frontend's `main.tsx` must use `import App from "./App"` (default import), not named import
- Express 5: always parse `req.params.id` with `Array.isArray` guard before `parseInt`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
