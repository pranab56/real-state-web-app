'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Building2, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Transportation', href: '/transportation' },
    { name: 'Blog', href: '/blog' },
    {
      name: 'Company',
      href: '#',
      hasDropdown: true,
      subItems: [
        { name: 'POA', href: '/poa' },
        { name: 'About us', href: '/about' }
      ]
    },
    { name: 'EN', href: '#', hasDropdown: true, isLang: true },
  ];

  // Logic for background - Always solid on internal pages, scroll-based on Home
  const showBackground = !isHome || scrolled;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6',
        showBackground ? 'bg-[#1E2024]/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
              <path d="M20 50L50 25L80 50" stroke="#F1913D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 45L70 45L30 85L70 85" stroke="#F1913D" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M45 55L55 65L85 35" stroke="#2B9724" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">ZilaHomes</span>
            <span className="text-[6px] text-white/60 tracking-[0.2em] font-bold uppercase mt-0.5">Verified • Trusted • Connected</span>
          </div>
        </Link>

        {/* Menu Items */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            if (item.hasDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white transition-colors tracking-wide outline-none">
                    {item.name}
                    <ChevronDown size={14} className="opacity-70" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1E2024] border-white/10 text-white rounded-xl p-2 min-w-[150px]">
                    {item.subItems.map((sub) => (
                      <DropdownMenuItem key={sub.name}>
                        <Link
                          href={sub.href}
                          className="w-full px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-colors cursor-pointer block"
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white transition-colors tracking-wide"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform opacity-70" />}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <User size={20} className="text-white/80" />
          </motion.div>

          <Button
            className="bg-primary hover:bg-primary/90 text-white font-bold h-10 px-5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 transition-all border-none"
          >
            <Building2 size={18} />
            <span>Sell Property</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

