import type { Metadata, Viewport } from "next";
import { Outfit, Chakra_Petch } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Better Leveling v2 | Shadow Monarch Fitness & Health Tracker",
  description: "Solo Leveling themed fitness, weight loss, nutrition, and gym tracker app. Tailored for quiet apartment bodyweight training and local Auburn/Lewiston grocers.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Better Leveling",
  },
};

export const viewport: Viewport = {
  themeColor: "#050811",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${chakra.variable} font-sans antialiased bg-[#050811] text-zinc-100 selection:bg-system-blue selection:text-black min-h-screen overflow-x-hidden`}
      >
        {/* Ambient background glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-system-blue/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-system-purple/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
