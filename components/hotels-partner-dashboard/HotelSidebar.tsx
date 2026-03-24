'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  FileText,
  Hotel,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Star,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Overview', href: '/hotels-partner-dashboard', icon: LayoutDashboard },
  { name: 'Manage Hotels', href: '/hotels-partner-dashboard/manage-hotels', icon: Hotel },
  { name: 'Bookings', href: '/hotels-partner-dashboard/bookings', icon: CalendarCheck },
  { name: 'Message', href: '/hotels-partner-dashboard/messages', icon: MessageSquare },
  { name: 'Payment History', href: '/hotels-partner-dashboard/payments', icon: FileText },
  { name: 'Guest Reviews', href: '/hotels-partner-dashboard/reviews', icon: Star },
  { name: 'Profile', href: '/hotels-partner-dashboard/profile', icon: User },
];

export function HotelSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#2C2E33] flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo Area */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path
                d="M20 50L50 25L80 50"
                stroke="#F1913D"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 45L70 45L30 85L70 85"
                stroke="#F1913D"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M45 55L55 65L85 35"
                stroke="#2B9724"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-black text-white tracking-tighter leading-none">
            ZilaHomes
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="flex flex-col gap-2 relative">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name} className="relative group">
                {isActive && (
                  <motion.div
                    layoutId="hotel-sidebar-active"
                    className="absolute inset-x-0 inset-y-0 bg-[#F1913D] shadow-lg shadow-[#F1913D]/20 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative z-10',
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  <Icon
                    size={18}
                    className={cn('transition-all', isActive ? 'text-white' : '')}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-6 mt-auto">
        <button className="flex items-center gap-2 bg-[#DC3545] hover:bg-[#DC3545]/90 text-white px-4 py-2.5 rounded-lg w-full transition-colors text-sm font-semibold justify-center">
          <LogOut size={18} strokeWidth={2.5} />
          Logout
        </button>
      </div>
    </aside>
  );
}
