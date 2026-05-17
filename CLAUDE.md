# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start the Next.js dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npm run test      # Run all tests (Vitest)
npx vitest run tests/components/LoginForm.test.tsx  # Run a single test file
```

## Architecture

**Next.js App Router** with two route groups that share no layout:

- `app/(public)/` — Unauthenticated pages (splash, login, signup, preview). No navbar.
- `app/(dashboard)/` — Authenticated pages wrapped in a layout that renders `<Navbar>`. All heist routes live here: `/heists`, `/heists/create`, `/heists/[id]`.

The splash page (`app/(public)/page.tsx`) is intended to redirect users — to `/heists` when logged in, `/login` when not. Auth backend is not yet implemented; forms currently log to the console on submit.

**Path alias:** `@/` maps to the repo root, so `@/components/Navbar` resolves to `components/Navbar/index.ts`.

**Styling:** Tailwind CSS v4 with a custom theme defined in `app/globals.css` (`@theme` block). Component-scoped styles use CSS Modules (e.g. `Navbar.module.css`). Module files reference the global theme via `@reference "../../app/globals.css"`.

Global utility classes available in any template: `.btn`, `.center-content`, `.page-content`, `.form-title`, `.preview-grid`. Theme tokens (usable via `@apply`): `bg-primary`, `bg-light`, `text-heading`, `text-body`, `text-error`, etc.

**Components:** Each component lives in `components/<Name>/` with three files: the component (`Name.tsx`), its CSS module (`Name.module.css`), and a barrel export (`index.ts` → `export { default } from "./Name"`). Add `"use client"` at the top of any component that uses state or event handlers.

**Icons:** `lucide-react` is the icon library (e.g. `import { Eye, EyeOff } from "lucide-react"`).

**Testing:** Vitest + React Testing Library. Tests live in `tests/` mirroring the source structure. `jsdom` is the test environment; `@testing-library/jest-dom` matchers are auto-imported via `vitest.setup.ts`. Use `userEvent.setup()` from `@testing-library/user-event` for interaction tests (click, type). Spy on console with `vi.spyOn` and restore with `vi.restoreAllMocks()` in `afterEach`.

**Feature workflow:** Feature specs live in `_specs/<feature-slug>.md`. Implementation plans live in `_plans/<feature-slug>.md`. Use the `/spec` slash command to scaffold a spec + branch from a short idea.

## Additional Coding Preferences

- Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the `@apply` directive.
- Use minimal project dependencies where possible.
- Use the `git switch -c` command to switch to new branches, not `git checkout`.
