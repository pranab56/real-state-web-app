'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Logo() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <div className="relative w-12 h-12">
          {/* Logo SVG matching the image design */}
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Roof shape */}
            <path d="M20 50L50 25L80 50" stroke="#F1913D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Z Shape components */}
            <path d="M30 45L70 45L30 85L70 85" stroke="#F1913D" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Green accent stroke */}
            <path d="M45 55L55 65L85 35" stroke="#2B9724" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white tracking-tight">Zila</span>
            <span className="text-2xl font-bold text-white tracking-tight">Homes</span>
            <span className="text-[10px] text-white/80 font-medium ml-0.5">™</span>
          </div>
          <div className="flex items-center gap-1 -mt-1 text-[7px] text-neutral-2 font-semibold tracking-widest uppercase">
            <span>Verified</span>
            <span>•</span>
            <span>Trusted</span>
            <span>•</span>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname.startsWith('/partner-dashboard') ||
    pathname.startsWith('/hotels-partner-dashboard') ||
    pathname.startsWith('/transport-Partner-dashboard') ||
    pathname.startsWith('/transport-partner-dashboard')
  ) {
    return null;
  }

  return (
    <footer className="bg-[#1E2024] text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-6 md:gap-10 text-center md:text-left">
            <Logo />
            <p className="text-[#A1A1A1] text-base md:text-lg leading-relaxed max-w-sm">
              Premium real estate and travel solutions for the modern explorer. From villas to private jets, we handle it all.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold">Company</h3>
            <div className="flex flex-col gap-3 md:gap-5 text-[#A1A1A1] text-sm md:text-base">
              <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
              <Link href="/hotels" className="hover:text-white transition-colors">Hotels</Link>
              <Link href="/transportation" className="hover:text-white transition-colors">Transportation</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold">Legal</h3>
            <div className="flex flex-col gap-3 md:gap-5 text-[#A1A1A1] text-sm md:text-base">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold">Newsletter</h3>
            <p className="text-[#A1A1A1] text-sm md:text-base">Sign Up to receive the latest articles</p>
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-sm">
              <Input
                type="email"
                placeholder="Your email address here..."
                className="h-12 md:h-14 bg-[#2C2E33] border border-white/60 placeholder:text-white/60 text-white rounded-xl px-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button
                size="lg"
                className="h-12 md:h-14 text-white font-bold text-base md:text-lg rounded-xl transition-all shadow-lg w-full"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/10 text-center">
          <p className="text-[#A1A1A1] text-xs md:text-base flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5">
            <span>© 2025 Zila Homes. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>SOC2 Type II Certified.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
