import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "PhorLearn SHS — WASSCE Study Platform";
const DESCRIPTION =
  "PhorLearn helps Ghanaian SHS students prepare for WASSCE — past questions, video lessons, AI tutoring, health & wellness, career guidance and progress tracking.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "PhorLearn SHS",
  keywords: [
    "WASSCE",
    "SHS",
    "Ghana",
    "past questions",
    "study platform",
    "career guidance",
    "WAEC",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "PhorLearn SHS",
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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
