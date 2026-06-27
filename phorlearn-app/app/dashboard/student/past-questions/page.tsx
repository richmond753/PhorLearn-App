import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SUBJECTS, getSubject } from "@/lib/pastQuestions";
import { getSubjectResources, RESOURCE_TYPE_META } from "@/lib/resources";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

interface AttemptRow {
  subject_slug: string;
  year: number;
  percentage: number;
  created_at: string;
}

export default async function PastQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const profile = await requireProfile("student");
  const { subject: subjectParam } = await searchParams;

  const active = getSubject(subjectParam ?? "") ?? SUBJECTS[0];

  // Official downloads (curriculum + real past-paper libraries) for this subject.
  const downloads = getSubjectResources(active.slug).filter(
    (r) => r.type === "curriculum" || r.type === "pastq" || r.type === "textbook"
  );

  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select("subject_slug, year, percentage, created_at")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  const attempts = (data ?? []) as AttemptRow[];

  // Per paper → best % and most recent %.
  const byPaper = new Map<string, { best: number; last: number }>();
  for (const a of attempts) {
    const key = `${a.subject_slug}:${a.year}`;
    const cur = byPaper.get(key);
    if (!cur) {
      byPaper.set(key, { best: a.percentage, last: a.percentage });
    } else {
      cur.best = Math.max(cur.best, a.percentage);
    }
  }

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="WASSCE Past Questions"
        title="Practice Real Papers"
        sub="Pick a subject, choose a year, and sit a timed paper. Get instant feedback, explanations and a full review."
      />

      {/* Subject selector */}
      <Widget label="Select Subject" className="mb-4">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => {
            const on = s.slug === active.slug;
            return (
              <Link
                key={s.slug}
                href={`/dashboard/student/past-questions?subject=${s.slug}`}
                scroll={false}
                className="rounded-[10px] border-2 px-4 py-2.5 text-sm font-bold transition"
                style={
                  on
                    ? { borderColor: s.color, background: `${s.color}14`, color: s.color }
                    : { borderColor: "#E4E6EF", color: "#2D3150" }
                }
              >
                {s.icon} {s.name}
              </Link>
            );
          })}
        </div>
      </Widget>

      {/* Official downloads for the active subject */}
      {downloads.length > 0 && (
        <Widget
          label={`${active.name} — Official Downloads & Real Past Papers`}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            {downloads.map((r) => {
              const meta = RESOURCE_TYPE_META[r.type];
              return (
                <a
                  key={r.url + r.title}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${r.title} · ${r.provider}`}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-line px-3.5 py-2 text-[13px] font-bold text-ink2 transition hover:border-brand hover:text-brand"
                >
                  <span>{meta.icon}</span>
                  <span>{r.title}</span>
                  <span className="text-muted">↗</span>
                </a>
              );
            })}
          </div>
          <p className="mt-2.5 text-[11px] text-muted">
            Practice the interactive papers below, then grab full PDFs and the
            official NaCCA syllabus for deeper revision.
          </p>
        </Widget>
      )}

      {/* Papers for the active subject */}
      <Widget label={`${active.name} — Available Papers`}>
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="rounded-full bg-success-lt px-2 py-0.5 text-[10px] font-bold text-success">
              Official paper
            </span>
            = the verbatim WAEC paper
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-full bg-brand-lt px-2 py-0.5 text-[10px] font-bold text-brand">
              Exam-style
            </span>
            = practice questions in the WASSCE format
          </span>
        </div>
        <div className="space-y-2.5">
          {[...active.papers]
            .sort((a, b) => b.year - a.year)
            .map((p) => {
              const stats = byPaper.get(`${active.slug}:${p.year}`);
              return (
                <Link
                  key={p.year}
                  href={`/dashboard/student/past-questions/${active.slug}/${p.year}`}
                  className="flex items-center justify-between rounded-[10px] border-2 border-line bg-white px-4 py-3.5 transition hover:border-brand"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-ink">
                        WASSCE {p.year}
                      </span>
                      {p.official ? (
                        <span className="rounded-full bg-success-lt px-2 py-0.5 text-[10px] font-bold text-success">
                          Official paper
                        </span>
                      ) : (
                        <span className="rounded-full bg-brand-lt px-2 py-0.5 text-[10px] font-bold text-brand">
                          Exam-style
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted">
                      {p.questions.length} questions · Objective (Paper 1)
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {stats ? (
                      <span className="hidden rounded-full bg-faint px-2.5 py-1 text-[11px] font-bold text-ink2 sm:inline">
                        Best {stats.best}%
                      </span>
                    ) : (
                      <span className="hidden rounded-full bg-faint px-2.5 py-1 text-[11px] font-bold text-muted sm:inline">
                        Not started
                      </span>
                    )}
                    <span className="text-sm font-bold text-brand">
                      {stats ? "Retry →" : "Start →"}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </Widget>

      {/* Recent attempts */}
      {attempts.length > 0 && (
        <Widget label="Your Recent Attempts" className="mt-4">
          <div className="space-y-1.5">
            {attempts.slice(0, 6).map((a, i) => {
              const subj = getSubject(a.subject_slug);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-[10px] bg-faint px-3.5 py-2.5 text-[13px]"
                >
                  <span className="font-semibold text-ink2">
                    {subj?.icon} {subj?.name ?? a.subject_slug} · WASSCE {a.year}
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      color:
                        a.percentage >= 70
                          ? "#16A34A"
                          : a.percentage >= 50
                            ? "#D4A017"
                            : "#DC2626",
                    }}
                  >
                    {a.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </Widget>
      )}

    </DashboardShell>
  );
}
