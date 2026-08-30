'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { useCreateWishlistToggleMutation, useGetMyWishlistsQuery } from '@/features/wishlists/wishlistsApi';
import { format } from 'date-fns';
import { Building2, Calendar, Heart, Loader2, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApiError, Hotel, WishlistItem } from '@/types';




const getDetailHref = (property: Hotel) => {
  if (property.structureType === 'hotel' || property.structureType === 'resort') return `/hotels/${property._id}`;
  return `/properties/${property._id}`;
};

export default function WishlistPage() {
  const { data, isLoading } = useGetMyWishlistsQuery({});
  const [toggleWishlist] = useCreateWishlistToggleMutation();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const wishlists: WishlistItem[] = data?.data ?? [];
  const total: number = data?.pagination?.total ?? 0;

  const handleRemove = async (propertyId: string) => {
    setRemovingId(propertyId);
    try {
      const res = await toggleWishlist({ property: propertyId }).unwrap();
      toast.success(res.message ?? 'Removed from wishlist');
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to remove from wishlist');
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <Heart size={22} className="text-red-500 fill-red-500" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Saved Properties</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">{total}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F1913D]/10 flex items-center justify-center flex-shrink-0">
            <Building2 size={22} className="text-[#F1913D]" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Properties</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {wishlists.filter((w: WishlistItem) => w.property?.structureType !== 'hotel').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Building2 size={22} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Hotels</p>
            <p className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {wishlists.filter((w: WishlistItem) => w.property?.structureType === 'hotel').length}
            </p>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 lg:p-8">
        <h1 className="text-[22px] font-medium text-[#2C2E33] mb-6">My Wishlist</h1>

        {wishlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={32} className="text-red-300" />
            </div>
            <p className="text-[#2C2E33] font-semibold text-[16px]">No saved properties yet</p>
            <p className="text-[#6C757D] text-[13px] max-w-xs">
              Properties you heart while browsing will be saved here for easy access.
            </p>
            <Link
              href="/properties"
              className="mt-2 px-6 py-2.5 bg-[#F1913D] text-white rounded-lg text-[13px] font-medium hover:bg-[#F1913D]/90 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {wishlists.map((item: WishlistItem) => {
              const property = item.property ?? {};
              const addressStr = [
                property.address?.street,
                property.address?.city,
                property.address?.country,
              ].filter(Boolean).join(', ');
              const savedDate = item.createdAt
                ? format(new Date(item.createdAt), 'MMM dd, yyyy')
                : '';
              const img = property.images?.[0];
              const isBeingRemoved = removingId === property._id;

              return (
                <div
                  key={item._id}
                  className="border border-[#F2F2F2] rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img || ""}
                      alt={property.title ?? 'Property'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {property.isVerified && (
                        <span className="bg-[#2B9724] text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                      {property.structureType && (
                        <span className="bg-[#F1913D] text-white text-[10px] font-medium px-2.5 py-1 rounded-full capitalize">
                          {property.structureType}
                        </span>
                      )}
                    </div>

                    {/* Remove (heart) button */}
                    <button
                      onClick={() => handleRemove(property._id || '')}
                      disabled={isBeingRemoved}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer shadow-sm disabled:opacity-70"
                      title="Remove from wishlist"
                    >
                      {isBeingRemoved ? (
                        <Loader2 size={15} className="animate-spin text-red-400" />
                      ) : (
                        <Heart size={15} className="text-red-500 fill-red-500" />
                      )}
                    </button>
                  </div>

                  {/* Content */}
                  <Link href={getDetailHref(property)} className="block">
                    <div className="p-4 space-y-2.5">

                      {/* Title + Status */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[15px] font-semibold text-[#2C2E33] line-clamp-1 flex-1">
                          {property.title}
                        </h3>
                        <span
                          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${property.status === 'active'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-gray-100 text-gray-500'
                            }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <p className="text-[20px] font-bold text-[#F1913D]">
                          {property.currency} {property.price?.toLocaleString()}
                        </p>
                        <PriceConvertButton price={property.price} currency={property.currency} />
                      </div>

                      {/* Address */}
                      {addressStr && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="shrink-0 text-[#F1913D]" />
                          <span className="text-[12px] font-medium text-[#6C757D] line-clamp-1">{addressStr}</span>
                        </div>
                      )}

                      {/* Amenities */}
                      {property.amenities && property.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {property.amenities.slice(0, 3).map((amenity: string) => (
                            <span
                              key={amenity}
                              className="text-[10px] font-medium text-[#6C757D] bg-[#F5F5F5] px-2 py-0.5 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                          {property.amenities.length > 3 && (
                            <span className="text-[10px] font-medium text-[#6C757D] bg-[#F5F5F5] px-2 py-0.5 rounded">
                              +{property.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Saved date */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-[#F2F2F2]">
                        <Calendar size={12} className="text-[#6C757D] shrink-0" />
                        <span className="text-[11px] text-[#6C757D] font-medium">Saved on {savedDate}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
