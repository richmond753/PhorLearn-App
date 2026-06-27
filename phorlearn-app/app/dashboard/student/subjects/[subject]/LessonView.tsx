"use client";

import { useState } from "react";
import Link from "next/link";
import type { LessonSubject } from "@/lib/lessons";
import { StudyHelper } from "@/components/StudyHelper";
import { getSubjectResources, RESOURCE_TYPE_META } from "@/lib/resources";

export function LessonView({
  subject,
  quizHref,
}: {
  subject: LessonSubject;
  quizHref: string | null;
}) {
  const [activeId, setActiveId] = useState(subject.topics[0]?.id);
  const topic =
    subject.topics.find((t) => t.id === activeId) ?? subject.topics[0];

  function downloadNotes() {
    const lines = [
      `${subject.name} — ${topic.title}`,
      "PhorLearn SHS · WASSCE Notes",
      "".padEnd(40, "="),
      "",
      ...topic.notes,
    ];
    if (topic.example) {
      lines.push(
        "",
        "Worked Example:",
        topic.example.prompt,
        ...topic.example.solution.map((s) => "  " + s)
      );
    }
    const blob = new Blob([lines.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject.slug}-${topic.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const videoHref = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `WASSCE ${subject.name} ${topic.title}`
  )}`;

  const resources = getSubjectResources(subject.slug);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      {/* Left: lesson area */}
      <div>
        {/* Hero */}
        <div
          className="mb-4 rounded-xl p-6 text-white"
          style={{
            background: `linear-gradient(135deg, #0D0F1A 0%, ${subject.color} 140%)`,
          }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-white/60">
            {subject.icon} {subject.name} · WASSCE Syllabus
          </div>
          <h1 className="mt-1.5 text-2xl font-extrabold">{topic.title}</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-[190px_1fr]">
          {/* Topic sidebar */}
          <aside className="rounded-xl bg-white p-3 shadow-card">
            <div className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
              Topics
            </div>
            <nav className="flex flex-col gap-1">
              {subject.topics.map((t, i) => {
                const on = t.id === topic.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={`rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition ${
                      on
                        ? "text-white"
                        : "text-ink2 hover:bg-faint"
                    }`}
                    style={on ? { background: subject.color } : undefined}
                  >
                    {i + 1}. {t.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 shadow-card">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
                Notes
              </div>
              <div className="space-y-3 text-[14px] leading-relaxed text-ink2">
                {topic.notes.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
              </div>

              {topic.example && (
                <div className="mt-4 rounded-[10px] border border-line bg-faint p-4">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-brand">
                    Worked Example
                  </div>
                  <p className="text-[14px] font-semibold text-ink">
                    {topic.example.prompt}
                  </p>
                  <div className="mt-2 space-y-1 text-[14px] leading-relaxed text-ink2">
                    {topic.example.solution.map((s, i) => (
                      <p key={i}>{s}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div className="rounded-xl bg-white p-5 shadow-card">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
                Resources
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-brand px-4 py-2.5 text-sm font-bold text-brand transition hover:bg-brand-lt"
                >
                  📹 Watch Video
                </a>
                <button
                  onClick={downloadNotes}
                  className="rounded-lg border-2 border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
                >
                  📄 Download Notes
                </button>
                {quizHref ? (
                  <Link
                    href={quizHref}
                    className="rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#B8860B]"
                  >
                    ✍️ Practice Quiz
                  </Link>
                ) : (
                  <span className="rounded-lg bg-faint px-4 py-2.5 text-sm font-bold text-muted">
                    ✍️ Practice Quiz (soon)
                  </span>
                )}
              </div>
            </div>

            {/* Curriculum-aligned study resources (real WASSCE / NaCCA links) */}
            {resources.length > 0 && (
              <div className="rounded-xl bg-white p-5 shadow-card">
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
                    Study Resources
                  </div>
                  <Link
                    href="/dashboard/student/resources"
                    className="text-[11px] font-bold text-brand transition hover:underline"
                  >
                    Resource Library →
                  </Link>
                </div>
                <p className="mb-3 text-[11px] text-muted">
                  Official NaCCA curriculum, WASSCE past questions and video lessons.
                </p>
                <div className="space-y-2">
                  {resources.map((r) => {
                    const meta = RESOURCE_TYPE_META[r.type];
                    return (
                      <a
                        key={r.url + r.title}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-[10px] border border-line p-3 transition hover:border-brand hover:bg-faint"
                      >
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base"
                          style={{ background: `${meta.color}14` }}
                        >
                          {meta.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-bold text-ink">
                            {r.title}
                          </span>
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
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: AI Study Helper side panel */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <StudyHelper subject={subject.name} topic={topic.title} />
      </div>
    </div>
  );
}
