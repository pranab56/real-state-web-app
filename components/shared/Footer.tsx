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
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-6 md:gap-10 text-center md:text-left">
            <Logo />
            <p className="text-[#A1A1A1] text-base md:text-lg leading-relaxed max-w-sm">
              Premium real estate and travel solutions for the modern explorer. From villas to private jets, we handle it all.
            </p>
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