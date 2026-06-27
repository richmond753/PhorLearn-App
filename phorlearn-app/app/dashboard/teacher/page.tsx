import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  DashboardShell,
  PageHead,
  Widget,
  Stat,
} from "@/components/DashboardShell";
import SetAssignmentForm from "./SetAssignmentForm";

export const dynamic = "force-dynamic";

interface StudentRow {
  id: string;
  full_name: string;
  score: number;
}
interface AssignmentRow {
  id: string;
  title: string;
  subject: string | null;
  due_at: string;
}
interface LessonRow {
  id: string;
  title: string;
  subject: string | null;
  content: string | null;
  created_at: string;
}

function scoreColor(score: number): string {
  if (score >= 75) return "#16A34A";
  if (score >= 60) return "#1B4FD8";
  if (score >= 50) return "#D4A017";
  return "#DC2626";
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function dueLabel(iso: string): string {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export default async function TeacherDashboard() {
  const profile = await requireProfile("teacher");
  const supabase = await createClient();

  // RLS guarantees a teacher only ever sees their own class.
  const { data: classes } = await supabase
    .from("classes")
    .select("id, name, subject")
    .order("created_at", { ascending: true })
    .limit(1);

  const klass = classes?.[0] ?? null;

  let students: StudentRow[] = [];
  let assignments: AssignmentRow[] = [];
  let lessons: LessonRow[] = [];

  if (klass) {
    const [studentsRes, assignmentsRes, lessonsRes] = await Promise.all([
      supabase
        .from("class_students")
        .select("id, full_name, score")
        .eq("class_id", klass.id)
        .order("score", { ascending: false }),
      supabase
        .from("assignments")
        .select("id, title, subject, due_at")
        .eq("class_id", klass.id)
        .order("due_at", { ascending: true }),
      supabase
        .from("teacher_lessons")
        .select("id, title, subject, content, created_at")
        .eq("class_id", klass.id)
        .order("created_at", { ascending: false }),
    ]);
    students = (studentsRes.data ?? []) as StudentRow[];
    assignments = (assignmentsRes.data ?? []) as AssignmentRow[];
    lessons = (lessonsRes.data ?? []) as LessonRow[];
  }

  const classAverage = students.length
    ? Math.round(students.reduce((a, s) => a + s.score, 0) / students.length)
    : 0;

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Teacher Dashboard"
        title="Class Overview 🖊️"
        sub={
          klass
            ? `${klass.name} · ${students.length} students`
            : "No class assigned yet."
        }
      />

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <Widget label="Student Performance">
          {students.length ? (
            <div className="space-y-2">
              {students.map((s) => {
                const c = scoreColor(s.score);
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3.5 rounded-[10px] bg-faint px-3.5 py-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lt text-xs font-bold text-brand">
                      {initials(s.full_name)}
                    </span>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold">{s.full_name}</div>
                      <div className="mt-1 h-[7px] overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.score}%`, background: c }}
                        />
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{ background: `${c}1a`, color: c }}
                    >
                      {s.score}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted">No students in this class yet.</p>
          )}
        </Widget>

        <div className="space-y-4">
          <Widget label="Class Stats">
            <div className="flex flex-col gap-2">
              <Stat n={String(students.length)} l="Students" />
              <Stat n={`${classAverage}%`} l="Class Avg" />
              <Stat n={String(assignments.length)} l="Assignments" />
            </div>
          </Widget>
          <Widget label="Quick Actions">
            <SetAssignmentForm defaultSubject={klass?.subject ?? null} />
          </Widget>
        </div>
      </div>

      <Widget label="Assignments" className="mt-4">
        {assignments.length ? (
          <div className="space-y-2">
            {assignments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-[10px] bg-faint px-3.5 py-3"
              >
                <div>
                  <div className="text-[13px] font-bold text-ink">{a.title}</div>
                  {a.subject && (
                    <div className="text-xs text-muted">{a.subject}</div>
                  )}
                </div>
                <span className="whitespace-nowrap rounded-full bg-gold-lt px-2.5 py-1 text-[11px] font-bold text-gold">
                  {dueLabel(a.due_at)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No assignments set yet.</p>
        )}
      </Widget>

      <Widget label="Lesson Materials" className="mt-4">
        {lessons.length ? (
          <div className="space-y-2">
            {lessons.map((l) => (
              <div key={l.id} className="rounded-[10px] bg-faint px-3.5 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-bold text-ink">
                    {l.title}
                  </div>
                  {l.subject && (
                    <span className="whitespace-nowrap rounded-full bg-brand-lt px-2.5 py-1 text-[11px] font-bold text-brand">
                      {l.subject}
                    </span>
                  )}
                </div>
                {l.content && (
                  <p className="mt-1 whitespace-pre-wrap text-xs text-muted">
                    {l.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No materials uploaded yet. Use “Upload Lesson” to add one.
          </p>
        )}
      </Widget>
    </DashboardShell>
  );
}
