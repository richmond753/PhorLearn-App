"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface Screen {
  href: string;
  label: string;
}

/**
 * Sequential Back / Next stepper for a fixed list of screens.
 * Highlights the current screen using a longest-prefix match so that
 * nested routes (e.g. /subjects/biology) still resolve to their section.
 */
export function ScreenNav({
  screens,
  variant = "bottom",
}: {
  screens: Screen[];
  variant?: "top" | "bottom";
}) {
  const pathname = usePathname();

  // Longest matching prefix wins (so /subjects/biology → Subjects).
  let index = -1;
  let best = -1;
  screens.forEach((s, i) => {
    const matches = pathname === s.href || pathname.startsWith(s.href + "/");
    if (matches && s.href.length > best) {
      best = s.href.length;
      index = i;
    }
  });

  if (index === -1) return null;

  const prev = index > 0 ? screens[index - 1] : null;
  const next = index < screens.length - 1 ? screens[index + 1] : null;

  const base =
    "flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 shadow-card";
  const wrapper = variant === "top" ? `${base} mb-6` : `${base} mt-8`;

  const btn =
    "flex min-w-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-bold transition";
  const active = `${btn} text-ink hover:bg-faint`;
  const disabled = `${btn} cursor-not-allowed text-line`;

  return (
    <nav className={wrapper} aria-label="Screen navigation">
      {prev ? (
        <Link href={prev.href} className={active}>
          <span aria-hidden>←</span>
          <span className="truncate">
            <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-muted sm:block">
              Back
            </span>
            {prev.label}
          </span>
        </Link>
      ) : (
        <span className={disabled}>
          <span aria-hidden>←</span>
          <span>Back</span>
        </span>
      )}

      <span className="shrink-0 text-[11px] font-bold text-muted">
        {index + 1} / {screens.length}
      </span>

      {next ? (
        <Link href={next.href} className={`${active} text-right`}>
          <span className="truncate">
            <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-muted sm:block">
              Next
            </span>
            {next.label}
          </span>
          <span aria-hidden>→</span>
        </Link>
      ) : (
        <span className={disabled}>
          <span>Next</span>
          <span aria-hidden>→</span>
        </span>
      )}
    </nav>
  );
}
