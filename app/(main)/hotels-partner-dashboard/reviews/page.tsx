'use client';

import { format } from 'date-fns';
import { MapPin, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import { useGetMyReviewsQuery } from '../../../../features/review/reviewApi';
import { Hotel, Review } from '@/types';


const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const getRatingLabel = (rating: number) => {
  if (rating >= 5) return { label: 'Excellent', color: 'text-green-600 bg-green-50' };
  if (rating >= 4) return { label: 'Very Good', color: 'text-blue-600 bg-blue-50' };
  if (rating >= 3) return { label: 'Good', color: 'text-yellow-600 bg-yellow-50' };
  if (rating >= 2) return { label: 'Fair', color: 'text-orange-600 bg-orange-50' };
  return { label: 'Poor', color: 'text-red-600 bg-red-50' };
};

export default function HotelsPartnerDashboardReviews() {
  const { data, isLoading } = useGetMyReviewsQuery({});

  const reviews: Review[] = data?.data ?? [];
  const pagination = data?.pagination;
  const total: number = pagination?.total ?? 0;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: Review) => sum + (r.rating ?? 0), 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F1913D]/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={22} className="text-[#F1913D]" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Reviews</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">{total}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
            <Star size={22} className="text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Average Rating</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {avgRating > 0 ? avgRating.toFixed(1) : '—'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Star size={22} className="text-green-600 fill-green-600" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">5-Star Reviews</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {reviews.filter((r: Review) => r.rating === 5).length}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 lg:p-8">
        <h1 className="text-[22px] font-medium text-[#2C2E33] mb-6">Guest Reviews</h1>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && reviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <MessageSquare size={40} className="text-gray-300" />
            <p className="text-[#6C757D] font-medium text-[15px]">No reviews yet</p>
            <p className="text-[#6C757D] text-[13px]">Reviews from your guests will appear here.</p>
          </div>
        )}

        <div className="divide-y divide-[#F2F2F2]">
          {reviews.map((review: Review) => {
            const customer = review.customer ?? {};
            const property = typeof review.property === 'object' ? review.property : ({} as Hotel);
            const avatarUrl = customer.image;
            const initials = getInitials(customer.firstName, customer.lastName);
            const location = [property.address?.city, property.address?.country].filter(Boolean).join(', ');
            const ratingInfo = getRatingLabel(review.rating ?? 0);
            const dateStr = review.createdAt
              ? format(new Date(review.createdAt), 'MMM dd, yyyy')
              : '';

            return (
              <div key={review._id} className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6">

                {/* Avatar */}
                <div className="flex-shrink-0">
                  {avatarUrl ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                      <Image src={avatarUrl} alt={customer.firstName ?? 'User'} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#F1913D]/15 flex items-center justify-center border border-[#F1913D]/20">
                      <span className="text-[#F1913D] font-bold text-[16px]">{initials}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[16px] font-semibold text-[#2C2E33]">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ratingInfo.color}`}>
                          {ratingInfo.label}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#6C757D] font-medium mt-0.5">{customer.email}</p>
                    </div>
                    <span className="text-[13px] text-[#6C757D] font-medium whitespace-nowrap">{dateStr}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < (review.rating ?? 0) ? 'fill-[#F1913D] text-[#F1913D]' : 'fill-gray-200 text-gray-200'}
                      />
                    ))}
                    <span className="text-[13px] text-[#6C757D] font-medium ml-1">{review.rating}/5</span>
                  </div>

                  {/* Comment */}
                  <p className="text-[14px] text-[#2C2E33] font-medium leading-relaxed mb-3">
                    {review.comment}
                  </p>

                  {/* Property info */}
                  {property.title && (
                    <div className="inline-flex items-center gap-2 bg-[#F9F9F9] border border-[#F2F2F2] rounded-md px-3 py-1.5">
                      <MapPin size={13} className="text-[#F1913D] shrink-0" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                        <span className="text-[12px] font-semibold text-[#2C2E33]">{property.title}</span>
                        {location && (
                          <span className="text-[12px] text-[#6C757D] font-medium sm:before:content-['·'] sm:before:mx-1">{location}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
