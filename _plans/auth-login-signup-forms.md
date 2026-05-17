# Plan: Authentication Login and Signup Forms

## Context

The `/login` and `/signup` pages exist as stubs (heading only, no forms). This plan implements the auth forms per the spec: email + password fields, a password show/hide toggle, submit with console.log, inline validation, and a link to switch between pages. No real auth integration yet.

---

## Files to Create (8)

| File                                          | Purpose               |
| --------------------------------------------- | --------------------- |
| `components/LoginForm/LoginForm.tsx`          | Login form component  |
| `components/LoginForm/LoginForm.module.css`   | Login form styles     |
| `components/LoginForm/index.ts`               | Barrel export         |
| `components/SignupForm/SignupForm.tsx`        | Signup form component |
| `components/SignupForm/SignupForm.module.css` | Signup form styles    |
| `components/SignupForm/index.ts`              | Barrel export         |
| `tests/components/LoginForm.test.tsx`         | LoginForm tests       |
| `tests/components/SignupForm.test.tsx`        | SignupForm tests      |

## Files to Modify (2)

| File                           | Change                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `app/(public)/login/page.tsx`  | Fix component name `SignupPage` → `LoginPage`, replace stub body with `<LoginForm />` |
| `app/(public)/signup/page.tsx` | Replace stub body with `<SignupForm />`                                               |

---

## Component Structure

Both components are `"use client"` and take no props. The layout wrappers (`.center-content` / `.page-content`) move **inside** the form component so each page file becomes a one-liner and the component is self-contained for testing.

**State (both forms):**

- `email: string` — controlled input
- `password: string` — controlled input
- `showPassword: boolean` — toggles input type
- `emailError: string` — inline error message ("" = no error)
- `passwordError: string` — inline error message

**Render shape:**

```
<div className="center-content">
  <div className={styles.formWrapper}>
    <h2 className="form-title">…</h2>
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" … />
        {emailError && <span role="alert">{emailError}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <div className={styles.passwordWrapper}>
          <input id="password" type={showPassword ? "text" : "password"} … />
          <button type="button" onClick={togglePassword} aria-label="Show/Hide password">
            <Eye /> or <EyeOff /> from lucide-react
          </button>
        </div>
        {passwordError && <span role="alert">{passwordError}</span>}
      </div>
      <button type="submit" className="btn">Login / Sign Up</button>
    </form>
    <p><Link href="/signup or /login">Switch form link</Link></p>
  </div>
</div>
```

**Key decisions:**

- `noValidate` prevents native browser validation from firing before React validation
- `type="button"` on toggle prevents accidental form submission
- `role="alert"` on error spans for accessibility and reliable RTL queries
- Global `.btn` class for submit button; global `.form-title` for heading

---

## Validation Logic (submit only)

```
handleSubmit:
  1. e.preventDefault()
  2. emailError  = email.trim() === ""  ? "Email is required"    : ""
  3. passwordError = password.trim() === "" ? "Password is required" : ""
  4. setEmailError / setPasswordError
  5. if either error → return (no console.log)
  6. console.log({ email: email.trim(), password: password.trim() })
```

No on-change clearing, no email format check — per spec.

---

## CSS Module Structure

Both modules follow the existing pattern (`@reference "../../app/globals.css"`, `@apply` for Tailwind utilities).

Key classes:

- `.formWrapper` — max-width container, flex column, gap
- `.field` — flex column, gap between label/input/error
- `.passwordWrapper` — relative positioning for toggle button overlay
- `.toggleBtn` — absolute right, no background, cursor pointer
- `.error` — `color: var(--color-error)`, small text
- `.footer` — muted centered link row

---

## Tests

Both test files use `userEvent.setup()` and `vi.spyOn(console, 'log')`. Tests per component:

1. Renders heading, email field, password field, submit button
2. Renders switch-form link with correct href
3. Password input type is "password" by default
4. Toggle changes type to "text"; toggling again returns to "password"
5. Submit with both fields empty → error messages shown, console.log NOT called
6. Submit with only email empty → email error only, no console.log
7. Submit with only password empty → password error only, no console.log
8. Submit with valid values → console.log called with `{ email, password }`

---

## Implementation Order

1. `components/LoginForm/` (all 3 files)
2. `tests/components/LoginForm.test.tsx` — run tests to verify
3. `app/(public)/login/page.tsx` — fix name bug, swap in `<LoginForm />`
4. `components/SignupForm/` (all 3 files) — mirrors LoginForm with adjusted copy
5. `tests/components/SignupForm.test.tsx`
6. `app/(public)/signup/page.tsx` — swap in `<SignupForm />`

---

## Verification

```bash
npx vitest run tests/components/LoginForm.test.tsx
npx vitest run tests/components/SignupForm.test.tsx
npm run lint
npm run dev   # manual test: visit /login and /signup, test submit and toggle
```
