'use client';

import { useSidebar } from '@/hooks/use-sidebar';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Topbar() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-[#F2F2F2] sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile menu toggle */}
        <button onClick={toggleSidebar} className="bg-[#FFF4ED] p-2 md:p-2.5 rounded-lg text-[#F1913D] hover:bg-[#FFECD9] transition-colors">
          <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-lg md:text-[22px] font-bold text-[#2C2E33] leading-tight truncate max-w-[150px] sm:max-w-none">
            Partner Dashboard
          </h1>
        </div>
      </div>

      {/* Right side - Profile */}
      <div onClick={() => router.push('/partner-dashboard/profile')} className="flex items-center gap-3 cursor-pointer">
        <div className="text-right hidden sm:flex flex-col items-end">
          <span className="text-[15px] font-bold text-[#2C2E33] leading-none">Rasel Parvez</span>
          <span className="text-[13px] text-[#6C757D] font-medium leading-[1.2]">Hotel Partner</span>
        </div>
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#F2F2F2] shrink-0">
          <Image
            src="https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg"
            alt="Profile Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
