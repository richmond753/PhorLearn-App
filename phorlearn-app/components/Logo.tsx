import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-lg font-extrabold tracking-tight">⭐ PhorLearn</span>
      <span className="rounded-full bg-brand-mid px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
        SHS
      </span>
    </Link>
  );
}
