// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/header/Header";
import { metadataArea } from "./metadata"; // ✅ Correct import based on named export

// Google Fonts
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Re-export metadata so Next.js picks it up
export const metadata: Metadata = metadataArea;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
      <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TQBH062QR3"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQBH062QR3');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
