'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';

export function Topbar() {
  return (
    <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-[#F2F2F2]">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle or just a decorative icon as per design */}
        <button className="bg-[#FFF4ED] p-2.5 rounded-lg text-[#F1913D] hover:bg-[#FFECD9] transition-colors">
          <Menu size={24} strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-[22px] font-bold text-[#2C2E33] leading-tight">
            Hotel Overview
          </h1>
          <p className="text-sm text-[#6C757D] font-medium mt-0.5">
            Property performance and real-time operations for today, Oct 24.
          </p>
        </div>
      </div>

      {/* Right side - Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right flex flex-col items-end">
          <span className="text-[15px] font-bold text-[#2C2E33] leading-none">Rasel Parvez</span>
          <span className="text-[13px] text-[#6C757D] font-medium leading-[1.2]">Hotel Partner</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#F2F2F2]">
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rasel"
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
