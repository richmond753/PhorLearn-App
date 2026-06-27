"use client";

import { useActionState, useRef, useState } from "react";
import {
  uploadAvatarAction,
  removeAvatarAction,
  type ProfileState,
} from "./actions";

const initial: ProfileState = {};

export default function AvatarUploader({
  avatarUrl,
  initials,
}: {
  avatarUrl: string | null;
  initials: string;
}) {
  const [state, action, pending] = useActionState(uploadAvatarAction, initial);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  const shown = preview ?? avatarUrl;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      {/* Avatar preview */}
      <div className="relative">
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shown}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover ring-2 ring-line"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-2xl font-extrabold text-white ring-2 ring-line">
            {initials}
          </div>
        )}
      </div>

      {/* Upload form */}
      <form action={action} className="flex-1 space-y-3">
        <input
          ref={inputRef}
          type="file"
          name="avatar"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={onPick}
          className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-lt file:px-4 file:py-2 file:text-sm file:font-bold file:text-brand hover:file:bg-brand-lt/80"
        />
        <p className="text-[11px] text-muted">
          JPG, PNG, WEBP or GIF · up to 4&nbsp;MB.{" "}
          {fileName && <span className="font-semibold">Selected: {fileName}</span>}
        </p>

        {state.error && (
          <p className="text-[12px] font-bold text-danger">{state.error}</p>
        )}
        {state.success && (
          <p className="text-[12px] font-bold text-success">{state.success}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1340B8] disabled:opacity-60"
          >
            {pending ? "Uploading…" : "Save picture"}
          </button>
          {avatarUrl && (
            <button
              type="submit"
              formAction={removeAvatarAction}
              className="rounded-lg border-2 border-line px-4 py-2 text-sm font-bold text-muted transition hover:border-danger hover:text-danger"
            >
              Remove
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
