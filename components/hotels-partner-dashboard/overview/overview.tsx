'use client';

import { useGetAllPropertyQuery } from '@/features/manageHotels/manageHotelsApi';
import { useGetAllTransectionQuery } from '@/features/peyment/payementApi';
import { useGetMyReservationQuery } from '@/features/reservation/page';
import { useGetMyReviewsQuery } from '@/features/review/reviewApi';
import { useGetMyWishlistsQuery } from '@/features/wishlists/wishlistsApi';
import { Hotel, Reservation, Review, RootState, Transaction, WishlistItem } from '@/types';
import { format } from 'date-fns';
import {
  CalendarCheck,
  CreditCard,
  Heart,
  Hotel as HotelIcon,
  MapPin,
  Star
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

const getBookingStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'bg-green-50 text-green-600';
    case 'pending': return 'bg-orange-50 text-orange-500';
    case 'checked in': return 'bg-gray-100 text-[#2C2E33]';
    case 'completed': return 'bg-blue-50 text-blue-600';
    case 'cancelled': return 'bg-red-50 text-red-500';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getTxStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed': return 'bg-green-50 text-green-600';
    case 'pending': return 'bg-orange-50 text-orange-500';
    case 'failed': return 'bg-red-50 text-red-500';
    case 'refunded': return 'bg-blue-50 text-blue-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const Spinner = () => (
  <div className="flex justify-center py-8">
    <div className="w-6 h-6 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
  </div>
);

const SectionHeader = ({ title, viewAllHref }: { title: string; viewAllHref?: string }) => (
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-[18px] font-semibold text-[#2C2E33]">{title}</h2>
    {viewAllHref && (
      <Link href={viewAllHref} className="text-[13px] font-semibold text-[#F1913D] hover:underline">
        View All
      </Link>
    )}
  </div>
);

export function HotelOverview() {
  const userId = useSelector((state: RootState) => state.auth?.user?._id);

  const { data: propertyData, isLoading: propertyLoading } = useGetAllPropertyQuery({ userId, page: 1 }, { skip: !userId });
  const { data: bookingData, isLoading: bookingLoading } = useGetMyReservationQuery({ page: 1, userId }, { skip: !userId });
  const { data: txData, isLoading: txLoading } = useGetAllTransectionQuery({ page: 1 });
  const { data: wishlistData, isLoading: wishlistLoading } = useGetMyWishlistsQuery({});
  const { data: reviewData, isLoading: reviewLoading } = useGetMyReviewsQuery({});

  const hotels: Hotel[] = propertyData?.data ?? [];
  const bookings: Reservation[] = bookingData?.data ?? [];
  const transactions: Transaction[] = txData?.data ?? [];
  const wishlistItems: WishlistItem[] = wishlistData?.data ?? [];
  const reviews: Review[] = reviewData?.data ?? [];

  const totalHotels = propertyData?.pagination?.total ?? 0;
  const activeHotels = hotels.filter((h) => h.status === 'active').length;
  const totalBookings = bookingData?.pagination?.total ?? 0;
  const totalWishlist = wishlistItems.filter((item) => item.property?.structureType === 'hotel').length;
  const totalRevenue = transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0);

  const recentHotels = hotels.slice(0, 4);
  const recentBookings = bookings.slice(0, 5);
  const recentTransactions = transactions.slice(0, 4);
  const recentReviews = reviews.slice(0, 3);
  const recentWishlist = wishlistItems.slice(0, 4);


  return (
    <div className="space-y-6">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-[#2B9724]/10 border border-[#2B9724]/30 flex items-center justify-center mb-6">
            <HotelIcon className="text-[#2B9724]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Hotels</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {propertyLoading ? '—' : totalHotels}
          </h3>
          <p className="text-[12px] text-[#6C757D] font-medium mt-2">{activeHotels} active</p>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-[#F1913D]/10 border border-[#F1913D]/30 flex items-center justify-center mb-6">
            <CalendarCheck className="text-[#F1913D]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Bookings</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {bookingLoading ? '—' : totalBookings}
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-red-50 border border-red-100 flex items-center justify-center mb-6">
            <Heart className="text-red-500" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Wishlist Count</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none">
            {wishlistLoading ? '—' : totalWishlist}
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm">
          <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
            <CreditCard className="text-blue-600" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-[#6C757D] text-[14px] font-medium mb-1">Total Revenue</p>
          <h3 className="text-[28px] font-medium text-[#2C2E33] leading-none truncate">
            ETB {txLoading ? '—' : totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* ── Recent Hotels ── */}
      <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
        <SectionHeader title="Your Hotels" viewAllHref="/hotels-partner-dashboard/manage-hotels/list" />

        {propertyLoading ? (
          <Spinner />
        ) : recentHotels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-[#6C757D] text-[14px]">You haven&apos;t added any hotels yet.</p>
            <Link
              href="/hotels-partner-dashboard/manage-hotels/add"
              className="text-[13px] text-[#F1913D] border border-[#F1913D]/30 px-4 py-1.5 rounded-full hover:bg-[#F1913D]/5 transition-colors"
            >
              Add your first hotel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentHotels.map((hotel) => {
              const address = [hotel.address?.city, hotel.address?.country].filter(Boolean).join(', ');
              return (
                <Link
                  key={hotel._id}
                  href={`/hotels-partner-dashboard/manage-hotels/add?edit=${hotel._id}`}
                  className="group rounded-lg overflow-hidden border border-[#F2F2F2] hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={hotel.images?.[0] || ""}
                      alt={hotel.title ?? 'Hotel'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full ${hotel.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                      {hotel.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[14px] font-semibold text-[#2C2E33] group-hover:text-[#F1913D] transition-colors line-clamp-1 mb-1">
                      {hotel.title}
                    </h3>
                    {address && (
                      <div className="flex items-center gap-1.5 text-[#6C757D] mb-2">
                        <MapPin size={12} className="flex-shrink-0" />
                        <span className="text-[11px] font-medium line-clamp-1">{address}</span>
                      </div>
                    )}
                    <p className="text-[14px] font-bold text-[#2C2E33]">
                      {hotel.currency} {hotel.price?.toLocaleString()}
                      <span className="text-[11px] text-[#6C757D] font-medium"> / night</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Transactions + Reviews ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
          <SectionHeader title="Recent Transactions" viewAllHref="/hotels-partner-dashboard/payments" />

          {txLoading ? (
            <Spinner />
          ) : recentTransactions.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No transactions yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentTransactions.map((tx) => {
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
          <SectionHeader title="Recent Reviews" viewAllHref="/hotels-partner-dashboard/reviews" />

          {reviewLoading ? (
            <Spinner />
          ) : recentReviews.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No reviews yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentReviews.map((review) => {
                const customer = review.customer ?? {};
                const property = (review.property as Hotel) ?? {};
                const reviewAvatar = customer.image || "";
                const reviewInitials = getInitials(customer.firstName, customer.lastName);
                const location = [property.address?.city, property.address?.country].filter(Boolean).join(', ');
                const dateStr = review.createdAt ? format(new Date(review.createdAt), 'MMM dd, yyyy') : '';

                return (
                  <div key={review._id} className="py-4 flex gap-3">
                    {customer.image ? (
                      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image src={reviewAvatar} alt={customer.firstName ?? ''} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#F1913D]/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#F1913D] font-bold text-[11px]">{reviewInitials}</span>
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

      {/* ── Recent Bookings + Wishlist ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
          <SectionHeader title="Recent Bookings" />

          {bookingLoading ? (
            <Spinner />
          ) : recentBookings.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No bookings yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentBookings.map((b) => {
                const address = [b.property?.address?.city, b.property?.address?.country].filter(Boolean).join(', ');
                return (
                  <div key={b._id} className="flex items-center gap-3 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                      <Image src={b.property?.images?.[0] || ""} alt={b.property?.title ?? ''} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2C2E33] text-[13px] line-clamp-1">{b.property?.title ?? '—'}</p>
                      <p className="text-[11px] text-[#6C757D]">
                        {b.checkIn ? format(new Date(b.checkIn), 'MMM dd') : '—'} – {b.checkOut ? format(new Date(b.checkOut), 'MMM dd, yyyy') : '—'}
                        {address ? ` · ${address}` : ''}
                      </p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${getBookingStatusStyle(b.status)}`}>
                      {capitalize(b.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Wishlist */}
        <div className="bg-white rounded-lg p-6 border border-[#F2F2F2] shadow-sm">
          <SectionHeader title="Recent Wishlist" viewAllHref="/hotels-partner-dashboard/wishlist" />

          {wishlistLoading ? (
            <Spinner />
          ) : recentWishlist.length === 0 ? (
            <p className="text-center text-[#6C757D] text-[14px] py-8">No saved properties yet.</p>
          ) : (
            <div className="divide-y divide-[#F2F2F2]">
              {recentWishlist.map((item) => {
                const property = item.property ?? {};
                const address = [property.address?.city, property.address?.country].filter(Boolean).join(', ');
                return (
                  <div key={item._id} className="flex items-center gap-3 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                      <Image src={property.images?.[0] || ""} alt={property.title ?? ''} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2C2E33] text-[13px] line-clamp-1">{property.title ?? '—'}</p>
                      {address && <p className="text-[11px] text-[#6C757D] line-clamp-1">{address}</p>}
                    </div>
                    <span className="shrink-0 text-[12px] font-semibold text-[#2C2E33]">
                      {property.currency} {property.price?.toLocaleString()}
                    </span>
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
