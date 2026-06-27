"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { loginAction, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

function LoginForm() {
  const params = useSearchParams();
  const justRegistered = params.get("registered") === "1";
  const [showPw, setShowPw] = useState(false);
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <main className="mx-auto max-w-md px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-brand">
        Welcome back
      </p>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Log in</h1>
      <p className="mb-7 text-sm text-muted">
        Continue your WASSCE preparation.
      </p>

      {justRegistered && (
        <p
          role="status"
          className="mb-5 rounded-lg bg-success-lt px-3 py-2 text-sm font-medium text-success"
        >
          <span aria-hidden="true">✅ </span>Account created. Please log in to
          continue.
        </p>
      )}

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
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Your password"
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
          disabled={pending}
          className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-[#1340B8] disabled:opacity-60"
        >
          {pending ? "Logging in…" : "Log In →"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-brand">
          Sign up
        </Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo />
        <Link
          href="/signup"
          className="ml-auto text-sm text-white/70 transition hover:text-white"
        >
          Create an account
        </Link>
      </header>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
