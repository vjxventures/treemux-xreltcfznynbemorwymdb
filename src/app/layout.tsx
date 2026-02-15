import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DebateGPT - AI Debate Training",
  description: "Practice debating against AI opponents with real-time feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
