import Link from "next/link";
import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getSubject, getPaper } from "@/lib/pastQuestions";
import { DashboardShell } from "@/components/DashboardShell";
import { QuizRunner } from "./QuizRunner";

export const dynamic = "force-dynamic";

export default async function PaperPage({
  params,
}: {
  params: Promise<{ subject: string; year: string }>;
}) {
  const profile = await requireProfile("student");
  const { subject: slug, year: yearStr } = await params;
  const year = Number(yearStr);

  const subject = getSubject(slug);
  const paper = getPaper(slug, year);
  if (!subject || !paper) {
    notFound();
  }

  return (
    <DashboardShell profile={profile}>
      <div className="mb-4">
        <Link
          href={`/dashboard/student/past-questions?subject=${subject.slug}`}
          className="text-[13px] font-bold text-muted transition hover:text-brand"
        >
          ← Back to {subject.name} papers
        </Link>
      </div>

      <QuizRunner
        subjectSlug={subject.slug}
        subjectName={subject.name}
        year={paper.year}
        color={subject.color}
        official={Boolean(paper.official)}
        source={paper.source}
        questions={paper.questions}
      />
    </DashboardShell>
  );
}
