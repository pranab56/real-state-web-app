import { GoogleTranslateProvider } from "@/components/ui/google-translate";
import { ReduxProvider } from "@/components/providers/redux-provider";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-zinc-100">
        <ReduxProvider>
          <GoogleTranslateProvider />
          {/* <LenisProvider> */}
          {children}
          {/* </LenisProvider> */}
          <Toaster richColors position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}
