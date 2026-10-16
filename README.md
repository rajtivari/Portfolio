# Raj Tivari — Developer Portfolio

A cinematic, scroll-controlled personal portfolio with an airplane-window and sky sequence, followed by sections for projects, skills, certificates, experience, and contact.

## Project structure

- `artifacts/raj-tivari-portfolio/` — portfolio web application
- `artifacts/api-server/` — Express API service
- `lib/api-client-react/` and `lib/api-zod/` — generated API client and schema packages
- `pnpm-workspace.yaml` — workspace configuration

## Technology

- React, TypeScript, and Vite
- Tailwind CSS and Lucide icons
- Express API
- PostgreSQL and Drizzle ORM
- pnpm workspaces

## Development

Requirements: Node.js 24 and pnpm.

```bash
pnpm install
pnpm --filter @workspace/raj-tivari-portfolio run dev
```

Run project checks:

```bash
pnpm run typecheck
pnpm run build
```

The API service and database-backed features require the environment variables and services configured for the local development environment. Do not commit credentials or connection strings.

## Project status

The portfolio includes a cinematic introduction and sections for projects, skills, certificates, experience, and contact. Review each section before presenting it; placeholder or draft interactions should not be described as connected production services.

## Author

**Raj Tivari**  
GitHub: https://github.com/rajtivari  
Portfolio: https://rajtivari.github.io/
