import { requireProfile } from "@/lib/auth";
import { LESSON_SUBJECTS } from "@/lib/lessons";
import { GENERAL_RESOURCES, getSubjectResources } from "@/lib/resources";
import { DashboardShell, PageHead } from "@/components/DashboardShell";
import ResourceBrowser, { type SubjectGroup } from "./ResourceBrowser";

export const dynamic = "force-dynamic";

export default async function ResourceLibraryPage() {
  const profile = await requireProfile("student");

  const groups: SubjectGroup[] = LESSON_SUBJECTS.map((s) => ({
    slug: s.slug,
    name: s.name,
    icon: s.icon,
    resources: getSubjectResources(s.slug),
  })).filter((g) => g.resources.length > 0);

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Resource Library"
        title="WASSCE Study Resources 📚"
        sub="Official NaCCA curriculum, WAEC past questions, teacher manuals and video lessons — curated per subject. Search or filter to find exactly what you need."
      />

      <ResourceBrowser general={GENERAL_RESOURCES} groups={groups} />

      <div className="mt-6 rounded-xl border border-line bg-faint p-4 text-[12px] leading-relaxed text-muted">
        Resources link to external sites (NaCCA / Ministry of Education, WAEC and
        independent past-question libraries). Always cross-check against the
        current WAEC syllabus for your exam year.
      </div>
    </DashboardShell>
  );
}
