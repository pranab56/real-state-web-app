'use client';

import { useGetMyKYCQuery, useGetProfileQuery } from '@/features/profile/profileApi';
import { useSidebar } from '@/hooks/use-sidebar';
import { baseURL } from '@/utils/BaseURL';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RootState } from '@/types';
import { useSelector } from 'react-redux';

const ROLE_LABELS: Record<string, string> = { host: 'Hotel Partner', customer: 'Customer' };

const getImg = (path?: string) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${baseURL}${path}`;
};

export function Topbar() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const user = useSelector((state: RootState) => state.auth?.user);
  const { data: profileData } = useGetProfileQuery({});
  const { data: kycData } = useGetMyKYCQuery({});
  const profile = profileData?.data;
  const isVerified = kycData?.data?.verification?.status === 'verified';

  const firstName = profile?.firstName ?? user?.firstName ?? '';
  const lastName = profile?.lastName ?? user?.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim() || profile?.email || user?.email || 'My Account';
  const rawRole = (profile?.role ?? user?.role ?? '').toLowerCase();
  const roleLabel = ROLE_LABELS[rawRole] ?? profile?.role ?? user?.role ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || '?';
  const avatarSrc = getImg(profile?.image);

  return (
    <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-[#F2F2F2] sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile menu toggle */}
        <button onClick={toggleSidebar} className="bg-[#FFF4ED] p-2 cursor-pointer md:p-2.5 rounded-lg text-[#F1913D] hover:bg-[#FFECD9] transition-colors">
          <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-lg md:text-[22px] font-medium text-[#2C2E33] leading-tight truncate max-w-[150px] sm:max-w-none">
            Dashboard
          </h1>
        </div>
      </div>

      {/* Right side - Profile */}
      <div onClick={() => router.push('/partner-dashboard/profile')} className="flex items-center gap-3 cursor-pointer">
        <div className="text-right hidden sm:flex flex-col items-end gap-0.5">
          <span className="text-[15px] font-medium text-[#2C2E33] leading-none">{fullName}</span>
          <span className="text-[13px] text-[#6C757D] font-medium leading-[1.2]">{roleLabel}</span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {isVerified ? 'Verified' : 'Unverified'}
          </span>
        </div>
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#F2F2F2] flex items-center justify-center relative shrink-0">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={fullName} fill className="object-cover" />
          ) : (
            <span className="text-primary font-bold text-sm">{initials}</span>
          )}
        </div>
      </div>
    </header>
  );
}
