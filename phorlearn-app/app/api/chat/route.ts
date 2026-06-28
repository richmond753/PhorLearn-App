import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

// Simple in-memory per-user rate limit (resets when the server restarts).
// Good enough to protect the free Gemini quota during a demo; swap for a
// durable store (e.g. Upstash Redis) in production.
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(userId: string): boolean {
  const now = Date.now();
  const entry = hits.get(userId);
  if (!entry || now > entry.resetAt) {
    hits.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// Free-tier Gemini models, tried in order. The newest free flash model
// (gemini-2.5-flash) is primary; we fall back to its lite sibling and the
// older 1.5 flash so the helper keeps working if a model is busy, rate-limited
// or renamed. Override the primary with the GEMINI_MODEL env var if needed.
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-1.5-flash",
].filter((m, i, arr) => m && arr.indexOf(m) === i);

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

interface ChatRequest {
  subject?: string;
  topic?: string;
  message?: string;
  history?: ChatMessage[];
}

function systemPrompt(subject: string, topic: string): string {
  return `You are a WASSCE study assistant for Ghana SHS students. The student is currently studying ${subject} — topic: ${topic}. Give clear, concise explanations with worked examples where relevant. Keep responses under 150 words. Be encouraging.`;
}

// Returns saved chat history for the signed-in user, scoped to subject + topic.
export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ messages: [] }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject")?.trim() || "";
  const topic = searchParams.get("topic")?.trim() || "";

  const { data } = await supabase
    .from("chat_messages")
    .select("role, text")
    .eq("user_id", user.id)
    .eq("subject", subject)
    .eq("topic", topic)
    .order("created_at", { ascending: true });

  return Response.json({ messages: data ?? [] });
}

export async function POST(req: Request) {
  // Require an authenticated session — the AI endpoint is not public.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Please sign in to use the AI helper." }, {
      status: 401,
    });
  }

  if (rateLimited(user.id)) {
    return Response.json(
      { error: "You're sending messages too quickly. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const subject = body.subject?.trim() || "an SHS subject";
  const topic = body.topic?.trim() || "the current topic";
  const message = body.message?.trim();

  if (!message) {
    return Response.json({ error: "Empty message." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "AI is not configured. Add GEMINI_API_KEY to .env.local (free key at aistudio.google.com/app/apikey) and restart the server.",
      },
      { status: 503 }
    );
  }

  // Map prior turns to Gemini's format. History must start with a user turn,
  // so drop any leading assistant (greeting) messages.
  const history = (body.history ?? [])
    .map((m) => ({
      role: m.role === "ai" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.text }],
    }))
    .filter((_, i, arr) => {
      // trim leading model messages
      const firstUser = arr.findIndex((x) => x.role === "user");
      return firstUser === -1 ? false : i >= firstUser;
    });

  const genAI = new GoogleGenerativeAI(apiKey);
  let reply: string | null = null;
  let lastError: unknown = null;

  // Try each free model in turn until one responds.
  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt(subject, topic),
      });
      const chat = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      });
      const result = await chat.sendMessage(message);
      reply = result.response.text();
      if (reply) break;
    } catch (err) {
      lastError = err;
      // Try the next model in the fallback list.
    }
  }

  if (!reply) {
    const detail =
      lastError instanceof Error ? lastError.message : "Unknown error";
    return Response.json(
      { error: `The AI service could not respond. ${detail}` },
      { status: 502 }
    );
  }

  // Persist the turn so the conversation survives reloads. Best-effort:
  // a storage hiccup must not break the chat response itself.
  try {
    await supabase.from("chat_messages").insert([
      { user_id: user.id, subject, topic, role: "user", text: message },
      { user_id: user.id, subject, topic, role: "ai", text: reply },
    ]);
  } catch {
    // ignore — reply is still returned to the user
  }

  return Response.json({ reply });
}
