'use client';

import { useGetAllPropertyQuery } from '@/features/manageHotels/manageHotelsApi';
import { useGetAllTransectionQuery } from '@/features/peyment/payementApi';
import { useGetMyReservationQuery } from '@/features/reservation/page';
import { useGetMyWishlistsQuery } from '@/features/wishlists/wishlistsApi';
import { Reservation, RootState, Transaction, WishlistItem } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { format } from 'date-fns';
import {
  CalendarCheck,
  CreditCard,
  Heart,
  Hotel,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=150&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-[#2B9724]/10 text-[#2B9724]';
    case 'pending':
      return 'bg-[#F1913D]/10 text-[#F1913D]';
    case 'checked in':
      return 'bg-gray-100 text-[#2C2E33]';
    case 'cancelled':
      return 'bg-[#DC3545]/10 text-[#DC3545]';
    case 'completed':
      return 'bg-blue-50 text-blue-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};


export function HotelOverview() {
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const [activeTab, setActiveTab] = useState('All');

  // Aggregated Data Fetching
  const { data: propertyData, isLoading: propertyLoading } = useGetAllPropertyQuery({ userId }, { skip: !userId });
  const { data: bookingData, isLoading: bookingLoading } = useGetMyReservationQuery({ page: 1, userId }, { skip: !userId });
  const { data: txData, isLoading: txLoading } = useGetAllTransectionQuery({ page: 1 });
  const { data: wishlistData, isLoading: wishlistLoading } = useGetMyWishlistsQuery({});

  const bookings: Reservation[] = bookingData?.data ?? [];
  const transactions: Transaction[] = txData?.data ?? [];
  const wishlistItems: WishlistItem[] = wishlistData?.data ?? [];

  const totalHotels = propertyData?.pagination?.total ?? 0;
  const totalBookings = bookingData?.pagination?.total ?? 0;
  const totalWishlist = wishlistItems.filter(item => item.property?.structureType === 'hotel').length;
  const totalRevenue = transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0);

  const recentBookings = bookings.slice(0, 6);

  const filteredBookings = activeTab === 'All'
    ? recentBookings
    : recentBookings.filter(b => b.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-[#2B9724]/10 border border-[#2B9724]/30 flex items-center justify-center mb-6">
            <Hotel className="text-[#2B9724]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Hotels</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {propertyLoading ? '...' : totalHotels}
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-[#F1913D]/10 border border-[#F1913D]/30 flex items-center justify-center mb-6">
            <CalendarCheck className="text-[#F1913D]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Bookings</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {bookingLoading ? '...' : totalBookings}
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-red-50 border border-red-100 flex items-center justify-center mb-6">
            <Heart className="text-red-500" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Wishlist Count</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {wishlistLoading ? '...' : totalWishlist}
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
            <CreditCard className="text-blue-600" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Revenue</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none truncate">
            ETB {txLoading ? '...' : totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* ── Recent Bookings Table ── */}
      <div className="bg-white rounded-lg p-7 border border-[#F2F2F2] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-medium text-[#2C2E33]">Recent Bookings</h2>
          <Link href="/hotels-partner-dashboard/bookings" className="text-[14px] font-semibold text-[#F1913D] hover:underline">
            View All
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-[#F2F2F2] mb-6">
          {['All', 'Confirmed', 'Pending', 'Checked In', 'Cancelled'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-semibold text-[15px] pb-4 relative transition-colors cursor-pointer ${isActive ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'}`}
              >
                {tab}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1913D] rounded-t-full pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-[#F9F9F9]">
                <th className="px-5 py-4 font-medium text-[#6C757D] rounded-l-xl">Hotel / Property</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Room Type</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Dates</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Status</th>
                <th className="px-5 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-4" />
              {bookingLoading ? (
                <tr><td colSpan={5} className="py-10 text-center"><div className="w-6 h-6 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-[#6C757D] font-medium">No bookings found for this category.</td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[44px] h-[44px] rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
                          <Image src={getImg(b.property?.images?.[0])} alt={b.property?.title ?? ''} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2C2E33] text-[14px] line-clamp-1">
                            {b.property?.title}
                          </p>
                          <p className="text-[11px] text-[#6C757D] font-medium line-clamp-1">
                            {[b.property?.address?.street, b.property?.address?.city].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#2C2E33] font-semibold text-[13px] capitalize">{b.roomClass?.replace('_', ' ') || 'Standard'}</td>
                    <td className="px-5 py-4">
                      <p className="text-[#2C2E33] font-bold text-[13px]">
                        {b.checkIn ? format(new Date(b.checkIn), 'MMM dd') : ''} - {b.checkOut ? format(new Date(b.checkOut), 'MMM dd') : ''}
                      </p>
                      <p className="text-[11px] text-[#6C757D] font-medium">
                        {b.checkIn ? format(new Date(b.checkIn), 'yyyy') : ''}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-[#2C2E33] text-[15px]">
                      {b.pricing?.currency} {b.pricing?.total?.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
