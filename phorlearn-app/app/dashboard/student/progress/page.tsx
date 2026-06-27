import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { gradeFor, TARGET_PERCENTAGE } from "@/lib/grades";
import { DashboardShell, PageHead, Widget, Stat } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

interface SubjectRow {
  subject: string;
  progress: number;
  color: string;
}
interface StatsRow {
  lessons_done: number;
  study_minutes: number;
  quiz_average: number;
  streak_days: number;
}
interface AchievementRow {
  name: string;
  description: string | null;
  icon: string | null;
  unlocked: boolean;
}

function formatStudyTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

export default async function ProgressPage() {
  const profile = await requireProfile("student");
  const supabase = await createClient();

  const [subjectsRes, statsRes, achRes] = await Promise.all([
    supabase
      .from("subject_progress")
      .select("subject, progress, color")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("weekly_stats")
      .select("lessons_done, study_minutes, quiz_average, streak_days")
      .eq("user_id", profile.id)
      .maybeSingle(),
    supabase
      .from("achievements")
      .select("name, description, icon, unlocked")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true }),
  ]);

  const subjects = (subjectsRes.data ?? []) as SubjectRow[];
  const stats = (statsRes.data ?? null) as StatsRow | null;
  const achievements = (achRes.data ?? []) as AchievementRow[];

  const focusAreas = subjects.filter((s) => s.progress < TARGET_PERCENTAGE);
  const firstName = (profile.full_name ?? "Student").split(" ")[0];

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Progress & Performance"
        title={`${firstName}'s Report 📊`}
        sub="Your standing across all subjects, with WASSCE grade equivalents."
      />

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <Widget label="Subject Performance">
          {subjects.length ? (
            <div className="space-y-3.5">
              {subjects.map((s) => {
                const g = gradeFor(s.progress);
                return (
                  <div key={s.subject}>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span>{s.subject}</span>
                      <span style={{ color: g.color }}>
                        {g.code} · {s.progress}%
                      </span>
                    </div>
                    <div className="h-[7px] overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${s.progress}%`, background: s.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted">No subject data yet.</p>
          )}
        </Widget>

        <div className="space-y-4">
          <Widget label="Overall Stats">
            <div className="flex flex-col gap-2">
              <Stat n={`${stats?.quiz_average ?? 0}%`} l="Avg Score" />
              <Stat n={formatStudyTime(stats?.study_minutes ?? 0)} l="Study Time" />
              <Stat n={`${stats?.streak_days ?? 0}🔥`} l="Day Streak" />
            </div>
          </Widget>

          <Widget label="⚠️ Focus Areas">
            {focusAreas.length ? (
              <div className="space-y-2 text-[13px] text-ink2">
                {focusAreas.map((s) => {
                  const need = TARGET_PERCENTAGE - s.progress;
                  return (
                    <p key={s.subject}>
                      <strong>{s.subject}</strong> needs{" "}
                      <strong className="text-danger">+{need}%</strong> to reach a
                      solid credit ({gradeFor(TARGET_PERCENTAGE).code}).
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-success">
                🎉 Every subject is on target. Great work!
              </p>
            )}
          </Widget>
        </div>
      </div>

      <Widget label="Achievements" className="mt-4">
        {achievements.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.name}
                className={`rounded-xl border-2 p-4 text-center transition ${
                  a.unlocked
                    ? "border-transparent bg-white shadow-card"
                    : "border-dashed border-line bg-faint opacity-60"
                }`}
              >
                <div className="text-3xl">{a.icon}</div>
                <div className="mt-1.5 text-[13px] font-bold text-ink">
                  {a.name}
                </div>
                <div className="mt-0.5 text-[11px] text-muted">
                  {a.description}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-wide">
                  {a.unlocked ? (
                    <span className="text-success">Unlocked</span>
                  ) : (
                    <span className="text-muted">🔒 Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No achievements yet.</p>
        )}
      </Widget>

    </DashboardShell>
  );
}
