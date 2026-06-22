import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdLab Math — Direct & Inverse Proportion",
  description: "Learn direct and inverse proportion with interactive simulations, explanations, quizzes, and a friendly tutor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
