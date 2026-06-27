import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Countdown } from "@/components/Countdown";
import {
  DashboardShell,
  PageHead,
  Widget,
  ProgressRow,
  Stat,
} from "@/components/DashboardShell";

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
interface HomeworkRow {
  id: string;
  title: string;
  subject: string | null;
  due_at: string;
}
interface ExamRow {
  exam_name: string;
  exam_date: string;
}

// Maps seeded subject names to lesson slugs so progress rows deep-link.
const SUBJECT_SLUG: Record<string, string> = {
  "Elective Maths": "elective-maths",
  "Core Maths": "core-maths",
  "Integrated Science": "integrated-science",
  Biology: "biology",
  Chemistry: "chemistry",
  Physics: "physics",
  English: "english",
};

function formatStudyTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

function dueLabel(dueIso: string): string {
  const days = Math.ceil(
    (new Date(dueIso).getTime() - Date.now()) / 86_400_000
  );
  if (days <= 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export default async function StudentDashboard() {
  const profile = await requireProfile("student");
  const supabase = await createClient();

  const [subjectsRes, statsRes, homeworkRes, examRes] = await Promise.all([
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
      .from("homework")
      .select("id, title, subject, due_at")
      .eq("user_id", profile.id)
      .gte("due_at", new Date().toISOString())
      .order("due_at", { ascending: true }),
    supabase
      .from("exam_config")
      .select("exam_name, exam_date")
      .eq("id", 1)
      .maybeSingle(),
  ]);

  const subjects = (subjectsRes.data ?? []) as SubjectRow[];
  const stats = (statsRes.data ?? null) as StatsRow | null;
  const homework = (homeworkRes.data ?? []) as HomeworkRow[];
  const exam = (examRes.data ?? null) as ExamRow | null;

  const firstName = (profile.full_name ?? "Student").split(" ")[0];
  const classLabel = profile.shs_class
    ? profile.shs_class.replace("SHS", "SHS ")
    : "SHS";
  const programme = profile.programme ?? "General";

  // Exam date → ISO at local midnight; fall back to +87 days.
  const examDate = exam?.exam_date
    ? `${exam.exam_date}T00:00:00`
    : new Date(Date.now() + 87 * 86_400_000).toISOString();
  const examName = exam?.exam_name ?? "WASSCE";

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow={`Dashboard · ${classLabel} · ${programme}`}
        title={`Welcome back, ${firstName} 👋`}
        sub={
          stats
            ? `You're on a ${stats.streak_days}-day streak. Keep going.`
            : "Let's get your WASSCE prep underway."
        }
      />

      <Countdown examName={examName} targetIso={examDate} />

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Widget label="Continue Studying">
            {subjects.length ? (
              subjects.map((s) => {
                const slug = SUBJECT_SLUG[s.subject];
                const row = (
                  <ProgressRow
                    label={s.subject}
                    value={s.progress}
                    color={s.color}
                  />
                );
                return slug ? (
                  <Link
                    key={s.subject}
                    href={`/dashboard/student/subjects/${slug}`}
                    className="block transition hover:opacity-80"
                  >
                    {row}
                  </Link>
                ) : (
                  <div key={s.subject}>{row}</div>
                );
              })
            ) : (
              <p className="text-sm text-muted">
                No subjects yet. They&apos;ll appear here once your study data
                is set up.
              </p>
            )}
            <Link
              href="/dashboard/student/subjects"
              className="mt-3 inline-block rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
            >
              Go to Subjects →
            </Link>
          </Widget>

          <Widget label="Upcoming Homework">
            {homework.length ? (
              <div className="space-y-2">
                {homework.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between rounded-[10px] bg-faint px-3.5 py-3"
                  >
                    <div>
                      <div className="text-[13px] font-bold text-ink">
                        {h.title}
                      </div>
                      {h.subject && (
                        <div className="text-xs text-muted">{h.subject}</div>
                      )}
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-brand-lt px-2.5 py-1 text-[11px] font-bold text-brand">
                      {dueLabel(h.due_at)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">🎉 No upcoming homework.</p>
            )}
          </Widget>
        </div>

        <div className="space-y-4">
          <Widget label="This Week">
            <div className="flex flex-col gap-2">
              <Stat n={String(stats?.lessons_done ?? 0)} l="Lessons done" />
              <Stat
                n={formatStudyTime(stats?.study_minutes ?? 0)}
                l="Study time"
              />
              <Stat n={`${stats?.quiz_average ?? 0}%`} l="Avg quiz score" />
            </div>
          </Widget>

          <Widget label="Quick Actions">
            <div className="flex flex-col gap-2 text-sm font-bold">
              <Link
                href="/dashboard/student/subjects"
                className="rounded-lg border-2 border-brand py-2.5 text-center text-brand transition hover:bg-brand-lt"
              >
                📚 Subjects
              </Link>
              <Link
                href="/dashboard/student/past-questions"
                className="rounded-lg border-2 border-brand py-2.5 text-center text-brand transition hover:bg-brand-lt"
              >
                📋 Past Questions
              </Link>
              <Link
                href="/dashboard/student/resources"
                className="rounded-lg border-2 border-brand py-2.5 text-center text-brand transition hover:bg-brand-lt"
              >
                📚 Resource Library
              </Link>
              <Link
                href="/dashboard/student/health"
                className="rounded-lg bg-success-lt py-2.5 text-center text-success transition hover:brightness-95"
              >
                💚 Health & Wellness
              </Link>
              <Link
                href="/dashboard/student/career"
                className="rounded-lg bg-gold-lt py-2.5 text-center text-gold transition hover:brightness-95"
              >
                🎓 Career Guidance
              </Link>
              <Link
                href="/dashboard/student/progress"
                className="rounded-lg border-2 border-line py-2.5 text-center text-muted transition hover:border-brand hover:text-brand"
              >
                📊 My Progress
              </Link>
            </div>
          </Widget>
        </div>
      </div>
    </DashboardShell>
  );
}
