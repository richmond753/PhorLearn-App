import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  DashboardShell,
  PageHead,
  Widget,
  ProgressRow,
} from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

interface StatsRow {
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
interface TopSubjectRow {
  name: string;
  sessions: number;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

export default async function AdminDashboard() {
  // Admin role check on load — non-admins are redirected to their dashboard.
  const profile = await requireProfile("admin");
  const supabase = await createClient();

  const [statsRes, topRes] = await Promise.all([
    supabase
      .from("platform_stats")
      .select(
        "total_users, active_today, lessons, resources, shs1_pct, shs2_pct, shs3_pct, growth_this_month, growth_last_month, retention_pct"
      )
      .eq("id", 1)
      .maybeSingle(),
    supabase
      .from("top_subjects")
      .select("name, sessions")
      .order("sort_order", { ascending: true }),
  ]);

  const s = (statsRes.data ?? null) as StatsRow | null;
  const top = (topRes.data ?? []) as TopSubjectRow[];

  const cards = s
    ? [
        { n: fmt(s.total_users), l: "Total Users", color: "#1B4FD8" },
        { n: fmt(s.active_today), l: "Active Today", color: "#16A34A" },
        { n: fmt(s.lessons), l: "Lessons", color: "#D4A017" },
        { n: fmt(s.resources), l: "Resources", color: "#7C3AED" },
      ]
    : [];

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Admin Dashboard"
        title="Platform Overview 🛡️"
        sub="PhorLearn SHS · Real-time statistics"
      />

      {!s ? (
        <Widget>
          <p className="text-sm text-muted">
            No platform statistics found. Run <code>supabase/schema.sql</code>{" "}
            to seed the <code>platform_stats</code> table.
          </p>
        </Widget>
      ) : (
        <>
          <div className="mb-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <div
                key={c.l}
                className="rounded-xl bg-white p-5 shadow-card"
                style={{ borderLeft: `4px solid ${c.color}` }}
              >
                <div className="text-[28px] font-black">{c.n}</div>
                <div className="mt-0.5 text-xs font-semibold text-muted">
                  {c.l}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <Widget label="User Breakdown by Class">
                <ProgressRow label="SHS 3" value={s.shs3_pct} />
                <ProgressRow label="SHS 2" value={s.shs2_pct} color="#16A34A" />
                <ProgressRow label="SHS 1" value={s.shs1_pct} color="#D4A017" />
              </Widget>

              <Widget label="Top Subjects (by session count)">
                <div className="overflow-hidden rounded-[10px] border border-line">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-faint text-left text-muted">
                        <th className="px-3.5 py-2 font-bold">#</th>
                        <th className="px-3.5 py-2 font-bold">Subject</th>
                        <th className="px-3.5 py-2 text-right font-bold">
                          Sessions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {top.map((t, i) => (
                        <tr key={t.name} className="border-t border-line">
                          <td className="px-3.5 py-2.5 font-semibold text-muted">
                            {i + 1}
                          </td>
                          <td className="px-3.5 py-2.5 font-semibold text-ink">
                            {t.name}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-bold text-ink2">
                            {fmt(t.sessions)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Widget>
            </div>

            <div className="space-y-4">
              <Widget label="User Growth">
                <div className="space-y-1 text-[13px] text-muted">
                  <p>
                    This month:{" "}
                    <strong className="text-success">
                      +{fmt(s.growth_this_month)}
                    </strong>
                  </p>
                  <p>Last month: +{fmt(s.growth_last_month)}</p>
                  <p>
                    Retention rate:{" "}
                    <strong className="text-ink">{s.retention_pct}%</strong>
                  </p>
                </div>
              </Widget>
              <Widget label="Admin Actions">
                <div className="flex flex-col gap-2 text-sm font-bold">
                  <button className="rounded-lg bg-brand py-2.5 text-white transition hover:bg-[#1340B8]">
                    👤 Manage Users
                  </button>
                  <button className="rounded-lg border-2 border-brand py-2.5 text-brand transition hover:bg-brand-lt">
                    📋 Content Review
                  </button>
                  <button className="rounded-lg border-2 border-line py-2.5 text-muted transition hover:border-brand hover:text-brand">
                    📊 Export Report
                  </button>
                </div>
              </Widget>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
