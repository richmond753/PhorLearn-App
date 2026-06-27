import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getLessonSubject } from "@/lib/lessons";
import { getSubject as getQuizSubject } from "@/lib/pastQuestions";
import { DashboardShell } from "@/components/DashboardShell";
import { LessonView } from "./LessonView";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const profile = await requireProfile("student");
  const { subject: slug } = await params;

  const subject = getLessonSubject(slug);
  if (!subject) {
    notFound();
  }

  // Deep-link "Practice Quiz" to past questions when a paper set exists.
  const quizHref = getQuizSubject(slug)
    ? `/dashboard/student/past-questions?subject=${slug}`
    : null;

  return (
    <DashboardShell profile={profile}>
      <div className="mb-4">
        <Link
          href="/dashboard/student/subjects"
          className="text-[13px] font-bold text-muted transition hover:text-brand"
        >
          ← Back to Subjects
        </Link>
      </div>
      <LessonView subject={subject} quizHref={quizHref} />
    </DashboardShell>
  );
}
