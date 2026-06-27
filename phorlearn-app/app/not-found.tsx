import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo href="/" />
      </header>
      <main className="mx-auto flex max-w-md flex-col items-center px-5 py-20 text-center">
        <div className="text-6xl font-black tracking-tight text-brand">404</div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="rounded-lg border-2 border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
