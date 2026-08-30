'use client';

import { BookingDetailsModal } from '@/components/shared/booking-details-modal';
import { Reservation, RootState } from "@/types";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMyReservationQuery } from '../../../../features/reservation/page';

const ADMIN_NEXT_STATUSES: Record<string, { value: string; label: string }[]> = {
  confirmed: [
    { value: 'completed', label: 'Completed' },
  ],
};




const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-[#F2F2F2] text-[#6C757D]';
    case 'confirmed': return 'bg-green-100 text-green-700';
    case 'cancelled': return 'bg-[#DC3545]/10 text-[#DC3545]';
    case 'pending': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';


export default function PartnerDashboardBookings() {

  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Reservation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { data, isLoading } = useGetMyReservationQuery({ page, userId }, { skip: !userId });

  const handleViewBooking = (booking: Reservation) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };


  const allBookings: Reservation[] = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPage: number = pagination?.totalPage ?? 1;
  const total: number = pagination?.total ?? 0;
  const limit: number = pagination?.limit ?? 10;

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-[24px] font-medium text-[#2C2E33]">Recent Bookings</h1>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9]">
              <th className="px-6 py-4 font-medium text-[#6C757D] rounded-l-xl">Property</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Guest</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Check-In</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Check-Out</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Amount</th>
              <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-xl text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-4" />
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  <Loader2 size={28} className="animate-spin text-[#F1913D] mx-auto" />
                </td>
              </tr>
            )}
            {!isLoading && allBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-[#6C757D]">No bookings found.</td>
              </tr>
            )}
            {!isLoading && allBookings.map((booking: Reservation) => {
              const guestStr = `${booking.guests?.adults ?? 0} Adults, ${booking.guests?.children ?? 0} Children`;
              const addressStr = [booking.property?.address?.city, booking.property?.address?.country].filter(Boolean).join(', ');

              return (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0">
                  {/* Property */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-[50px] h-[50px] flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative">
                        <Image src={booking.property?.images?.[0] || ''} alt={booking.property?.title ?? ''} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-medium text-[#2C2E33] text-[15px]">{booking.property?.title}</span>
                        <span className="text-[#6C757D] text-[13px]">{addressStr || capitalize(booking.roomClass)}</span>
                      </div>
                    </div>
                  </td>

                  {/* Guest */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">{guestStr}</td>

                  {/* Check-In */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                    {booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd, yyyy') : '—'}
                  </td>

                  {/* Check-Out */}
                  <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                    {booking.checkOut ? format(new Date(booking.checkOut), 'MMM dd, yyyy') : '—'}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${getStatusStyle(booking.status)}`}>
                      {capitalize(booking.status)}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-medium text-[#2C2E33] text-[15px]">
                    {booking.pricing?.currency} {booking.pricing?.total?.toLocaleString()}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewBooking(booking)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F1913D]/10 text-[#F1913D] hover:bg-[#F1913D] hover:text-white transition-colors cursor-pointer"
                      title="View booking details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 pb-2">
        <p className="text-[#6C757D] text-[15px] text-center md:text-left">
          Showing <span className="font-medium text-[#2C2E33]">{showingFrom}-{showingTo} of {total}</span> entries
        </p>

        {totalPage > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[13px] sm:text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">Previous</span>
            </button>

            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 flex cursor-pointer items-center justify-center font-medium rounded-lg shadow-sm transition-colors ${page === i + 1 ? 'bg-[#F1913D] text-white' : 'bg-white border border-gray-100 text-[#2C2E33] hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPage, p + 1))}
              disabled={page === totalPage}
              className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[13px] sm:text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        open={modalOpen}
        onOpenChangeAction={setModalOpen}
        allowedNextStatuses={ADMIN_NEXT_STATUSES[selectedBooking?.status ?? ''] ?? []}
      />
    </div>
  );
}
