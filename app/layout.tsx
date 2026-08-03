import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NavScrollBridge from "@/components/NavScrollBridge";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vishnupriya M V — AI Automation Engineer",
  description:
    "Building intelligent automations, designing impact, creating the future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} scroll-smooth`}>
      <body className="bg-ink font-display text-white antialiased">
        <NavScrollBridge />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
