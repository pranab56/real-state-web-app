'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronDown, Menu, User, X } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

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
    // { name: 'EN', href: '#', hasDropdown: true, isLang: true },
  ];

  // Logic for background - Always solid on internal pages, scroll-based on Home
  const showBackground = !isHome || scrolled || isOpen;

  const isDashboardRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/partner-dashboard') ||
    pathname.startsWith('/hotels-partner-dashboard') ||
    pathname.startsWith('/transport-Partner-dashboard') ||
    pathname.startsWith('/transport-partner-dashboard');

  if (isDashboardRoute) {
    return null;
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6',
        showBackground ? 'bg-[#1E2024]/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-4 md:py-6'
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
              <path d="M20 50L50 25L80 50" stroke="#F1913D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 45L70 45L30 85L70 85" stroke="#F1913D" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M45 55L55 65L85 35" stroke="#2B9724" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">ZilaHomes</span>
            <span className="text-[5px] md:text-[6px] text-white/60 tracking-[0.2em] font-bold uppercase mt-0.5">Verified • Trusted • Connected</span>
          </div>
        </Link>

        {/* Desktop Menu Items */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

            if (item.hasDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className={cn(
                    "group relative flex items-center cursor-pointer gap-1 text-sm font-semibold transition-colors tracking-wide outline-none py-1",
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  )}>
                    {item.name}
                    <ChevronDown size={14} className={cn("opacity-70 transition-transform duration-300", isActive && "rotate-180")} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary rounded-full shadow-lg shadow-primary/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-600 border-white/20 text-white rounded-xl p-2 min-w-[160px] shadow-2xl overflow-hidden">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <DropdownMenuItem key={sub.name} className="focus:bg-transparent p-0">
                          <Link
                            href={sub.href}
                            className={cn(
                              "w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-between group/sub",
                              isSubActive ? "bg-white/20 backdrop-blur-sm text-white" : "hover:bg-white/5 text-white/80 hover:text-white"
                            )}
                          >
                            <span>{sub.name}</span>
                            {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1 text-sm font-semibold transition-colors tracking-wide py-1",
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary rounded-full shadow-lg shadow-primary/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <User size={18} className="text-white/80 md:w-5 md:h-5" />
          </motion.div>

          <Button
            className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-bold h-9 md:h-10 px-4 md:px-5 rounded-lg items-center gap-2 shadow-lg shadow-primary/20 transition-all border-none"
          >
            <Building2 size={18} />
            <span>Sell Property</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="flex lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 border border-white/20 items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-[#1E2024]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl lg:hidden p-4 flex flex-col max-h-[calc(100vh-80px)] overflow-y-auto z-40"
          >
            <div className="flex flex-col gap-1 pb-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

                if (item.hasDropdown && item.subItems) {
                  const isDropdownOpen = openDropdown === item.name;
                  return (
                    <div key={item.name} className="flex flex-col mb-2">
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.name)}
                        className="flex justify-between items-center text-white/50 hover:text-white transition-colors font-semibold py-2 px-4 uppercase text-[11px] tracking-wider w-full text-left"
                      >
                        {item.name}
                        <ChevronDown size={14} className={cn("transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-4 border-l border-white/10 ml-4 space-y-1 mt-1">
                              {item.subItems.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "py-2 px-4 text-sm font-medium transition-colors rounded-lg",
                                      isSubActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                                    )}
                                  >
                                    {sub.name}
                                  </Link>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 px-4 text-sm font-semibold rounded-lg transition-colors border border-transparent",
                      isActive ? "bg-white/10 text-white border-white/5" : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-2 pt-4 border-t border-white/10 flex flex-col sm:hidden">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 border-none"
              >
                <Building2 size={18} />
                <span>Sell Property</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
