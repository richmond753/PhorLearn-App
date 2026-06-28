import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  DashboardShell,
  PageHead,
  Widget,
  ProgressRow,
  Stat,
} from "@/components/DashboardShell";
import ParentReportButton from "./ParentReportButton";

export const dynamic = "force-dynamic";

const FOCUS_THRESHOLD = 65;

interface WardRow {
  id: string;
  full_name: string;
  shs_class: string | null;
  programme: string | null;
  study_minutes: number;
  lessons_done: number;
  streak_days: number;
}
interface WardSubjectRow {
  subject: string;
  score: number;
  color: string;
}

function formatStudyTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

export default async function ParentDashboard() {
  const profile = await requireProfile("parent");
  const supabase = await createClient();

  // RLS guarantees a parent only sees wards linked to them via parent_id.
  const { data: wards } = await supabase
    .from("wards")
    .select("id, full_name, shs_class, programme, study_minutes, lessons_done, streak_days")
    .order("created_at", { ascending: true })
    .limit(1);

  const ward = (wards?.[0] ?? null) as WardRow | null;

  let subjects: WardSubjectRow[] = [];
  if (ward) {
    const { data } = await supabase
      .from("ward_subjects")
      .select("subject, score, color")
      .eq("ward_id", ward.id)
      .order("sort_order", { ascending: true });
    subjects = (data ?? []) as WardSubjectRow[];
  }

  const focusAreas = subjects.filter((s) => s.score < FOCUS_THRESHOLD);
  const classLabel = ward?.shs_class
    ? ward.shs_class.replace("SHS", "SHS ")
    : "SHS";

  // Build a pre-filled report email (mailto) from the ward's data.
  const reportBody = ward
    ? encodeURIComponent(
        `PhorLearn Progress Report — ${ward.full_name} (${classLabel} ${ward.programme ?? ""})\n\n` +
          `Study time this week: ${formatStudyTime(ward.study_minutes)}\n` +
          `Lessons completed: ${ward.lessons_done}\n` +
          `Current streak: ${ward.streak_days} days\n\n` +
          `Subject performance:\n` +
          subjects.map((s) => `  • ${s.subject}: ${s.score}%`).join("\n") +
          (focusAreas.length
            ? `\n\nNeeds attention: ${focusAreas.map((s) => s.subject).join(", ")}`
            : "")
      )
    : "";
  const mailto = ward
    ? `mailto:?subject=${encodeURIComponent(
        `Progress Report — ${ward.full_name}`
      )}&body=${reportBody}`
    : "#";

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Parent Dashboard"
        title="Ward Overview 👨‍👩‍👦"
        sub={
          ward
            ? `Monitoring: ${ward.full_name} · ${classLabel} ${ward.programme ?? ""}`
            : "No ward linked to your account yet."
        }
      />

      {ward ? (
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Widget label={`${ward.full_name}'s Performance`}>
              {subjects.length ? (
                subjects.map((s) => (
                  <ProgressRow
                    key={s.subject}
                    label={s.subject}
                    value={s.score}
                    color={s.color}
                  />
                ))
              ) : (
                <p className="text-sm text-muted">No subject data yet.</p>
              )}
            </Widget>

            {focusAreas.length > 0 && (
              <Widget label="⚠️ Focus Areas">
                <div className="space-y-2">
                  {focusAreas.map((s) => (
                    <div
                      key={s.subject}
                      className="rounded-[10px] bg-gold-lt px-3.5 py-3 text-[13px] font-semibold text-gold"
                    >
                      {s.subject} is at {s.score}% — below {FOCUS_THRESHOLD}%.
                      Encourage more practice sessions.
                    </div>
                  ))}
                </div>
              </Widget>
            )}
          </div>

          <div className="space-y-4">
            <Widget label="Weekly Activity">
              <div className="flex flex-col gap-2">
                <Stat n={formatStudyTime(ward.study_minutes)} l="Study time" />
                <Stat n={String(ward.lessons_done)} l="Lessons done" />
                <Stat n={`${ward.streak_days}🔥`} l="Day streak" />
              </div>
            </Widget>
            <Widget label="Actions">
              <div className="flex flex-col gap-2 text-sm font-bold">
                <a
                  href={mailto}
                  className="rounded-lg bg-brand py-2.5 text-center text-white transition hover:bg-[#1340B8]"
                >
                  <span aria-hidden="true">📧 </span>Email Report
                </a>
                <ParentReportButton
                  ward={{
                    full_name: ward.full_name,
                    classLabel,
                    programme: ward.programme,
                    study_label: formatStudyTime(ward.study_minutes),
                    lessons_done: ward.lessons_done,
                    streak_days: ward.streak_days,
                  }}
                  subjects={subjects.map((s) => ({
                    subject: s.subject,
                    score: s.score,
                  }))}
                  focusAreas={focusAreas.map((s) => ({
                    subject: s.subject,
                    score: s.score,
                  }))}
                />
              </div>
            </Widget>
          </div>
        </div>
      ) : (
        <Widget>
          <p className="text-sm text-muted">
            Once a student links you as their parent/guardian (via{" "}
            <code>parent_id</code>), their performance will appear here.
          </p>
        </Widget>
      )}
    </DashboardShell>
  );
}
