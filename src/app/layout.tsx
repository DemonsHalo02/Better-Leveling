import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Better Leveling v2 | Shadow Monarch Fitness & Health Tracker",
  description: "Solo Leveling themed fitness, weight loss, nutrition, and gym tracker app. Tailored for Planet Fitness Lewiston, ME and local Auburn/Lewiston grocers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-system-dark text-white selection:bg-system-blue selection:text-system-dark min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
