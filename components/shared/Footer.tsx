'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNewsletterMutation } from "@/features/newsletter/newsletterApi";
import { Loader2 } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from '../../types';

function Logo() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <div className="relative w-70 h-20">
          {/* Logo SVG matching the image design */}
          <Image src={"/icons/logoOne.png"} fill alt="ZilaHomes" />
        </div>
      </div>
    </div>
  );
}

function AppleStoreIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="apple-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555555" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#apple-logo-grad)"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-13.7 69.5-34.3z"
      />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#00D2FF" />
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00E676" />
      <path d="M104.6 499l220.7-221.3 60.1 60.1L104.6 499z" fill="#FF3D00" />
      <path d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" fill="#FFC107" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [createNewsletter, { isLoading }] = useCreateNewsletterMutation();

  const handleSubscribe = async () => {
    if (!email.trim()) { setEmailError('Please enter your email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setEmailError('Please enter a valid email address'); return; }
    setEmailError('');
    try {
      const res = await createNewsletter({ email: email.trim(), source: 'website' }).unwrap();
      toast.success(res.message ?? 'Subscribed successfully!');
      setEmail('');
    } catch (err) {
      const error = err as ApiError;
      setEmailError(
        error.data?.errorMessages?.[0]?.message ??
        error.data?.message ??
        'Something went wrong'
      );
    }
  };

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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-5 text-center md:text-left">
            <Logo />
            <p className="text-[#A1A1A1] text-base md:text-lg leading-relaxed max-w-sm">
              Premium real estate and travel solutions for the modern explorer. From villas to private jets, we handle it all.
            </p>
            {/* App Store & Google Play Download Links */}
            <div className="flex flex-col gap-2.5 items-center md:items-start pt-2 w-full">
              <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Get the App</span>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.hermela.zilahomes&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="flex items-center gap-3 bg-[#2C2E33] hover:bg-[#3A3D44] border border-white/10 hover:border-white/20 text-white rounded-lg px-4 py-2.5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.2 group"
                >
                  <GooglePlayIcon className="w-6 h-6 text-white group-hover:scale-105 transition-transform shrink-0" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] uppercase font-semibold text-gray-400 group-hover:text-gray-300">GET IT ON</span>
                    <span className="text-sm font-bold tracking-wide">Google Play</span>
                  </div>
                </a>

                <a
                  href="https://apps.apple.com/us/app/zilahomes/id6784905421"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="flex items-center gap-3 bg-[#2C2E33] hover:bg-[#3A3D44] border border-white/10 hover:border-white/20 text-white rounded-lg px-4 py-2.5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.2 group"
                >
                  <AppleStoreIcon className="w-6 h-6 text-white group-hover:scale-105 transition-transform shrink-0" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] font-semibold text-gray-400 group-hover:text-gray-300">Download on the</span>
                    <span className="text-sm font-bold tracking-wide">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-medium">Company</h3>
            <div className="flex flex-col gap-3 md:gap-5 text-[#A1A1A1] text-sm md:text-base">
              <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
              <Link href="/hotels" className="hover:text-white transition-colors">Hotels</Link>
              <Link href="/transportation" className="hover:text-white transition-colors">Transportation</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-medium">Legal</h3>
            <div className="flex flex-col gap-3 md:gap-5 text-[#A1A1A1] text-sm md:text-base">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Policy</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-medium">Newsletter</h3>
            <p className="text-[#A1A1A1] text-sm md:text-base">Sign Up to receive the latest articles</p>
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-sm">
              <div className="flex flex-col gap-1">
                <Input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Your email address here..."
                  className={`h-12 md:h-14 bg-[#2C2E33] placeholder:text-white/60 text-white rounded-xl px-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-primary ${emailError ? 'border border-red-400' : 'border border-white/60'}`}
                />
                {emailError && <p className="text-red-400 text-xs font-medium px-1">{emailError}</p>}
              </div>
              <Button
                size="lg"
                onClick={handleSubscribe}
                disabled={isLoading}
                className="h-12 md:h-14 text-white font-medium cursor-pointer text-base md:text-lg rounded-xl transition-all shadow-lg w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 size={18} className="animate-spin" /> Subscribing...</> : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/10 text-center">
          <p className="text-[#A1A1A1] text-xs md:text-base flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5">
            <span>© 2026 ZilaHomes. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>SOC2 Type II Certified.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}