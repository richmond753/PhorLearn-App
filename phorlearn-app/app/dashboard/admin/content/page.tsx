import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { LESSON_SUBJECTS } from "@/lib/lessons";
import { GENERAL_RESOURCES, getSubjectResources } from "@/lib/resources";
import { DashboardShell, PageHead, Widget, Stat } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function ContentReviewPage() {
  const profile = await requireProfile("admin");

  const rows = LESSON_SUBJECTS.map((s) => {
    const res = getSubjectResources(s.slug);
    return {
      slug: s.slug,
      name: s.name,
      icon: s.icon,
      category: s.category,
      topics: s.topics.length,
      resources: res.length,
    };
  });

  const totalTopics = rows.reduce((a, r) => a + r.topics, 0);
  const totalSubjectResources = rows.reduce((a, r) => a + r.resources, 0);
  const totalResources = totalSubjectResources + GENERAL_RESOURCES.length;

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Admin · Content"
        title="Content Review 📋"
        sub="Review the lessons and study resources published across the platform."
      />

      <div className="mb-4">
        <Link
          href="/dashboard/admin"
          className="text-[13px] font-bold text-brand transition hover:underline"
        >
          ← Back to Admin Overview
        </Link>
      </div>

      <div className="mb-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-card">
          <Stat n={String(LESSON_SUBJECTS.length)} l="Subjects" />
        </div>
        <div className="rounded-xl bg-white p-5 shadow-card">
          <Stat n={String(totalTopics)} l="Lesson topics" />
        </div>
        <div className="rounded-xl bg-white p-5 shadow-card">
          <Stat n={String(totalResources)} l="Study resources" />
        </div>
        <div className="rounded-xl bg-white p-5 shadow-card">
          <Stat n={String(GENERAL_RESOURCES.length)} l="General resources" />
        </div>
      </div>

      <Widget label="Subjects & Published Content">
        <div className="overflow-x-auto rounded-[10px] border border-line">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-faint text-left text-muted">
                <th className="px-3.5 py-2 font-bold">Subject</th>
                <th className="px-3.5 py-2 font-bold">Category</th>
                <th className="px-3.5 py-2 text-right font-bold">Topics</th>
                <th className="px-3.5 py-2 text-right font-bold">Resources</th>
                <th className="px-3.5 py-2 font-bold">Review</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} className="border-t border-line">
                  <td className="px-3.5 py-2.5 font-semibold text-ink">
                    <span aria-hidden="true">{r.icon} </span>
                    {r.name}
                  </td>
                  <td className="px-3.5 py-2.5 capitalize text-muted">
                    {r.category}
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-bold text-ink2">
                    {r.topics}
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-bold text-ink2">
                    {r.resources}
                  </td>
                  <td className="px-3.5 py-2.5">
                    <Link
                      href={`/dashboard/student/subjects/${r.slug}`}
                      className="text-[12px] font-bold text-brand transition hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
    </DashboardShell>
  );
}
