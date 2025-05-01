// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header/Header";
import { metadataArea } from "./metadata"; // ✅ Correct import based on named export

// Google Fonts
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Re-export metadata so Next.js picks it up
export const metadata: Metadata = metadataArea;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
