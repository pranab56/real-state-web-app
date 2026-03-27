'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarCheck,
  Car,
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
  { name: 'Overview', href: '/transport-Partner-dashboard', icon: LayoutDashboard },
  {
    name: 'Manage Vehicles',
    href: '/transport-Partner-dashboard/manage-vehicles/',
    icon: Car,
    children: [
      { name: 'Transport List', href: '/transport-Partner-dashboard/manage-vehicles/list' },
      { name: 'Add Transport', href: '/transport-Partner-dashboard/manage-vehicles/add' },
    ],
  },
  { name: 'Bookings', href: '/transport-Partner-dashboard/bookings', icon: CalendarCheck },
  { name: 'Messages', href: '/transport-Partner-dashboard/messages', icon: MessageSquare },
  { name: 'Routes Management', href: '/transport-Partner-dashboard/routes-management', icon: Star },
  { name: 'Payments History', href: '/transport-Partner-dashboard/payments-history', icon: FileText },
  { name: 'Profile', href: '/transport-Partner-dashboard/profile', icon: User },

];

export function TransportSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setCollapsed } = useSidebar();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setCollapsed(true);
    }
  };

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
        <ul className="flex flex-col gap-1 relative">
          {sidebarItems.map((item) => {
            const isParentActive = pathname === item.href || (item.children && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.name} className="relative group px-3">
                <div className="relative">
                  {isParentActive && (
                    <motion.div
                      layoutId="transport-sidebar-active"
                      className="absolute inset-x-0 inset-y-0 bg-[#F1913D] rounded-lg shadow-lg shadow-[#F1913D]/20 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Tooltip>
                    <TooltipTrigger render={
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'flex items-center text-sm font-medium transition-colors relative z-10',
                          isCollapsed ? 'justify-center py-3' : 'gap-3 px-4 py-3',
                          isParentActive ? 'text-white' : 'text-white/60 hover:text-white'
                        )}
                      >
                        <Icon
                          size={isCollapsed ? 22 : 20}
                          className={cn('transition-all flex-shrink-0', isParentActive ? 'text-white' : '')}
                          strokeWidth={isParentActive ? 2.5 : 2}
                        />
                        {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
                      </Link>
                    } />
                    {isCollapsed && (
                      <TooltipContent side="right" sideOffset={20} className="bg-[#2C2E33] border border-white/10 text-white font-medium px-3 py-1.5 rounded-md text-xs shadow-xl z-50">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>

                {/* Children with Animation */}
                {!isCollapsed && (
                  <AnimatePresence>
                    {item.children && isParentActive && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="ml-4 flex flex-col gap-1 relative z-10 overflow-hidden"
                      >
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                onClick={handleLinkClick}
                                className={cn(
                                  'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                                  isChildActive ? 'text-white' : 'text-white/60 hover:text-white'
                                )}
                              >
                                <div className={cn(
                                  'w-2 h-2 rounded-full flex-shrink-0',
                                  isChildActive ? 'bg-white' : 'bg-[#F1913D]'
                                )} />
                                <span className="whitespace-nowrap overflow-hidden">{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
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
            <TooltipContent side="right" sideOffset={20} className="bg-[#2C2E33] border border-white/10 text-white font-medium px-3 py-1.5 rounded-md text-xs shadow-xl z-50">
              Logout
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </aside>
  );
}
