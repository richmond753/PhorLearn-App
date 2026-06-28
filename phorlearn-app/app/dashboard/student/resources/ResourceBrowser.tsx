"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  RESOURCE_TYPE_META,
  type ResourceType,
  type StudyResource,
} from "@/lib/resources";
import { Widget } from "@/components/DashboardShell";

export interface SubjectGroup {
  slug: string;
  name: string;
  icon: string;
  resources: StudyResource[];
}

const TYPE_FILTERS: { id: ResourceType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "curriculum", label: "📘 Curriculum" },
  { id: "pastq", label: "📝 Past Questions" },
  { id: "textbook", label: "📚 Textbooks" },
  { id: "video", label: "📹 Videos" },
  { id: "platform", label: "🧭 Platforms" },
];

function ResourceCard({ r }: { r: StudyResource }) {
  const meta = RESOURCE_TYPE_META[r.type];
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 rounded-[10px] border border-line bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-card"
    >
      <span
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
        style={{ background: `${meta.color}14` }}
      >
        {meta.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold text-ink">{r.title}</span>
        <span className="block text-[12px] leading-snug text-muted">
          {r.description}
        </span>
        <span
          className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wide"
          style={{ color: meta.color }}
        >
          {meta.label} · {r.provider}
        </span>
      </span>
      <span className="mt-1 text-muted">↗</span>
    </a>
  );
}

export default function ResourceBrowser({
  general,
  groups,
}: {
  general: StudyResource[];
  groups: SubjectGroup[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ResourceType | "all">("all");

  const q = query.trim().toLowerCase();

  function keep(r: StudyResource, subjectName?: string) {
    if (type !== "all" && r.type !== type) return false;
    if (!q) return true;
    const hay = `${r.title} ${r.provider} ${r.description} ${
      subjectName ?? ""
    }`.toLowerCase();
    return hay.includes(q);
  }

  const filteredGeneral = useMemo(
    () => general.filter((r) => keep(r)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [general, q, type]
  );

  const filteredGroups = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          resources: g.resources.filter((r) => keep(r, g.name)),
        }))
        .filter((g) => g.resources.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, q, type]
  );

  const totalShown =
    filteredGeneral.length +
    filteredGroups.reduce((a, g) => a + g.resources.length, 0);

  return (
    <div>
      {/* Search + filters */}
      <Widget className="mb-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              🔍
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources by title, subject or provider…"
              className="w-full rounded-[10px] border-2 border-line py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((f) => {
              const on = f.id === type;
              return (
                <button
                  key={f.id}
                  onClick={() => setType(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
                    on
                      ? "bg-ink text-white"
                      : "bg-faint text-ink2 hover:bg-line"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </Widget>

      {totalShown === 0 ? (
        <Widget>
          <p className="py-6 text-center text-sm text-muted">
            No resources match “{query}”. Try a different word or clear the
            filter.
          </p>
        </Widget>
      ) : (
        <>
          {filteredGeneral.length > 0 && (
            <Widget label="Official & General" className="mb-4">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGeneral.map((r) => (
                  <ResourceCard key={r.url + r.title} r={r} />
                ))}
              </div>
            </Widget>
          )}

          {filteredGroups.map((g) => (
            <Widget key={g.slug} label={`${g.icon} ${g.name}`} className="mb-4">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {g.resources.map((r) => (
                  <ResourceCard key={r.url + r.title} r={r} />
                ))}
              </div>
              <div className="mt-3">
                <Link
                  href={`/dashboard/student/subjects/${g.slug}`}
                  className="text-[12px] font-bold text-brand transition hover:underline"
                >
                  Open {g.name} lessons →
                </Link>
              </div>
            </Widget>
          ))}
        </>
      )}
    </div>
  );
}
