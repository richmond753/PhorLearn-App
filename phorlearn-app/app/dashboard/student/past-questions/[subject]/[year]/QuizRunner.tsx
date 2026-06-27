"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/pastQuestions";
import { saveAttempt } from "@/app/dashboard/student/past-questions/actions";

const LETTERS = ["A", "B", "C", "D"] as const;
const SECONDS_PER_QUESTION = 60;

interface Props {
  subjectSlug: string;
  subjectName: string;
  year: number;
  color: string;
  official: boolean;
  source?: string;
  questions: Question[];
}

export function QuizRunner({
  subjectSlug,
  subjectName,
  year,
  color,
  official,
  source,
  questions,
}: Props) {
  const total = questions.length;
  const totalSeconds = total * SECONDS_PER_QUESTION;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(total).fill(null)
  );
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const savedRef = useRef(false);
  const hydratedRef = useRef(false);

  // Key for persisting an in-progress attempt (survives refresh / accidental close).
  const storageKey = `phorlearn:quiz:${subjectSlug}:${year}`;

  // Restore an in-progress attempt once, on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          answers?: (number | null)[];
          index?: number;
          remaining?: number;
        };
        if (
          Array.isArray(saved.answers) &&
          saved.answers.length === total &&
          typeof saved.remaining === "number" &&
          saved.remaining > 0
        ) {
          setAnswers(saved.answers);
          setIndex(Math.min(Math.max(saved.index ?? 0, 0), total - 1));
          setRemaining(saved.remaining);
        }
      }
    } catch {
      // ignore corrupt / unavailable storage
    }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer.
  useEffect(() => {
    if (finished) return;
    if (remaining <= 0) {
      setFinished(true);
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, finished]);

  const started = answers.some((a) => a !== null) || remaining < totalSeconds;

  // Persist progress while the quiz is live; clear it once finished.
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      if (finished) {
        localStorage.removeItem(storageKey);
      } else if (started) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ answers, index, remaining })
        );
      }
    } catch {
      // ignore storage write failures
    }
  }, [answers, index, remaining, finished, started, storageKey]);

  // Warn before leaving a quiz that is in progress.
  useEffect(() => {
    if (!started || finished) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [started, finished]);

  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a === questions[i].answer ? 1 : 0),
    0
  );
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const durationSeconds = Math.min(totalSeconds, totalSeconds - remaining);

  // Persist the attempt once, when finished.
  useEffect(() => {
    if (!finished || savedRef.current) return;
    savedRef.current = true;
    setSaveState("saving");
    saveAttempt({
      subjectSlug,
      subjectName,
      year,
      score,
      total,
      durationSeconds,
    })
      .then((r) => setSaveState(r.ok ? "saved" : "error"))
      .catch(() => setSaveState("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function choose(optionIndex: number) {
    if (answers[index] !== null) return; // already answered
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (index < total - 1) setIndex((i) => i + 1);
  }

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function submit() {
    const skipped = answers.filter((a) => a === -1 || a === null).length;
    if (
      skipped > 0 &&
      !window.confirm(
        `You have ${skipped} skipped or unanswered question${
          skipped === 1 ? "" : "s"
        }. Submit and see your results anyway?`
      )
    ) {
      return;
    }
    setFinished(true);
  }

  function reset() {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    savedRef.current = false;
    setAnswers(Array(total).fill(null));
    setIndex(0);
    setRemaining(totalSeconds);
    setSaveState("idle");
    setFinished(false);
  }

  // Keyboard shortcuts: A–D / 1–4 to answer, Enter or → to advance, ← to go back.
  useEffect(() => {
    if (finished) return;
    function onKey(e: KeyboardEvent) {
      const q = questions[index];
      const picked = answers[index];
      const isAnswered = picked !== null && picked !== undefined;
      const last = index === total - 1;
      const key = e.key.toLowerCase();
      const map: Record<string, number> = {
        a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3,
      };
      if (!isAnswered && key in map && map[key] < q.options.length) {
        e.preventDefault();
        choose(map[key]);
        return;
      }
      if (isAnswered && (e.key === "Enter" || e.key === "ArrowRight")) {
        e.preventDefault();
        if (last) submit();
        else goNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, answers, finished]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  // ---------------- Results screen ----------------
  if (finished) {
    const band =
      percentage >= 70 ? "#16A34A" : percentage >= 50 ? "#D4A017" : "#DC2626";
    return (
      <div>
        <div
          className="relative mb-5 overflow-hidden rounded-xl px-6 py-8 text-center text-white"
          style={{ background: "#0D0F1A" }}
        >
          <div className="text-sm font-bold uppercase tracking-[1.5px] text-white/50">
            {subjectName} · WASSCE {year}
          </div>
          <div className="mt-3 text-6xl font-black" style={{ color: band }}>
            {percentage}%
          </div>
          <div className="mt-1 text-lg font-bold">
            You scored {score} / {total}
          </div>
          <div role="status" aria-live="polite" className="mt-2 text-xs text-white/50">
            {saveState === "saving" && "Saving your attempt…"}
            {saveState === "saved" && "Attempt saved to your history"}
            {saveState === "error" && "Could not save attempt"}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2.5">
          <button
            onClick={reset}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
          >
            ↻ Retake Paper
          </button>
          <Link
            href="/dashboard/student/past-questions"
            className="rounded-lg border-2 border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
          >
            All Papers
          </Link>
          <Link
            href="/dashboard/student"
            className="rounded-lg border-2 border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
          >
            Dashboard
          </Link>
        </div>

        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
          Review
        </h2>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const picked = answers[i];
            const correct = q.answer;
            const gotIt = picked === correct;
            return (
              <div
                key={i}
                className="rounded-xl bg-white p-4 shadow-card"
                style={{ borderLeft: `4px solid ${gotIt ? "#16A34A" : "#DC2626"}` }}
              >
                <div className="mb-2 flex items-start gap-2">
                  <span className="text-sm font-bold text-muted">{i + 1}.</span>
                  <span className="text-[14px] font-semibold text-ink">
                    {q.stem}
                  </span>
                </div>
                <div className="space-y-1.5 pl-5">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === correct;
                    const isPicked = oi === picked;
                    let cls = "border-line bg-white text-ink2";
                    if (isCorrect) cls = "border-success bg-success-lt text-success";
                    else if (isPicked) cls = "border-danger bg-danger-lt text-danger";
                    return (
                      <div
                        key={oi}
                        className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-[13px] ${cls}`}
                      >
                        <span className="font-bold">{LETTERS[oi]}.</span>
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="ml-auto text-xs font-bold">✓ Correct</span>
                        )}
                        {isPicked && !isCorrect && (
                          <span className="ml-auto text-xs font-bold">Your answer</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 pl-5 text-[12px] leading-relaxed text-muted">
                  <strong className="text-ink2">Why:</strong> {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- Quiz screen ----------------
  const q = questions[index];
  const picked = answers[index];
  const answered = picked !== null;
  const isLast = index === total - 1;
  const lowTime = remaining <= 30;

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] font-bold uppercase tracking-[1.4px]" style={{ color }}>
          {subjectName} · WASSCE {year}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-faint px-2.5 py-1 text-[11px] font-bold text-ink2">
            Q {index + 1} of {total}
          </span>
          <span
            role="timer"
            aria-live={lowTime ? "assertive" : "off"}
            aria-label={`Time remaining: ${mm} minutes ${ss} seconds`}
            className="rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums"
            style={{
              background: lowTime ? "#FEF2F2" : "#FFF8E1",
              color: lowTime ? "#DC2626" : "#D4A017",
            }}
          >
            <span aria-hidden="true">⏱ </span>
            {mm}:{ss}
          </span>
        </div>
      </div>

      {/* progress bar */}
      <div
        className="mb-4 h-[5px] overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${index + 1} of ${total}`}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%`, background: color }}
        />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-card sm:p-6">
        {official && index === 0 && (
          <p className="mb-3 rounded-lg bg-success-lt px-3 py-2 text-[12px] font-medium text-success">
            📄 This is the verbatim WAEC {year} {subjectName} objective paper.
          </p>
        )}
        <div className="mb-5 text-[16px] font-semibold leading-relaxed text-ink">
          {q.stem}
        </div>

        <div className="space-y-2.5">
          {q.options.map((opt, oi) => {
            const isCorrect = oi === q.answer;
            const isPicked = oi === picked;
            let cls =
              "border-line bg-white hover:border-brand hover:bg-brand-lt";
            if (answered) {
              if (isCorrect) cls = "border-success bg-success-lt text-success";
              else if (isPicked) cls = "border-danger bg-danger-lt text-danger";
              else cls = "border-line bg-white opacity-60";
            }
            const stateLabel = answered
              ? isCorrect
                ? " (correct answer)"
                : isPicked
                  ? " (your answer, incorrect)"
                  : ""
              : "";
            return (
              <button
                key={oi}
                onClick={() => choose(oi)}
                disabled={answered}
                aria-label={`Option ${LETTERS[oi]}: ${opt}${stateLabel}`}
                className={`flex w-full items-center gap-3 rounded-[10px] border-2 px-4 py-3.5 text-left text-[14px] transition ${cls}`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-faint text-xs font-bold"
                >
                  {LETTERS[oi]}
                </span>
                <span>{opt}</span>
                {answered && isCorrect && (
                  <span aria-hidden="true" className="ml-auto text-sm font-bold">
                    ✓
                  </span>
                )}
                {answered && isPicked && !isCorrect && (
                  <span aria-hidden="true" className="ml-auto text-sm font-bold">
                    ✗
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            role="status"
            aria-live="polite"
            className="mt-4 rounded-[10px] px-4 py-3 text-[13px] leading-relaxed"
            style={{
              background: picked === q.answer ? "#F0FDF4" : "#FEF2F2",
              color: picked === q.answer ? "#16A34A" : "#DC2626",
            }}
          >
            <strong>
              {picked === q.answer ? "Correct! " : `Incorrect — answer is ${LETTERS[q.answer]}. `}
            </strong>
            <span style={{ color: "#2D3150" }}>{q.explanation}</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="rounded-lg border-2 border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>
          <span className="hidden text-[13px] font-semibold text-muted sm:inline">
            Score: {score}/{total}
          </span>
        </div>
        <div className="flex gap-2.5">
          {!answered && (
            <button
              onClick={() => choose(-1)}
              className="rounded-lg border-2 border-line px-5 py-2.5 text-sm font-bold text-muted transition hover:border-brand hover:text-brand"
            >
              Skip
            </button>
          )}
          {answered &&
            (isLast ? (
              <button
                onClick={submit}
                className="rounded-lg bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
              >
                Submit & See Results →
              </button>
            ) : (
              <button
                onClick={goNext}
                className="rounded-lg bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1340B8]"
              >
                Next →
              </button>
            ))}
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted">
        Tip: press <strong className="text-ink2">A–D</strong> to answer,{" "}
        <strong className="text-ink2">←</strong> /{" "}
        <strong className="text-ink2">→</strong> to navigate. Your progress is
        saved if you refresh.
      </p>

      {source && (
        <p className="mt-3 text-center text-[11px] text-muted">{source}</p>
      )}
    </div>
  );
}
