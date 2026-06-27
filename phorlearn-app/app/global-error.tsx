"use client";

import { useEffect } from "react";

// Root-level error boundary. Renders its own <html>/<body> because it replaces
// the root layout, so styles are inlined rather than relying on globals.css.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f5f9",
          color: "#0d0f1a",
          fontFamily: "Segoe UI, system-ui, -apple-system, sans-serif",
          padding: 20,
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <div style={{ fontSize: 44 }}>⚠️</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: "12px 0 6px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6B7280" }}>
            A critical error occurred while loading the app. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 20,
              border: "none",
              borderRadius: 10,
              background: "#1B4FD8",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 22px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
