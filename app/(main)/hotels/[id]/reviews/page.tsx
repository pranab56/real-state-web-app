'use client';

import { useGetSingleListingQuery } from '@/features/listings/listingsApi';
import { useGetReviewsByPropertyQuery } from '@/features/review/reviewApi';
import { baseURL } from '@/utils/BaseURL';
import { ChevronLeft, ChevronRight, Loader2, MessageSquare, Star, User } from 'lucide-react';
import { Review } from '@/types';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const getImg = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const getRatingLabel = (rating: number) => {
  if (rating >= 5) return { label: 'Excellent', color: 'bg-green-50 text-green-600' };
  if (rating >= 4) return { label: 'Very Good', color: 'bg-blue-50 text-blue-600' };
  if (rating >= 3) return { label: 'Good', color: 'bg-yellow-50 text-yellow-600' };
  if (rating >= 2) return { label: 'Fair', color: 'bg-orange-50 text-orange-600' };
  return { label: 'Poor', color: 'bg-red-50 text-red-500' };
};

export default function HotelReviewsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data: reviewsData, isLoading } = useGetReviewsByPropertyQuery(
    { propertyId: id, page },
    { skip: !id }
  );
  const { data: propertyData } = useGetSingleListingQuery({ id }, { skip: !id });

  const reviews: Review[] = reviewsData?.data ?? [];
  const pagination = reviewsData?.pagination;
  const totalPage: number = pagination?.totalPage ?? 1;
  const total: number = pagination?.total ?? reviews.length;
  const hotel = propertyData?.data;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: Review) => sum + (r.rating ?? 0), 0) / reviews.length
      : hotel?.averageRating ?? 0;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-2 font-medium hover:text-primary transition-colors cursor-pointer group mb-8 w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronLeft size={18} />
          </div>
          <span className="text-sm">Back to Hotel</span>
        </button>

        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-1">
            {hotel?.title ? `Reviews for ${hotel.title}` : 'Guest Reviews'}
          </h1>
          {total > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(avgRating) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-1">
                {avgRating.toFixed(1)} average · {total} {total === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={40} className="animate-spin text-primary" />
          </div>
        )}

        {/* Empty */}
        {!isLoading && reviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare size={28} className="text-gray-300" />
            </div>
            <p className="text-neutral-1 font-semibold text-lg">No reviews yet</p>
            <p className="text-neutral-2 text-sm">Be the first to leave a review for this hotel.</p>
          </div>
        )}

        {/* Reviews list */}
        {!isLoading && reviews.length > 0 && (
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
            {reviews.map((review: Review, idx: number) => {
              const customer = review.customer ?? {};
              const avatarSrc = getImg(customer.image);
              const initials = getInitials(customer.firstName, customer.lastName);
              const displayName = `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim() || customer.email || 'Anonymous';
              const dateStr = review.createdAt
                ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : '';
              const ratingInfo = getRatingLabel(review.rating ?? 0);

              return (
                <div key={review._id ?? idx} className="flex gap-4 md:gap-6 p-6 md:p-8">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {avatarSrc ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                        <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {initials !== '?' ? (
                          <span className="text-primary font-bold text-sm">{initials}</span>
                        ) : (
                          <User size={18} className="text-primary" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-neutral-1">{displayName}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${ratingInfo.color}`}>
                          {ratingInfo.label}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-2 font-medium whitespace-nowrap">{dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < (review.rating ?? 0) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'}
                        />
                      ))}
                      <span className="text-xs text-neutral-2 font-medium ml-1">{review.rating}/5</span>
                    </div>
                    <p className="text-sm text-neutral-2 font-medium leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-neutral-2 hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    i + 1 === page
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border border-gray-200 text-neutral-2 hover:border-primary hover:text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPage, p + 1))}
              disabled={page === totalPage}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
