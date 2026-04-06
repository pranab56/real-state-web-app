'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
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
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation('common');
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

  const menuItems = [
    { name: t('navbar.home'), href: '/' },
    {
      name: t('navbar.properties'),
      href: '#',
      hasDropdown: true,
      subItems: [
        { name: 'Real Estate', href: '/properties' },
        { name: 'Hotels', href: '/hotels' },
        { name: 'Transportation', href: '/transportation' },
      ]
    },
    { name: t('navbar.blog'), href: '/blog' },
    { name: t('navbar.poa'), href: '/poa' },
    {
      name: t('navbar.company'),
      href: '#',
      hasDropdown: true,
      subItems: [
        { name: t('navbar.about'), href: '/about' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  const languages = [
    { name: 'EN', fullName: 'English', flag: '/icons/flags/en.png', code: 'en' },
    { name: 'AR', fullName: 'العربية', flag: '/icons/flags/ar.png', code: 'ar' },
    { name: 'RU', fullName: 'Русский', flag: '/icons/flags/ru.png', code: 'ru' },
    { name: 'AM', fullName: 'አማርኛ', flag: '/icons/flags/am.png', code: 'am' },
  ];

  const selectedLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (lang: typeof languages[0]) => {
    i18n.changeLanguage(lang.code);
  };

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-6',
        showBackground ? 'bg-[#1E2024]/80 backdrop-blur-md py-2.5 md:py-3 shadow-xl' : 'bg-transparent py-4 md:py-6'
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10 w-full overflow-hidden">
        {/* Logo Container */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-7 md:h-12 w-28 sm:w-32 md:w-48">
            {/* Desktop Logo */}
            <div className="hidden md:block relative w-full h-full">
              <Image
                src="/icons/logo.png"
                alt="Zila Homes"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Mobile Logo */}
            <div className="block md:hidden relative w-full h-full">
              <Image
                src="/icons/mobile-logo.png"
                alt="Zila Homes"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

            if (item.hasDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className={cn(
                    "group relative flex items-center cursor-pointer gap-1.5 text-[15px] font-bold transition-all outline-none py-1",
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}>
                    {item.name}
                    <ChevronDown size={16} className={cn("opacity-60 transition-transform duration-300", isActive && "rotate-180")} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={15}
                    className="bg-[#EAEAEA] border-none text-neutral-1 rounded-[15px] p-1 min-w-[200px] shadow-2xl relative overflow-visible"
                  >
                    {/* Bubble Pointer */}
                    <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#EAEAEA] rotate-45" />

                    <div className="flex flex-col gap-1 relative z-10">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <DropdownMenuItem key={sub.name} className="focus:bg-transparent p-0">
                            <Link
                              href={sub.href}
                              className={cn(
                                "w-full px-4 py-2.5 text-sm font-bold rounded-sm transition-all flex items-center justify-between group/sub",
                                isSubActive ? "bg-black/5 text-neutral-1" : "hover:bg-black/5 text-neutral-2 hover:text-neutral-1"
                              )}
                            >
                              <span>{sub.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1 text-[15px] font-bold transition-all py-1",
                  isActive ? "text-white" : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Language Switcher in Primary Nav Row */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "group relative flex items-center cursor-pointer gap-2 text-[15px] font-bold transition-all outline-none py-1",
              "text-white/80 hover:text-white"
            )}>
              <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm">
                <Image src={selectedLang.flag} alt={selectedLang.name} fill className="object-cover" />
              </div>
              <span>{selectedLang.name}</span>
              <ChevronDown size={16} className="opacity-60 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={15}
              className="bg-[#EAEAEA] border-none text-neutral-1 rounded-[15px] p-1 min-w-[160px] shadow-2xl relative overflow-visible"
            >
              <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#EAEAEA] rotate-45" />
              <div className="flex flex-col gap-1 relative z-10">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.name}
                    className="focus:bg-transparent p-0"
                    onClick={() => handleLanguageChange(lang)}
                  >
                    <div
                      className={cn(
                        "w-full px-4 py-2.5 text-sm font-bold rounded-sm transition-all flex items-center justify-between cursor-pointer group/sub",
                        selectedLang.code === lang.code ? "bg-black/5 text-neutral-1" : "hover:bg-black/5 text-neutral-2 hover:text-neutral-1"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-6 h-4 overflow-hidden rounded-sm shrink-0">
                          <Image src={lang.flag} alt={lang.fullName} fill className="object-cover" />
                        </div>
                        <span>{lang.fullName}</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-5 ml-2">
          {/* User Icon Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 md:w-12 md:h-12 rounded-sm bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all shadow-lg shrink-0"
          >
            <Image src="/icons/user-lock.png" alt="User" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
          </motion.div>

          {/* Register Property Button */}
          <Button
            className="hidden sm:flex bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-9 md:h-12 px-2 md:px-4 rounded-sm cursor-pointer items-center gap-2 md:gap-3 shadow-xl transition-all border-none text-[13px] md:text-sm group shrink-0"
          >
            <Image src="/icons/house.png" alt="Register" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="hidden md:inline">Register Property</span>
            <span className="md:hidden">Register</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="flex lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-sm bg-white/10 backdrop-blur-md border border-white/10 items-center justify-center text-white/90 hover:bg-white/20 transition-all shadow-lg shrink-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} className="md:size-6" /> : <Menu size={22} className="md:size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-full left-4 right-4 mt-3 bg-[#1E2024]/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl lg:hidden p-5 flex flex-col max-h-[80vh] overflow-y-auto overflow-x-hidden z-40"
          >
            <div className="flex flex-col gap-3.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

                if (item.hasDropdown && item.subItems) {
                  const isDropdownOpen = openDropdown === item.name;
                  return (
                    <div key={item.name} className="flex flex-col">
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.name)}
                        className="flex justify-between items-center text-white/90 font-black py-3 px-5 rounded-xl bg-white/5 transition-all text-sm tracking-wide"
                      >
                        {item.name}
                        <ChevronDown size={18} className={cn("transition-transform duration-300 opacity-60", isDropdownOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/5 rounded-xl mt-2"
                          >
                            <div className="flex flex-col p-2 space-y-1">
                              {item.subItems.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => { setIsOpen(false); setOpenDropdown(null); }}
                                    className={cn(
                                      "py-3 px-5 text-[13px] font-bold transition-all rounded-lg",
                                      isSubActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
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
                    onClick={() => { setIsOpen(false); setOpenDropdown(null); }}
                    className={cn(
                      "py-3.5 px-6 text-sm font-black rounded-xl transition-all",
                      isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-white/60 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="mt-2 pt-4 border-t border-white/10 px-1">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 ml-1">Language</p>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        "flex items-center gap-2.5 py-3 px-4 rounded-xl border transition-all",
                        selectedLang.code === lang.code
                          ? "bg-primary/20 border-primary/40 text-white shadow-lg"
                          : "bg-white/5 border-white/5 text-white/60"
                      )}
                    >
                      <div className="relative w-7 h-5 overflow-hidden rounded-sm  shrink-0">
                        <Image src={lang.flag} alt={lang.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-black">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <Button
                className="mt-4 w-full bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-13 rounded-xl flex items-center justify-center gap-3 shadow-2xl border-none text-sm"
              >
                <Image src="/icons/house.png" alt="Register" width={22} height={22} className="w-5.5 h-5.5 object-contain" />
                <span>Register Property</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
