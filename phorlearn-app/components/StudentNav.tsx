"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export function StudentNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Student sections"
      className="hidden items-center gap-1 md:flex"
    >
      {items.map((n) => {
        const active =
          pathname === n.href || pathname.startsWith(n.href + "/");
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition hover:bg-white/10 hover:text-white ${
              active ? "bg-white/15 text-white" : "text-white/70"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
