import { requireProfile } from "@/lib/auth";
import { CAREERS, RESOURCE_LIBRARY } from "@/lib/careers";
import { DashboardShell, PageHead, Widget } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function CareerGuidancePage() {
  const profile = await requireProfile("student");
  const programme = profile.programme ?? "General Science";

  return (
    <DashboardShell profile={profile}>
      <PageHead
        eyebrow="Career Guidance"
        title="Explore Your Future"
        sub={`Based on your ${programme} programme. Discover programmes, universities and the grades you'll need.`}
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {CAREERS.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border-2 border-transparent bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <div className="mb-2 text-3xl">{c.icon}</div>
            <div className="text-[15px] font-bold text-ink">{c.title}</div>
            <p className="mt-1 text-[12px] leading-snug text-muted">{c.blurb}</p>

            <div className="mt-3 space-y-2 border-t border-line pt-3 text-[12px]">
              <div>
                <span className="font-bold text-ink2">Required subjects</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {c.requiredSubjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-brand-lt px-2 py-0.5 text-[11px] font-semibold text-brand"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-ink2">Universities</span>
                <p className="mt-0.5 text-muted">{c.universities.join(" · ")}</p>
              </div>
              <div>
                <span className="font-bold text-ink2">WASSCE grades</span>
                <p className="mt-0.5 text-muted">{c.grades}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Widget label="Resource Library" className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCE_LIBRARY.map((r) => (
            <button
              key={r.label}
              className="rounded-[10px] border-2 border-line bg-white p-4 text-left transition hover:border-brand hover:bg-brand-lt"
            >
              <div className="text-2xl">{r.icon}</div>
              <div className="mt-1.5 text-[13px] font-bold text-ink">
                {r.label}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-muted">
                {r.description}
              </div>
            </button>
          ))}
        </div>
      </Widget>

    </DashboardShell>
  );
}
