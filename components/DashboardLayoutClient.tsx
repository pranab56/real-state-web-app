'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

export function DashboardLayoutClient({
  sidebar,
  topbar,
  children
}: {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isCollapsed, setCollapsed } = useSidebar();

  // Mobile responsive helper
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed]);

  return (
    <TooltipProvider delay={200}>
      <div className="min-h-screen bg-[#F2F2F2]">
        {/* Mobile Overlay */}
        {!isCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
        {sidebar}
        <div
          className={cn(
            "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
            isCollapsed ? "pl-0 lg:pl-[96px]" : "pl-0 lg:pl-[280px]"
          )}
        >
          {topbar}
          <main className="flex-1 p-5 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
