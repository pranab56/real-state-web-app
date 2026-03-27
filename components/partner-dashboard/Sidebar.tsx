'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Bed,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Star,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Overview', href: '/partner-dashboard', icon: LayoutDashboard },
  { name: 'Manage Hotels', href: '/partner-dashboard/hotels', icon: Bed },
  { name: 'Bookings', href: '/partner-dashboard/bookings', icon: CalendarCheck },
  { name: 'Message', href: '/partner-dashboard/messages', icon: MessageSquare },
  { name: 'Payment History', href: '/partner-dashboard/payments', icon: FileText },
  { name: 'Guest Reviews', href: '/partner-dashboard/reviews', icon: Star },
  { name: 'Profile', href: '/partner-dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  return (
    <aside className={cn(
      "bg-[#2C2E33] flex flex-col h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-50",
      isCollapsed ? "w-[96px]" : "w-[280px]"
    )}>
      {/* Logo Area */}
      <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "")}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 flex-shrink-0">
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
          {!isCollapsed && (
            <span className="text-xl font-black text-white tracking-tighter leading-none whitespace-nowrap overflow-hidden">
              ZilaHomes
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <ul className="flex flex-col gap-2 relative">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name} className={cn("relative group", isCollapsed ? "px-4" : "")}>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className={cn(
                      "absolute inset-y-0 bg-[#F1913D] shadow-lg shadow-[#F1913D]/20 z-0",
                      isCollapsed ? "inset-x-4 rounded-lg" : "inset-x-0"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Tooltip>
                  <TooltipTrigger render={
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center text-sm font-medium transition-colors relative z-10',
                        isCollapsed ? 'justify-center py-3' : 'gap-3 px-6 py-3',
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      )}
                    >
                      <Icon size={isCollapsed ? 22 : 18} className={cn('transition-all flex-shrink-0', isActive ? 'text-white' : '')} strokeWidth={isActive ? 2.5 : 2} />
                      {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
                    </Link>
                  } />
                  {isCollapsed && (
                    <TooltipContent side="right" sideOffset={20} className="bg-[#2C2E33] border border-white/10 text-white font-medium px-3 py-1.5 rounded-md text-xs shadow-xl">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className={cn("p-6 mt-auto", isCollapsed ? "flex justify-center px-4" : "")}>
        <Tooltip>
          <TooltipTrigger render={
            <button className={cn(
              "flex items-center gap-2 bg-[#DC3545] hover:bg-[#DC3545]/90 text-white py-2.5 rounded-lg transition-colors text-sm font-semibold justify-center cursor-pointer",
              isCollapsed ? "px-0 w-12 h-12 rounded-xl" : "px-4 w-full"
            )}>
              <LogOut size={18} strokeWidth={2.5} className="flex-shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          } />
          {isCollapsed && (
            <TooltipContent side="right" sideOffset={20} className="bg-[#2C2E33] border border-white/10 text-white font-medium px-3 py-1.5 rounded-md text-xs shadow-xl">
              Logout
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </aside>
  );
}
