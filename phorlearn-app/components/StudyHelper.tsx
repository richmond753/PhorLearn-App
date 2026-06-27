"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface Props {
  subject: string;
  topic: string;
}

export function StudyHelper({ subject, topic }: Props) {
  const greeting: Message = {
    role: "ai",
    text: `Hi! I'm your WASSCE Study Helper. Ask me anything about ${subject} — especially "${topic}".`,
  };

  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAsked, setLastAsked] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load any saved conversation for this subject + topic. Re-runs when the
  // student switches topics so each topic keeps its own thread.
  useEffect(() => {
    let cancelled = false;
    const reset: Message = {
      role: "ai",
      text: `Hi! I'm your WASSCE Study Helper. Ask me anything about ${subject} — especially "${topic}".`,
    };
    setMessages([reset]);
    setError(null);
    setLastAsked(null);

    (async () => {
      try {
        const res = await fetch(
          `/api/chat?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`
        );
        if (!res.ok) return;
        const data = (await res.json()) as { messages?: Message[] };
        if (!cancelled && data.messages?.length) {
          setMessages([reset, ...data.messages]);
        }
      } catch {
        // offline / not signed in — keep just the greeting
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subject, topic]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function ask(question: string, priorMessages: Message[]) {
    setLoading(true);
    setError(null);
    try {
      // Exclude the opening greeting from the API history.
      const history = priorMessages.slice(1);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, topic, message: question, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Request failed.");
      }
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function sendText(raw: string) {
    const question = raw.trim();
    if (!question || loading) return;
    const priorMessages = messages;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLastAsked(question);
    ask(question, priorMessages);
  }

  function send() {
    sendText(input);
  }

  const suggestions = [
    `Explain "${topic}" simply`,
    `Give me a worked example on ${topic}`,
    `Likely WASSCE questions on ${topic}?`,
  ];
  const showSuggestions = messages.length <= 1 && !loading && !error;

  function retry() {
    if (!lastAsked || loading) return;
    // `messages` ends with the failed user turn; drop it so it isn't duplicated
    // in the history (it is re-sent as the message instead).
    const lastIsUser = messages[messages.length - 1]?.role === "user";
    const prior = lastIsUser ? messages.slice(0, -1) : messages;
    ask(lastAsked, prior);
  }

  return (
    <div className="flex h-full flex-col rounded-xl bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="text-lg">🤖</span>
        <div className="flex-1">
          <div className="text-[13px] font-bold text-ink">AI Study Helper</div>
          <div className="text-[10px] text-muted">Powered by Google Gemini</div>
        </div>
        <span className="rounded-full bg-success-lt px-2 py-0.5 text-[9px] font-bold text-success">
          FREE
        </span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI Study Helper"
        className="flex max-h-[360px] min-h-[220px] flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "ai"
                ? "max-w-[88%] self-start rounded-[12px] rounded-bl-[2px] bg-brand-lt px-3.5 py-2.5 text-[13px] leading-relaxed text-ink2"
                : "max-w-[88%] self-end rounded-[12px] rounded-br-[2px] bg-brand px-3.5 py-2.5 text-[13px] leading-relaxed text-white"
            }
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div
            aria-label="Study Helper is typing"
            className="flex items-center gap-1.5 self-start rounded-[12px] rounded-bl-[2px] bg-brand-lt px-3.5 py-3"
          >
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand" />
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="self-start rounded-[12px] bg-danger-lt px-3.5 py-2.5 text-[12px] text-danger"
          >
            <p className="font-semibold">
              <span aria-hidden="true">⚠️ </span>
              {error}
            </p>
            {lastAsked && (
              <button
                onClick={retry}
                className="mt-1.5 rounded-md bg-danger px-2.5 py-1 text-[11px] font-bold text-white"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {showSuggestions && (
          <div className="mt-1 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
              Try asking
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendText(s)}
                className="self-start rounded-full border border-line px-3 py-1.5 text-left text-[12px] font-medium text-ink2 transition hover:border-brand hover:text-brand"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t border-line p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          aria-label={`Ask the AI Study Helper about ${topic}`}
          placeholder={`Ask about ${topic}…`}
          className="flex-1 rounded-[10px] border-2 border-line px-3 py-2 text-[13px] outline-none transition focus:border-brand"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="rounded-[10px] bg-brand px-3.5 py-2 text-sm font-bold text-white transition hover:bg-[#1340B8] disabled:opacity-50"
          aria-label="Send"
        >
          →
        </button>
      </div>
    </div>
  );
}
