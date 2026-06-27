"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { signUpAction, type AuthState } from "@/app/auth/actions";
import {
  ROLE_META,
  ROLES,
  SHS_CLASSES,
  PROGRAMMES,
  type Role,
} from "@/lib/roles";

const initialState: AuthState = {};

export default function SignUpPage() {
  const [role, setRole] = useState<Role>("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState
  );

  const isStudent = role === "student";
  const mismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo />
        <Link
          href="/login"
          className="ml-auto text-sm text-white/70 transition hover:text-white"
        >
          Already have an account? Log in
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-brand">
          Step 1
        </p>
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight">
          Create your account
        </h1>
        <p className="mb-7 text-sm text-muted">
          Choose your role, then sign up free to continue.
        </p>

        {/* Role selection */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {ROLES.map((r) => {
            const meta = ROLE_META[r];
            const selected = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={selected}
                className={`rounded-xl border-2 bg-white p-4 text-left shadow-card transition ${
                  selected
                    ? "border-brand bg-brand-lt"
                    : "border-transparent hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                }`}
              >
                <div className="mb-1.5 text-2xl" aria-hidden="true">
                  {meta.icon}
                </div>
                <div className="mb-0.5 text-sm font-bold">{meta.label}</div>
                <div className="text-xs leading-snug text-muted">
                  {meta.blurb}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sign-up form */}
        <form
          action={formAction}
          className="max-w-md rounded-xl bg-white p-6 shadow-card"
        >
          <input type="hidden" name="role" value={role} />

          <Field label="Full Name" htmlFor="full_name">
            <input
              id="full_name"
              name="full_name"
              required
              autoComplete="name"
              placeholder="e.g. Sandra Owusu"
              className="finput"
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className="finput"
            />
          </Field>

          <Field label="Password" htmlFor="password">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Create a strong password"
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
            <p className="mt-1 text-[11px] text-muted">
              At least 6 characters.
            </p>
          </Field>

          <Field label="Confirm Password" htmlFor="confirm_password">
            <input
              id="confirm_password"
              name="confirm_password"
              type={showPw ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              aria-invalid={mismatch}
              placeholder="Re-enter your password"
              className="finput"
              style={mismatch ? { borderColor: "#DC2626" } : undefined}
            />
            {mismatch && (
              <p
                role="alert"
                className="mt-1 text-[11px] font-semibold text-danger"
              >
                Passwords don&apos;t match yet.
              </p>
            )}
          </Field>

          {isStudent && (
            <>
              <Field label="Your Class" htmlFor="shs_class">
                <select
                  id="shs_class"
                  name="shs_class"
                  defaultValue="SHS3"
                  className="finput"
                >
                  {SHS_CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace("SHS", "SHS ")}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Programme" htmlFor="programme">
                <select
                  id="programme"
                  name="programme"
                  defaultValue="General Science"
                  className="finput"
                >
                  {PROGRAMMES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

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
            {pending ? "Creating account…" : "Create Account →"}
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-bold tracking-wide text-ink2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
