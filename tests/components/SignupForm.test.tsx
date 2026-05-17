import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";

import SignupForm from "@/components/SignupForm";

describe("SignupForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders heading, fields, and submit button", () => {
    render(<SignupForm />);

    expect(
      screen.getByRole("heading", { name: /signup/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it("renders a link to /login", () => {
    render(<SignupForm />);

    const link = screen.getByRole("link", { name: /log in/i });
    expect(link).toHaveAttribute("href", "/login");
  });

  it("password field is hidden by default", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("toggle shows password and hides it again", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows errors and does not log when submitted empty", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows only email error when password is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent(/email is required/i);
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows only password error when email is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText(/email/i), "thief@heist.com");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent(/password is required/i);
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("logs values on valid submit", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText(/email/i), "thief@heist.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(logSpy).toHaveBeenCalledWith({
      email: "thief@heist.com",
      password: "secret123",
    });
  });
});
