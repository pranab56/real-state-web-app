'use client';

import { useGetAllTransectionQuery } from '@/features/peyment/payementApi';
import { useGetMyReviewsQuery } from '@/features/review/reviewApi';
import { useGetMyReservationQuery } from '@/features/reservation/page';
import { baseURL } from '@/utils/BaseURL';
import { format } from 'date-fns';
import {
  CalendarCheck,
  CreditCard,
  MapPin,
  MessageSquare,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Hotel, Reservation, RootState, Review, Transaction } from '@/types';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=150&auto=format&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const getBookingStatusStyle = (status: string) => {
  switch (status) {
    case 'confirmed':  return 'bg-green-50 text-green-600';
    case 'pending':    return 'bg-orange-50 text-orange-500';
    case 'completed':  return 'bg-gray-100 text-gray-500';
    case 'cancelled':  return 'bg-red-50 text-red-500';
    default:           return 'bg-gray-100 text-gray-600';
  }
};

const getTxStatusStyle = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-50 text-green-600';
    case 'pending':   return 'bg-orange-50 text-orange-500';
    case 'failed':    return 'bg-red-50 text-red-500';
    default:          return 'bg-gray-100 text-gray-600';
  }
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';


export function Overview() {
  const userId = useSelector((state: RootState) => state.auth?.user?._id);

  const { data: bookingData, isLoading: bookingLoading } =
    useGetMyReservationQuery({ page: 1, userId }, { skip: !userId });

  const { data: txData, isLoading: txLoading } =
    useGetAllTransectionQuery({ page: 1 });

  const { data: reviewData, isLoading: reviewLoading } =
    useGetMyReviewsQuery({});

  const bookings: Reservation[] = bookingData?.data ?? [];
  const transactions: Transaction[] = txData?.data ?? [];
  const reviews: Review[] = reviewData?.data ?? [];

  const totalBookings      = bookingData?.pagination?.total ?? 0;
  const totalTransactions  = txData?.pagination?.total ?? 0;
  const totalReviews       = reviewData?.pagination?.total ?? 0;

  const recentBookings     = bookings.slice(0, 5);
  const recentTransactions = transactions.slice(0, 4);
  const recentReviews      = reviews.slice(0, 3);

  return (
    <div className="space-y-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#F1913D]/10 flex items-center justify-center flex-shrink-0">
            <CalendarCheck size={22} className="text-[#F1913D]" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Bookings</p>
            <h3 className="text-[28px] font-semibold text-[#2C2E33] leading-tight">
              {bookingLoading ? '—' : totalBookings}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <CreditCard size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Transactions</p>
            <h3 className="text-[28px] font-semibold text-[#2C2E33] leading-tight">
              {txLoading ? '—' : totalTransactions}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={22} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Reviews</p>
            <h3 className="text-[28px] font-semibold text-[#2C2E33] leading-tight">
              {reviewLoading ? '—' : totalReviews}
            </h3>
          </div>
        </div>

      </div>

      {/* ── Recent Bookings ── */}
      <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-semibold text-[#2C2E33]">Recent Bookings</h2>
          <Link href="/partner-dashboard/bookings" className="text-[13px] font-semibold text-[#F1913D] hover:underline">
            View All
          </Link>
        </div>

        {bookingLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentBookings.length === 0 ? (
          <p className="text-center text-[#6C757D] text-[14px] py-8">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
              <thead>
                <tr className="bg-[#F9F9F9]">
                  <th className="px-5 py-3 font-medium text-[#6C757D] rounded-l-lg">Property</th>
                  <th className="px-5 py-3 font-medium text-[#6C757D]">Check-In</th>
                  <th className="px-5 py-3 font-medium text-[#6C757D]">Check-Out</th>
                  <th className="px-5 py-3 font-medium text-[#6C757D]">Status</th>
                  <th className="px-5 py-3 font-medium text-[#6C757D] rounded-r-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-3" />
                {recentBookings.map((b: Reservation) => {
                  const address = [b.property?.address?.city, b.property?.address?.country].filter(Boolean).join(', ');
                  return (
                    <tr key={b._id} className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                            <Image src={getImg(b.property?.images?.[0])} alt={b.property?.title ?? ''} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-[#2C2E33] text-[13px] line-clamp-1">{b.property?.title ?? '—'}</p>
                            {address && <p className="text-[11px] text-[#6C757D]">{address}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[13px] font-medium text-[#2C2E33]">
                        {b.checkIn ? format(new Date(b.checkIn), 'MMM dd, yyyy') : '—'}
                      </td>
                      <td className="px-5 py-3 text-[13px] font-medium text-[#2C2E33]">
                        {b.checkOut ? format(new Date(b.checkOut), 'MMM dd, yyyy') : '—'}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getBookingStatusStyle(b.status)}`}>
                          {capitalize(b.status)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[13px] font-semibold text-[#2C2E33]">
                        {b.pricing?.currency} {b.pricing?.total?.toFixed(2) ?? '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Transactions + Reviews ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] font-semibold text-[#2C2E33]">Recent Transactions</h2>
            <Link href="/partner-dashboard/payments" className="text-[13px] font-semibold text-[#F1913D] hover:underline">
              View All
            </Link>
          </div>

          {txLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentTransactions.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No transactions yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentTransactions.map((tx: Transaction) => {
                const reservation = tx.reference?.id;
                const dateStr = tx.createdAt ? format(new Date(tx.createdAt), 'MMM dd, yyyy') : '—';
                return (
                  <div key={tx._id} className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F1913D]/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard size={15} className="text-[#F1913D]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#2C2E33]">
                          {reservation?.uid ?? `#${tx._id?.slice(-6).toUpperCase()}`}
                        </p>
                        <p className="text-[11px] text-[#6C757D] font-medium capitalize">{tx.paymentMethod} · {dateStr}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[13px] font-bold text-[#2C2E33]">{tx.currency} {tx.amount?.toFixed(2)}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getTxStatusStyle(tx.status)}`}>
                        {capitalize(tx.status)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] font-semibold text-[#2C2E33]">Recent Reviews</h2>
            <Link href="/partner-dashboard/reviews" className="text-[13px] font-semibold text-[#F1913D] hover:underline">
              View All
            </Link>
          </div>

          {reviewLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentReviews.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No reviews yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentReviews.map((review: Review) => {
                const customer  = review.customer ?? {};
                const property  = (review.property as Hotel) ?? {};
                const avatarUrl = getImg(customer.image);
                const initials  = getInitials(customer.firstName, customer.lastName);
                const location  = [property.address?.city, property.address?.country].filter(Boolean).join(', ');
                const dateStr   = review.createdAt ? format(new Date(review.createdAt), 'MMM dd, yyyy') : '';

                return (
                  <div key={review._id} className="py-4 flex gap-3">
                    {avatarUrl ? (
                      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image src={avatarUrl} alt={customer.firstName ?? ''} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#F1913D]/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#F1913D] font-bold text-[11px]">{initials}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[13px] font-semibold text-[#2C2E33]">{customer.firstName} {customer.lastName}</span>
                        <span className="text-[11px] text-[#6C757D] font-medium whitespace-nowrap">{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className={i < (review.rating ?? 0) ? 'fill-[#F1913D] text-[#F1913D]' : 'fill-gray-200 text-gray-200'} />
                        ))}
                      </div>
                      <p className="text-[12px] text-[#6C757D] font-medium line-clamp-2">{review.comment}</p>
                      {property.title && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <MapPin size={10} className="text-[#F1913D] shrink-0" />
                          <span className="text-[11px] text-[#6C757D] font-medium line-clamp-1">{property.title}{location ? ` · ${location}` : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>


    </div>
  );
}
