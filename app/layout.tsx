import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TwoPelicans AI - Enterprise AI Consulting & Solutions",
  description: "TwoPelicans AI delivers cutting-edge artificial intelligence solutions for enterprise businesses. Transform your operations with our expert AI consulting, custom implementations, and strategic guidance.",
  keywords: "AI consulting, enterprise AI, artificial intelligence, machine learning, AI transformation, business automation",
  authors: [{ name: "TwoPelicans AI" }],
  openGraph: {
    title: "TwoPelicans AI - Enterprise AI Consulting",
    description: "Transform your business with enterprise-grade AI solutions",
    url: "https://twopelicans.ai",
    siteName: "TwoPelicans AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
