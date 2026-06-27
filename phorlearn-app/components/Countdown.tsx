"use client";

import { useEffect, useState } from "react";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: number): Parts {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2.5ch] text-center text-3xl font-black tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/50">
        {label}
      </span>
    </div>
  );
}

export function Countdown({
  examName,
  targetIso,
}: {
  examName: string;
  targetIso: string;
}) {
  const target = new Date(targetIso).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="relative mb-4 overflow-hidden rounded-xl bg-ink px-6 py-6 text-white">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-mid/15" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#93B4FF]">
            {examName} Countdown
          </p>
          <p className="mt-1 text-sm text-white/60">
            {parts && parts.days + parts.hours + parts.minutes + parts.seconds === 0
              ? "Exam day is here — good luck! 🎓"
              : "Stay consistent. Every session counts."}
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {parts ? (
            <>
              <Unit value={parts.days} label="Days" />
              <Unit value={parts.hours} label="Hrs" />
              <Unit value={parts.minutes} label="Min" />
              <Unit value={parts.seconds} label="Sec" />
            </>
          ) : (
            <div className="h-12 w-44 animate-pulse rounded-lg bg-white/10" />
          )}
        </div>
      </div>
    </div>
  );
}
