"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo href="/" />
      </header>
      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-20 text-center">
        <div className="text-5xl">⚠️</div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We hit an unexpected error. You can try again, and if it keeps
          happening, head back to your dashboard.
        </p>
        {error?.digest && (
          <p className="mt-3 rounded-lg bg-faint px-3 py-1.5 font-mono text-[11px] text-muted">
            Ref: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={reset}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
          >
            ↻ Try again
          </button>
          <Link
            href="/dashboard"
            className="rounded-lg border-2 border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
