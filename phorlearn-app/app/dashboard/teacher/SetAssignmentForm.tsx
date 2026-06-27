"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  setAssignmentAction,
  uploadLessonAction,
  type SetAssignmentState,
  type UploadLessonState,
} from "./actions";

const assignmentInitial: SetAssignmentState = {};
const lessonInitial: UploadLessonState = {};

type Panel = "none" | "lesson" | "assignment";

export default function SetAssignmentForm({
  defaultSubject,
}: {
  defaultSubject?: string | null;
}) {
  const [panel, setPanel] = useState<Panel>("none");

  const [aState, aAction, aPending] = useActionState(
    setAssignmentAction,
    assignmentInitial
  );
  const [lState, lAction, lPending] = useActionState(
    uploadLessonAction,
    lessonInitial
  );

  const aRef = useRef<HTMLFormElement>(null);
  const lRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (aState.success) {
      aRef.current?.reset();
      const t = setTimeout(() => setPanel("none"), 1200);
      return () => clearTimeout(t);
    }
  }, [aState.success]);

  useEffect(() => {
    if (lState.success) {
      lRef.current?.reset();
      const t = setTimeout(() => setPanel("none"), 1200);
      return () => clearTimeout(t);
    }
  }, [lState.success]);

  const fieldCls =
    "w-full rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-medium text-ink outline-none focus:border-brand";
  const labelCls =
    "mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted";

  return (
    <div className="flex flex-col gap-2 text-sm font-bold">
      <button
        type="button"
        onClick={() => setPanel((p) => (p === "lesson" ? "none" : "lesson"))}
        aria-expanded={panel === "lesson"}
        className="rounded-lg bg-brand py-2.5 text-white transition hover:bg-[#1340B8]"
      >
        + Upload Lesson
      </button>

      {panel === "lesson" && (
        <form
          ref={lRef}
          action={lAction}
          className="space-y-2.5 rounded-[10px] bg-faint p-3 text-left"
        >
          <div>
            <label className={labelCls}>Lesson title</label>
            <input
              name="title"
              required
              placeholder="e.g. Vectors — Introduction"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Subject</label>
            <input
              name="subject"
              defaultValue={defaultSubject ?? ""}
              placeholder="Subject"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Notes / content</label>
            <textarea
              name="content"
              rows={3}
              placeholder="Lesson notes, links or instructions…"
              className={`${fieldCls} resize-y`}
            />
          </div>
          {lState.error && (
            <p className="text-[12px] font-bold text-danger">{lState.error}</p>
          )}
          {lState.success && (
            <p className="text-[12px] font-bold text-success">
              {lState.success}
            </p>
          )}
          <button
            type="submit"
            disabled={lPending}
            className="w-full rounded-lg bg-brand py-2 text-white transition hover:bg-[#1340B8] disabled:opacity-60"
          >
            {lPending ? "Uploading…" : "Upload lesson"}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() =>
          setPanel((p) => (p === "assignment" ? "none" : "assignment"))
        }
        aria-expanded={panel === "assignment"}
        className="rounded-lg border-2 border-brand py-2.5 text-brand transition hover:bg-brand-lt"
      >
        📝 Set Assignment
      </button>

      {panel === "assignment" && (
        <form
          ref={aRef}
          action={aAction}
          className="space-y-2.5 rounded-[10px] bg-faint p-3 text-left"
        >
          <div>
            <label className={labelCls}>Title</label>
            <input
              name="title"
              required
              placeholder="e.g. Calculus problem set 3"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Subject</label>
            <input
              name="subject"
              defaultValue={defaultSubject ?? ""}
              placeholder="Subject"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Due date</label>
            <input type="date" name="due_date" required className={fieldCls} />
          </div>
          {aState.error && (
            <p className="text-[12px] font-bold text-danger">{aState.error}</p>
          )}
          {aState.success && (
            <p className="text-[12px] font-bold text-success">
              {aState.success}
            </p>
          )}
          <button
            type="submit"
            disabled={aPending}
            className="w-full rounded-lg bg-brand py-2 text-white transition hover:bg-[#1340B8] disabled:opacity-60"
          >
            {aPending ? "Saving…" : "Save assignment"}
          </button>
        </form>
      )}
    </div>
  );
}
