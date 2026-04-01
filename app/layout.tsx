import { I18nProvider } from "@/components/providers/i18n-provider";
import { LenisProvider } from "@/lib/lenis";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zila Homes | Modern Real Estate Solutions",
  description: "Find your dream home with Zila Homes. Production-ready real estate platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-zinc-100">
        <I18nProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
