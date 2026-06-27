import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhorLearn SHS — WASSCE Study Platform",
  description:
    "Ghana's most focused SHS study platform. Past questions, AI tutoring, live assessments and career guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-ink">{children}</body>
    </html>
  );
}
