'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from '@/features/auth/authSlice';
import { useGetAllNotificationQuery } from '@/features/notification/notificationApi';
import { useGetProfileQuery } from '@/features/profile/profileApi';
import { cn } from '@/lib/utils';
import { RootState } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronDown, LogOut, Menu, User, UserCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { changeGoogleLanguage } from '@/components/ui/google-translate';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';

const PROFILE_ROUTE: Record<string, string> = {
  customer: '/partner-dashboard',
  host: '/hotels-partner-dashboard',
};

const getImg = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  

  const token = useSelector((state: RootState) => state.auth?.token);
  const user = useSelector((state: RootState) => state.auth?.user);
  const isLoggedIn = !!token;

  const { data: notificationData } = useGetAllNotificationQuery({ page: 1 }, { skip: !isLoggedIn });
  const unreadCount: number = notificationData?.data?.unreadCount ?? 0;

  const { data: profileData } = useGetProfileQuery({}, { skip: !isLoggedIn });
  const profile = profileData?.data;
  const firstName = profile?.firstName ?? user?.firstName ?? '';
  const lastName = profile?.lastName ?? user?.lastName ?? '';
  const displayName = `${firstName} ${lastName}`.trim() || profile?.email || user?.email || 'My Account';
  const displayRole = profile?.role ?? user?.role ?? '';
  const avatarSrc = getImg(profile?.image);
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || 'U';

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Properties',
      href: '#',
      hasDropdown: true,
      subItems: [
        { name: 'Real Estate', href: '/properties' },
        { name: 'Hotels', href: '/hotels' },
        { name: 'Transportation', href: '/transportation' },
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'POA', href: '/poa' },
    {
      name: 'Company',
      href: '#',
      hasDropdown: true,
      subItems: [
        { name: 'About Us', href: '/about' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  const languages = [
    { name: 'EN', fullName: 'English', flag: '/icons/flags/en.png', code: 'en' },
    { name: 'AM', fullName: 'አማርኛ', flag: '/icons/flags/am.png', code: 'am' },
    { name: 'AR', fullName: 'العربية', flag: '/icons/flags/ar.png', code: 'ar' },
    { name: 'RU', fullName: 'Русский', flag: '/icons/flags/ru.png', code: 'ru' },
  ];

  const [selectedLangCode, setSelectedLangCode] = useState('en');
  const selectedLang = languages.find(l => l.code === selectedLangCode) || languages[0];

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLangCode(lang.code);
    changeGoogleLanguage(lang.code);
  };

  const showBackground = !isHome || scrolled || isOpen;

  const isDashboardRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/partner-dashboard') ||
    pathname.startsWith('/hotels-partner-dashboard');

  if (isDashboardRoute) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-6',
        showBackground ? 'bg-[#1E2024]/80 backdrop-blur-md py-4 md:py-5 shadow-xl' : 'bg-transparent py-4 md:py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between relative z-10 w-full overflow-hidden">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-12 md:h-14 w-32 sm:w-36 md:w-56">
            <Image src="/icons/logoOne.png" alt="Zila Homes" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

            if (item.hasDropdown && item.subItems) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className={cn(
                    "group relative flex items-center cursor-pointer gap-1.5 text-[15px] font-medium transition-all outline-none py-1",
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
                    <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#EAEAEA] rotate-45" />
                    <div className="flex flex-col gap-1 relative z-10">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <DropdownMenuItem key={sub.name} className="focus:bg-transparent p-0">
                            <Link
                              href={sub.href}
                              className={cn(
                                "w-full px-4 py-2.5 text-sm font-medium rounded-sm transition-all flex items-center justify-between group/sub",
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
                  "relative flex items-center gap-1 text-[15px] font-medium transition-all py-1",
                  isActive ? "text-white" : "text-white/80 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger className="group relative flex items-center cursor-pointer gap-2 text-[15px] font-medium transition-all outline-none py-1 text-white/80 hover:text-white">
              <div className="relative w-6 h-4 overflow-hidden rounded-sm">
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
                  <DropdownMenuItem key={lang.name} className="focus:bg-transparent p-0" onClick={() => handleLanguageChange(lang)}>
                    <div className={cn(
                      "w-full px-4 py-2.5 text-sm font-medium rounded-sm transition-all flex items-center justify-between cursor-pointer",
                      selectedLang.code === lang.code ? "bg-black/5 text-neutral-1" : "hover:bg-black/5 text-neutral-2 hover:text-neutral-1"
                    )}>
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
        <div className="flex items-center gap-2 md:gap-3 ml-2">
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              <Link href="/notification">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-9 h-9 md:w-10 md:h-10 rounded-sm bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all shadow-lg shrink-0"
                >
                  <Bell size={18} className="text-white/80 md:w-5 md:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#1E2024]" />
                  )}
                </motion.div>
              </Link>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-9 h-9 md:w-10 md:h-10 rounded-sm bg-primary/80 backdrop-blur-md border border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary transition-all shadow-lg shrink-0 outline-none overflow-hidden relative">
                  {avatarSrc ? (
                    <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
                  ) : (
                    <UserCircle size={20} className="text-white md:w-6 md:h-6" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={15}
                  className="bg-[#EAEAEA] border-none text-neutral-1 rounded-[15px] p-1 min-w-[220px] shadow-2xl relative overflow-visible"
                >
                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#EAEAEA] rotate-45" />
                  <div className="flex items-center gap-3 px-3 pt-2.5 pb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary/15 flex items-center justify-center shrink-0">
                      {avatarSrc ? (
                        <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
                      ) : (
                        <span className="text-primary font-bold text-sm">{initials}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-1 truncate">{displayName}</p>
                      {displayRole && <p className="text-xs text-neutral-2 capitalize">{displayRole}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-black/10 my-0.5" />
                  <div className="flex flex-col gap-1 relative z-10">
                    <DropdownMenuItem className="focus:bg-transparent p-0">
                      <Link
                        href={(user?.role && PROFILE_ROUTE[user.role]) || '/profile'}
                        className="w-full px-4 py-2.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2 hover:bg-black/5 text-neutral-2 hover:text-neutral-1"
                      >
                        <User size={15} />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-black/10 my-0.5" />
                    <DropdownMenuItem className="focus:bg-transparent p-0">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2 hover:bg-red-50 text-red-500 cursor-pointer"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            /* ── Guest state ── */
            <>
              {/* Login Button */}
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 md:w-12 md:h-12 rounded-sm bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all shadow-lg shrink-0"
                >
                  <Image src="/icons/user-lock.png" alt="Login" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                </motion.div>
              </Link>

              {/* Register Property */}
              <Link href="/register">
                <Button className="hidden sm:flex bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-9 md:h-12 px-2 md:px-4 rounded-sm cursor-pointer items-center gap-2 md:gap-3 shadow-xl transition-all border-none text-[13px] md:text-sm group shrink-0">
                  <Image src="/icons/house.png" alt="Register" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  <span className="hidden md:inline">Register Property</span>
                  <span className="md:hidden">Register</span>
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="flex lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-sm bg-white/10 backdrop-blur-md border border-white/10 items-center cursor-pointer justify-center text-white/90 hover:bg-white/20 transition-all shadow-lg shrink-0"
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
                                      "py-3 px-5 text-[13px] font-medium transition-all rounded-lg",
                                      isSubActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                                    )}
                                  >
                                    {sub.name}
                                  </Link>
                                );
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

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center gap-3 py-2 px-5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center shrink-0">
                      {avatarSrc ? (
                        <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
                      ) : (
                        <span className="text-primary font-bold text-xs">{initials}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                      {displayRole && <p className="text-xs text-white/50 capitalize">{displayRole}</p>}
                    </div>
                  </div>
                  <Link
                    href={(user?.role && PROFILE_ROUTE[user.role]) || '/profile'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-3 px-5 rounded-xl bg-white/5 text-white/80 font-medium text-sm hover:text-white transition-all"
                  >
                    <UserCircle size={18} />
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center gap-3 py-3 px-5 rounded-xl bg-red-500/10 text-red-400 font-medium text-sm hover:bg-red-500/20 transition-all"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white font-black h-12 rounded-xl border border-white/10 text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-12 rounded-xl flex items-center justify-center gap-3 shadow-2xl border-none text-sm">
                      <Image src="/icons/house.png" alt="Register" width={22} height={22} className="w-5 h-5 object-contain" />
                      Register Property
                    </Button>
                  </Link>
                </div>
              )}

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
                      <div className="relative w-7 h-5 overflow-hidden rounded-sm shrink-0">
                        <Image src={lang.flag} alt={lang.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-black">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
