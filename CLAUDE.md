# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start the Next.js dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npm run test      # Run all tests (Vitest)
npx vitest run tests/components/Navbar.test.tsx  # Run a single test file
```

## Architecture

**Next.js App Router** with two route groups that share no layout:

- `app/(public)/` — Unauthenticated pages (splash, login, signup, preview). No navbar.
- `app/(dashboard)/` — Authenticated pages wrapped in a layout that renders `<Navbar>`. All heist routes live here: `/heists`, `/heists/create`, `/heists/[id]`.

The splash page (`app/(public)/page.tsx`) is intended to redirect users — to `/heists` when logged in, `/login` when not. Auth logic is not yet implemented.

**Path alias:** `@/` maps to the repo root, so `@/components/Navbar` resolves to `components/Navbar/index.ts`.

**Styling:** Tailwind CSS v4 with a custom theme defined in `app/globals.css` (`@theme` block). Component-scoped styles use CSS Modules (e.g. `Navbar.module.css`). Module files reference the global theme via `@reference "../../app/globals.css"`.

**Testing:** Vitest + React Testing Library. Tests live in `tests/` mirroring the source structure. `jsdom` is the test environment; `@testing-library/jest-dom` matchers are auto-imported via `vitest.setup.ts`.

## Additional Coding Preferences

- Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
- Use minimal project dependencies where possible.
- Use the `git switch -c` command to switch to new branches, not `git checkout`.
