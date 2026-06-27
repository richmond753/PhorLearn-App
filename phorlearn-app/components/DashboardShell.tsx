import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ScreenNav } from "@/components/ScreenNav";
import { StudentNav } from "@/components/StudentNav";
import { signOutAction } from "@/app/auth/actions";
import { ROLE_META, type Role } from "@/lib/roles";
import type { Profile } from "@/lib/auth";

const STUDENT_NAV = [
  { href: "/dashboard/student", label: "Dashboard" },
  { href: "/dashboard/student/subjects", label: "Subjects" },
  { href: "/dashboard/student/health", label: "Health" },
  { href: "/dashboard/student/past-questions", label: "Past Questions" },
  { href: "/dashboard/student/resources", label: "Resources" },
  { href: "/dashboard/student/career", label: "Career" },
  { href: "/dashboard/student/progress", label: "Progress" },
];

export function DashboardShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const meta = ROLE_META[profile.role as Role];
  const initials = (profile.full_name ?? profile.email ?? "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand focus:shadow-card"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 flex h-14 items-center gap-5 bg-ink px-7 text-white">
        <Logo href={`/dashboard/${profile.role}`} />
        {profile.role === "student" && <StudentNav items={STUDENT_NAV} />}
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide sm:inline">
            <span aria-hidden="true">{meta.icon}</span> {meta.label}
          </span>
          <Link
            href="/dashboard/help"
            className="hidden text-[13px] font-semibold text-white/70 transition hover:text-white sm:inline"
          >
            Help
          </Link>
          <Link
            href="/dashboard/profile"
            title="My profile"
            aria-label="My profile"
            className="transition hover:opacity-80"
          >
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt="Your profile picture"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/30"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-mid text-xs font-bold"
              >
                {initials}
              </span>
            )}
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-lg border-2 border-white/20 px-3 py-1.5 text-xs font-bold text-white/80 transition hover:border-white/50 hover:text-white"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-5xl animate-up px-5 py-8 focus:outline-none"
      >
        {profile.role === "student" && (
          <ScreenNav screens={STUDENT_NAV} variant="top" />
        )}
        {children}
        {profile.role === "student" && (
          <ScreenNav screens={STUDENT_NAV} variant="bottom" />
        )}
      </main>
    </div>
  );
}

export function PageHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-brand">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      {sub && <p className="mt-1 text-sm leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

export function Widget({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-white p-5 shadow-card ${className}`}>
      {label && (
        <div className="mb-3.5 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function ProgressRow({
  label,
  value,
  color = "#1B4FD8",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs font-semibold">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-[7px] overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex-1 rounded-[10px] bg-faint px-2.5 py-3.5 text-center">
      <div className="text-[22px] font-extrabold text-brand">{n}</div>
      <div className="mt-0.5 text-[10px] font-semibold tracking-wide text-muted">
        {l}
      </div>
    </div>
  );
}
