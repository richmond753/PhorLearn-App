"use client";

import { useState } from "react";
import {
  BODY_SYSTEMS,
  EXERCISE_GROUPS,
  WEEKLY_PLAN,
  FOOD_GROUPS,
  NUTRITION_TIPS,
  WELLBEING,
  MYTH_BUSTERS,
} from "@/lib/health";

type Tab = "body" | "move" | "eat" | "mind" | "myth";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "body", label: "Body Systems", emoji: "🫀" },
  { id: "move", label: "Move & Exercise", emoji: "🏃" },
  { id: "eat", label: "Eat Well", emoji: "🥗" },
  { id: "mind", label: "Mind & Sleep", emoji: "🧠" },
  { id: "myth", label: "Myth Buster", emoji: "❓" },
];

export default function HealthExplorer() {
  const [tab, setTab] = useState<Tab>("body");

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Health topics"
        className="sticky top-14 z-30 -mx-1 mb-5 flex gap-2 overflow-x-auto bg-faint/0 px-1 py-1"
      >
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                on
                  ? "bg-ink text-white shadow-card"
                  : "bg-white text-ink2 shadow-card hover:bg-faint"
              }`}
            >
              <span aria-hidden="true">{t.emoji}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "body" && <BodySystemsTab />}
      {tab === "move" && <MoveTab />}
      {tab === "eat" && <EatTab />}
      {tab === "mind" && <MindTab />}
      {tab === "myth" && <MythTab />}
    </div>
  );
}

/* ───────────────────────── BODY SYSTEMS ───────────────────────── */

function BodySystemsTab() {
  const [open, setOpen] = useState<string | null>(BODY_SYSTEMS[0].id);

  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Tap a system to explore what it does, a mind-blowing fact, and how to
        keep it healthy.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BODY_SYSTEMS.map((s) => {
          const isOpen = open === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setOpen(isOpen ? null : s.id)}
              aria-expanded={isOpen}
              aria-label={`${s.name}: ${s.tagline}`}
              className={`group flex flex-col rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lg ${
                isOpen ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
              style={isOpen ? { boxShadow: `0 0 0 2px ${s.color}` } : undefined}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${s.color}1A` }}
                >
                  {s.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-extrabold text-ink">
                    {s.name}
                  </span>
                  <span
                    className="block text-[12px] font-bold"
                    style={{ color: s.color }}
                  >
                    {s.tagline}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-muted transition group-hover:text-ink"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              {isOpen && (
                <div className="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-2">
                  <div>
                    <p className="text-[13px] leading-relaxed text-ink2">
                      {s.job}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.parts.map((p) => (
                        <span
                          key={p}
                          className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{ background: `${s.color}14`, color: s.color }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <div
                      className="mt-3 rounded-xl p-3 text-[12px] font-semibold leading-relaxed"
                      style={{ background: `${s.color}10`, color: "#2D3150" }}
                    >
                      💡 {s.wow}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                      Keep it healthy
                    </div>
                    <ul className="space-y-1.5">
                      {s.care.map((c) => (
                        <li
                          key={c}
                          className="flex gap-2 text-[13px] leading-snug text-ink2"
                        >
                          <span style={{ color: s.color }}>✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── MOVE & EXERCISE ───────────────────────── */

function MoveTab() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EA580C] p-5 text-white shadow-card">
        <div className="text-3xl">⏱️</div>
        <div className="mt-1 text-xl font-extrabold">Move 60 minutes a day</div>
        <p className="mt-1 text-sm text-white/90">
          The World Health Organization recommends teens get at least 60 minutes
          of activity daily — it can be sport, dancing, walking or chores. Mix
          cardio, strength and stretching through the week.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {EXERCISE_GROUPS.map((g) => (
          <div key={g.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-center gap-2">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                style={{ background: `${g.color}1A` }}
              >
                {g.emoji}
              </span>
              <span className="text-[15px] font-extrabold text-ink">
                {g.title}
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-snug text-muted">{g.why}</p>
            <div className="mt-3 space-y-1.5">
              {g.moves.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg bg-faint px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-ink2">
                    <span>{m.emoji}</span>
                    {m.name}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: `${g.color}14`, color: g.color }}
                  >
                    {m.dose}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
          Your 7-Day Move Plan
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {WEEKLY_PLAN.map((d) => (
            <div
              key={d.day}
              className="rounded-xl border-2 border-line p-3 text-center transition hover:border-brand"
            >
              <div className="text-xl">{d.emoji}</div>
              <div className="mt-1 text-[13px] font-extrabold text-ink">
                {d.day}
              </div>
              <div className="mt-0.5 text-[11px] leading-tight text-muted">
                {d.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── EAT WELL ───────────────────────── */

function EatTab() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        A balanced plate gives you energy to study and play. Here are the food
        groups — with familiar Ghanaian examples.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FOOD_GROUPS.map((f) => (
          <div
            key={f.id}
            className="overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <div
              className="flex items-center gap-3 p-4"
              style={{ background: `${f.color}12` }}
            >
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-[15px] font-extrabold text-ink">
                {f.name}
              </span>
            </div>
            <div className="p-4">
              <p className="text-[13px] leading-snug text-ink2">{f.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.examples.map((e) => (
                  <span
                    key={e}
                    className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={{ background: `${f.color}14`, color: f.color }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[1.2px] text-muted">
          Smart Eating Habits
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {NUTRITION_TIPS.map((t) => (
            <li
              key={t}
              className="flex gap-2 rounded-lg bg-faint px-3 py-2 text-[13px] text-ink2"
            >
              <span className="text-success">🥗</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────────────────────── MIND & SLEEP ───────────────────────── */

function MindTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {WELLBEING.map((w) => (
        <div key={w.id} className="rounded-2xl bg-white p-4 shadow-card">
          <div className="flex items-center gap-2">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
              style={{ background: `${w.color}1A` }}
            >
              {w.emoji}
            </span>
            <span className="text-[15px] font-extrabold text-ink">
              {w.title}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {w.points.map((p) => (
              <li
                key={p}
                className="flex gap-2 text-[13px] leading-snug text-ink2"
              >
                <span style={{ color: w.color }}>•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── MYTH BUSTER GAME ───────────────────────── */

function MythTab() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter(Boolean).length;

  function answer(i: number, guessIsMyth: boolean) {
    if (answers[i] !== undefined) return;
    const correct = guessIsMyth === MYTH_BUSTERS[i].isMyth;
    setAnswers((a) => ({ ...a, [i]: correct }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-ink p-4 text-white shadow-card">
        <div>
          <div className="text-[15px] font-extrabold">Myth or Fact?</div>
          <p className="text-[12px] text-white/80">
            Tap your answer to reveal the truth.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-gold">
            {score}/{MYTH_BUSTERS.length}
          </div>
          <div className="text-[11px] text-white/70">
            {answered === MYTH_BUSTERS.length ? "Complete!" : "Score"}
          </div>
        </div>
      </div>

      {MYTH_BUSTERS.map((m, i) => {
        const done = answers[i] !== undefined;
        const wasCorrect = answers[i];
        return (
          <div key={i} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-[15px] font-bold text-ink">“{m.statement}”</p>

            {!done ? (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => answer(i, true)}
                  className="flex-1 rounded-lg border-2 border-line py-2 text-sm font-bold text-ink2 transition hover:border-danger hover:text-danger"
                >
                  🚫 Myth
                </button>
                <button
                  onClick={() => answer(i, false)}
                  className="flex-1 rounded-lg border-2 border-line py-2 text-sm font-bold text-ink2 transition hover:border-success hover:text-success"
                >
                  ✅ Fact
                </button>
              </div>
            ) : (
              <div
                className="mt-3 rounded-xl p-3"
                style={{
                  background: wasCorrect ? "#16A34A12" : "#DC262612",
                }}
              >
                <div
                  className="text-[13px] font-extrabold"
                  style={{ color: wasCorrect ? "#16A34A" : "#DC2626" }}
                >
                  {wasCorrect ? "Correct! " : "Not quite — "}
                  This is {m.isMyth ? "a MYTH" : "a FACT"}.
                </div>
                <p className="mt-1 text-[13px] leading-snug text-ink2">
                  {m.truth}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
