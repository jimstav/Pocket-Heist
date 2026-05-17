# Spec for Authentication Login and Signup Forms

branch: claude/feature/auth-login-signup-forms
figma_component (if used): N/A

## Summary

Implement the authentication forms for the `/login` and `/signup` pages. Both pages share a similar form structure (email, password, submit button) and should make it easy for users to switch between them. For now, form submission only logs the field values to the console — no real auth integration yet.

## Functional Requirements

- The `/login` page renders a form with an email field, a password field, and a "Login" submit button
- The `/signup` page renders a form with an email field, a password field, and a "Sign Up" submit button
- The password field has a toggle icon that shows or hides the password text
- On form submission, the email and password values are logged to the browser console (no real auth call)
- Each page includes a navigation link to switch to the other form (e.g. "Don't have an account? Sign up" on login, and "Already have an account? Log in" on signup)
- Both forms validate that fields are not empty before allowing submission

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- User submits the form with one or both fields empty — should be blocked with inline validation
- User toggles password visibility multiple times without losing the typed value
- User navigates between login and signup — any previously typed values should be cleared
- Very long email or password inputs should not break the form layout

## Acceptance Criteria

- `/login` and `/signup` pages each render their respective form with email, password, and submit fields
- The password show/hide toggle works correctly and does not reset the input value
- Submitting a valid form logs `{ email, password }` to the console
- Submitting an empty form does not log anything and shows a validation message
- A link on each page navigates to the other form
- Both pages are part of the `(public)` route group and render without the Navbar

## Open Questions

- Should login and signup share a single reusable `AuthForm` component parameterised by mode, or be fully separate components? Separate components.
- Should there be any client-side email format validation beyond required-field checks? No.

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Renders the email field, password field, and submit button
- Password toggle changes the input type between `text` and `password`
- Submitting with empty fields does not call console.log and shows an error
- Submitting with valid fields calls console.log with the correct values
- The switch-form link points to the correct route
