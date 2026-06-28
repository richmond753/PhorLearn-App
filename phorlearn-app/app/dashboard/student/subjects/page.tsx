import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import {
  LESSON_SUBJECTS,
  electivesForProgramme,
  type LessonSubject,
} from "@/lib/lessons";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

function SubjectCard({ s }: { s: LessonSubject }) {
  return (
    <Link
      href={`/dashboard/student/subjects/${s.slug}`}
      className="group rounded-xl border-2 border-transparent bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderColor: "transparent" }}
    >
      <div
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] text-2xl"
        style={{ background: `${s.color}14` }}
      >
        {s.icon}
      </div>
      <div className="text-[15px] font-bold text-ink">{s.name}</div>
      <div className="mt-1 text-[13px] leading-snug text-muted">{s.blurb}</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted">{s.topics.length} topics</span>
        <span
          className="text-[13px] font-bold transition group-hover:translate-x-0.5"
          style={{ color: s.color }}
        >
          Open →
        </span>
      </div>
    </Link>
  );
}

export default async function SubjectHubPage() {
  const profile = await requireProfile("student");
  const programme = profile.programme ?? "General Science";
  const classLabel = profile.shs_class
    ? profile.shs_class.replace("SHS", "SHS ")
    : "SHS";

  const core = LESSON_SUBJECTS.filter((s) => s.category === "core");
  const elective = electivesForProgramme(programme);

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Subject Hub"
        title="Your Subjects"
        sub={`${programme} programme · ${classLabel}. Tap a subject to open its lessons.`}
      />

      <div className="mb-4 flex flex-wrap gap-2.5">
        <Link
          href="/dashboard/student/resources"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
        >
          📚 Open Resource Library
        </Link>
        <Link
          href="/dashboard/student/health"
          className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        >
          💚 Health & Wellness
        </Link>
      </div>

      {/* Featured Health & Wellness banner */}
      <Link
        href="/dashboard/student/health"
        className="mb-4 block overflow-hidden rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#0EA5E9] p-5 text-white shadow-card transition hover:shadow-lg"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">🫀</span>
          <div className="min-w-0">
            <div className="text-lg font-extrabold">Health & Wellness</div>
            <p className="text-[13px] leading-snug text-white/90">
              Explore the human body, exercise, nutrition and mental wellbeing —
              interactive cards, a 7-day move plan and a myth-buster game.
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 text-sm font-bold sm:block">
            Explore →
          </span>
        </div>
      </Link>

      <Widget label="Core Subjects" className="mb-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((s) => (
            <SubjectCard key={s.slug} s={s} />
          ))}
        </div>
      </Widget>

      <Widget label={`Elective Subjects — ${programme}`}>
        {elective.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {elective.map((s) => (
              <SubjectCard key={s.slug} s={s} />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted">
            Elective lessons for the {programme} programme are being added. Your
            core subjects above apply to every programme — keep studying those in
            the meantime.
          </p>
        )}
      </Widget>

    </DashboardShell>
  );
}
