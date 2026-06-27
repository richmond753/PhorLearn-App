import Link from "next/link";
import { Logo } from "@/components/Logo";

const FEATURES = [
  {
    icon: "📋",
    title: "WASSCE Past Questions",
    body: "2020 – 2023 papers across all subjects. Practice, time yourself, review answers.",
  },
  {
    icon: "🤖",
    title: "AI Study Helper",
    body: "Ask anything. Get instant explanations, worked examples and study tips.",
  },
  {
    icon: "🎓",
    title: "Career Guidance",
    body: "Explore universities, programmes and career paths aligned to your subjects.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo />
        <nav className="ml-auto flex items-center gap-3 text-sm">
          <Link href="/login" className="text-white/70 transition hover:text-white">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-brand px-4 py-2 font-bold transition hover:bg-[#1340B8]"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <section className="relative mb-5 overflow-hidden rounded-[20px] bg-ink px-8 py-14 text-white sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-mid/15" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-gold/10" />
          <div className="relative">
            <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[#93B4FF]">
              PhorLearn · Senior High School
            </p>
            <h1 className="mb-3 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Your <span className="text-[#93B4FF]">WASSCE</span>
              <br />
              Starts Here.
            </h1>
            <p className="mb-7 max-w-md text-base leading-relaxed text-white/70">
              Ghana&apos;s most focused SHS study platform. Past questions, AI
              tutoring, live assessments and career guidance — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-brand px-7 py-3 text-sm font-bold transition hover:bg-[#1340B8]"
              >
                Get Started →
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-white/25 bg-white/10 px-7 py-3 text-sm font-bold transition hover:bg-white/20"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border-2 border-transparent bg-white p-5 shadow-card"
            >
              <div className="mb-2.5 text-3xl">{f.icon}</div>
              <div className="mb-1 text-[15px] font-bold">{f.title}</div>
              <div className="text-[13px] leading-relaxed text-muted">{f.body}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
