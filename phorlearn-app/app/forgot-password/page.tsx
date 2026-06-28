"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { resetPasswordAction, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

function ResetForm() {
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState
  );

  const mismatch = confirm.length > 0 && password !== confirm;

  return (
    <main className="mx-auto max-w-md px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-brand">
        Account recovery
      </p>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">
        Reset password
      </h1>
      <p className="mb-7 text-sm text-muted">
        Enter your email and choose a new password to regain access.
      </p>

      <form action={formAction} className="rounded-xl bg-white p-6 shadow-card">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-bold tracking-wide text-ink2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className="finput"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-bold tracking-wide text-ink2"
          >
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="finput pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[11px] font-bold text-brand transition hover:bg-brand-lt"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="mb-1.5 block text-xs font-bold tracking-wide text-ink2"
          >
            Confirm new password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type={showPw ? "text" : "password"}
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter your new password"
            aria-invalid={mismatch}
            className={`finput ${mismatch ? "border-danger" : ""}`}
          />
          {mismatch && (
            <p role="alert" className="mt-1 text-xs font-medium text-danger">
              The two passwords do not match.
            </p>
          )}
        </div>

        {state.error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-danger-lt px-3 py-2 text-sm font-medium text-danger"
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending || mismatch}
          className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-[#1340B8] disabled:opacity-60"
        >
          {pending ? "Resetting…" : "Reset password →"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-bold text-brand">
          Back to log in
        </Link>
      </p>
    </main>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo />
        <Link
          href="/login"
          className="ml-auto text-sm text-white/70 transition hover:text-white"
        >
          Log in
        </Link>
      </header>
      <ResetForm />
    </div>
  );
}
