'use client';

import { useGetAllPropertyQuery, useDeletePropertyMutation } from '@/features/manageHotels/manageHotelsApi';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ApiError, Hotel, RootState } from '@/types';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function ManageHotelsListPage() {
  const [page, setPage] = useState(1);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);

  const { data, isLoading } = useGetAllPropertyQuery(
    { userId, page },
    { skip: !userId }
  );
  const [deleteProperty, { isLoading: deleteLoading }] = useDeletePropertyMutation();

  const properties: Hotel[] = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPage: number = pagination?.totalPage ?? 1;
  const total: number = pagination?.total ?? 0;
  const showPagination = totalPage > 1;

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    try {
      const res = await deleteProperty({ propertyId }).unwrap();
      toast.success(res.message ?? 'Property deleted');
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#2C2E33]">Manage Hotels</h1>
          <p className="text-[13px] text-[#6C757D] font-medium mt-0.5">{total} properties found</p>
        </div>
        <Link href="/hotels-partner-dashboard/manage-hotels/add">
          <button className="flex items-center gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-semibold py-2.5 px-5 rounded-sm text-[14px] transition-colors cursor-pointer">
            <Plus size={17} strokeWidth={2.5} /> Add Hotel
          </button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!isLoading && properties.length === 0 && (
        <div className="bg-white rounded-lg border border-[#F2F2F2] shadow-sm flex flex-col items-center justify-center py-24 gap-3">
          <p className="text-[#6C757D] font-medium text-[15px]">No properties found</p>
          <Link href="/hotels-partner-dashboard/manage-hotels/add">
            <button className="text-[13px] text-[#F1913D] border border-[#F1913D]/30 px-4 py-1.5 rounded-full hover:bg-[#F1913D]/5 transition-colors cursor-pointer">
              Add your first hotel
            </button>
          </Link>
        </div>
      )}

      {/* Grid */}
      {!isLoading && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((hotel: Hotel, index: number) => {
            const address = [hotel.address?.city, hotel.address?.country].filter(Boolean).join(', ');
            const imgSrc = (hotel.images && hotel.images.length > 0) ? getImg(hotel.images[0]) : FALLBACK_IMG;
            const rating: number = hotel.averageRating ?? 0;

            return (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-lg overflow-hidden border border-[#F2F2F2] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[12px]">
                  <Image
                    src={imgSrc}
                    alt={hotel.title ?? 'Hotel'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Status badge */}
                  <span className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full ${hotel.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                    {hotel.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  {/* Rating */}
                  {rating > 0 && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-1 rounded-full">
                      <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      {rating.toFixed(1)}
                    </span>
                  )}
                  {/* Action buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/hotels-partner-dashboard/manage-hotels/add?edit=${hotel._id}`}>
                      <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#2C2E33] hover:bg-[#F1913D] hover:text-white transition-colors shadow-sm cursor-pointer">
                        <Pencil size={14} strokeWidth={2.5} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(hotel._id || '')}
                      disabled={deleteLoading}
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#DC3545] hover:bg-[#DC3545] hover:text-white transition-colors shadow-sm cursor-pointer disabled:opacity-60"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 pb-4">
                  <h3 className="text-[15px] font-semibold text-[#2C2E33] group-hover:text-[#F1913D] transition-colors line-clamp-1 mb-1">
                    {hotel.title}
                  </h3>
                  {address && (
                    <div className="flex items-center gap-1.5 text-[#6C757D] mb-3">
                      <MapPin size={13} className="flex-shrink-0" />
                      <span className="text-[12px] font-medium line-clamp-1">{address}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-bold text-[#2C2E33]">{hotel.currency} {hotel.price?.toLocaleString()}</span>
                      <span className="text-[12px] text-[#6C757D] font-medium">/ night</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#6C757D] bg-[#F5F5F5] px-2 py-0.5 rounded capitalize">
                      {hotel.structureType}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 h-10 px-4 rounded-sm bg-white text-[#6C757D] hover:text-[#2C2E33] hover:bg-gray-50 transition-colors font-medium text-[14px] shadow-sm border border-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-sm font-medium text-[14px] transition-colors cursor-pointer ${i + 1 === page ? 'bg-[#F1913D] text-white shadow-sm' : 'bg-white text-[#6C757D] hover:bg-gray-50 border border-[#F2F2F2]'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPage, p + 1))}
            disabled={page === totalPage}
            className="flex items-center gap-1.5 h-10 px-4 rounded-sm bg-white text-[#2C2E33] hover:bg-gray-50 shadow-sm border border-[#F2F2F2] transition-colors font-medium text-[14px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
