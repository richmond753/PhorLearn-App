"use client";

import { useState } from "react";
import Link from "next/link";

export interface ReportStats {
  total_users: number;
  active_today: number;
  lessons: number;
  resources: number;
  shs1_pct: number;
  shs2_pct: number;
  shs3_pct: number;
  growth_this_month: number;
  growth_last_month: number;
  retention_pct: number;
}

export interface ReportSubject {
  name: string;
  sessions: number;
}

export default function AdminActions({
  stats,
  topSubjects,
}: {
  stats: ReportStats;
  topSubjects: ReportSubject[];
}) {
  const [exported, setExported] = useState(false);

  function exportReport() {
    const today = new Date().toISOString().slice(0, 10);
    const lines: string[] = [
      "PhorLearn SHS — Platform Report",
      `Generated,${today}`,
      "",
      "Metric,Value",
      `Total users,${stats.total_users}`,
      `Active today,${stats.active_today}`,
      `Lessons,${stats.lessons}`,
      `Resources,${stats.resources}`,
      `SHS1 share (%),${stats.shs1_pct}`,
      `SHS2 share (%),${stats.shs2_pct}`,
      `SHS3 share (%),${stats.shs3_pct}`,
      `Growth this month,${stats.growth_this_month}`,
      `Growth last month,${stats.growth_last_month}`,
      `Retention (%),${stats.retention_pct}`,
      "",
      "Top subjects by session count",
      "Rank,Subject,Sessions",
      ...topSubjects.map((s, i) => `${i + 1},${s.name},${s.sessions}`),
    ];
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `phorlearn-report-${today}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    window.setTimeout(() => setExported(false), 2500);
  }

  return (
    <div className="flex flex-col gap-2 text-sm font-bold">
      <Link
        href="/dashboard/admin/users"
        className="rounded-lg bg-brand py-2.5 text-center text-white transition hover:bg-[#1340B8]"
      >
        <span aria-hidden="true">👤 </span>Manage Users
      </Link>
      <Link
        href="/dashboard/admin/content"
        className="rounded-lg border-2 border-brand py-2.5 text-center text-brand transition hover:bg-brand-lt"
      >
        <span aria-hidden="true">📋 </span>Content Review
      </Link>
      <button
        type="button"
        onClick={exportReport}
        className="rounded-lg border-2 border-line py-2.5 text-muted transition hover:border-brand hover:text-brand"
      >
        <span aria-hidden="true">📊 </span>
        {exported ? "Report downloaded ✓" : "Export Report (CSV)"}
      </button>
      <p role="status" className="text-center text-[11px] font-medium text-muted">
        {exported
          ? "Saved to your downloads folder."
          : "Downloads a CSV of platform stats and top subjects."}
      </p>
    </div>
  );
}
