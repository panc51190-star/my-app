# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 16 app (App Router) with TypeScript, Tailwind CSS 4, and React 19. No external services (databases, Docker, APIs) are needed.

- **Package manager**: npm (lockfile: `package-lock.json`)
- **Dev server**: `npm run dev` starts on port 3000 with Turbopack
- **Standard commands** are in `package.json` scripts: `dev`, `build`, `start`, `lint` — see `README.md` for details
- **Lint**: `npm run lint` runs ESLint 9 with `eslint-config-next` (core-web-vitals + TypeScript rules)
- The dev server supports hot module replacement; file edits in `app/` are reflected immediately without restart
