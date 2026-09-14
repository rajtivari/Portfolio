# Raj Tivari Portfolio

A cinematic, scroll-controlled developer portfolio for Raj Tivari that transitions from an airplane-window sky sequence into a professional portfolio.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/raj-tivari-portfolio/src/App.tsx` — portfolio flow, intro state, and section composition
- `artifacts/raj-tivari-portfolio/src/components/portfolio/FrameCanvas.tsx` — rAF-driven canvas frame playback
- `artifacts/raj-tivari-portfolio/src/components/portfolio/PortfolioSections.tsx` — recruiter-facing portfolio sections
- `artifacts/raj-tivari-portfolio/src/components/portfolio/PortfolioNav.tsx` — desktop/mobile navigation
- `artifacts/raj-tivari-portfolio/src/index.css` — dark technical visual system and motion utilities
- `artifacts/raj-tivari-portfolio/public/frames/` — supplied 238-frame cinematic sequence

## Architecture decisions

- The cinematic intro is a scroll-controlled canvas sequence rather than autoplay so scroll position is the source of truth and reverse scrolling works naturally.
- Only nearby frames are progressively decoded and cached to keep the 238-frame sequence responsive on mobile.
- The AI Core is implemented only as the final intro overlay and is intentionally absent from portfolio content and navigation.
- Missing project, credential, experience, and contact records are shown as explicit placeholders instead of invented claims.

## Product

- Scroll-driven airplane-window / sky / clouds intro with identity, profile, mission, and focus reveals
- AI Core / System Online cinematic handoff into the portfolio
- Home, About, Projects, Skills, Certificates, Experience, and Contact sections
- Responsive desktop navigation and compact mobile navigation
- Contact message draft interaction with local confirmation state

## User preferences

- Premium, cinematic, futuristic, and professional; avoid a generic portfolio template.
- Do not invent projects, certificates, links, experience, education, awards, or achievements.

## Gotchas

- The frame sequence is intentionally large; keep frame loading progressive and avoid eagerly importing every image into JavaScript.
- Use the artifact workflow (`artifacts/raj-tivari-portfolio: web`) for preview because Vite requires its injected `PORT` and `BASE_PATH`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
