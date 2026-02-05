import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iTutorOS",
  description: "All-in-one business OS for tutoring businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
