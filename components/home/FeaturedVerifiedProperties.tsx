'use client';

import { useGetAllListingsQuery } from '@/features/listings/listingsApi';
import { cn } from '@/lib/utils';
import { baseURL } from '@/utils/BaseURL';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hotel } from '@/types';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function FeaturedVerifiedProperties() {
  const { t } = useTranslation('common');

  const [page, setPage] = useState(1);
  const { data } = useGetAllListingsQuery({ category: 'listing', page, limit: 10, isVerified: true, isFeatured: true });
  const allProperties: Hotel[] = data?.data ?? [];
  const totalPage: number = data?.pagination?.totalPage ?? 1;
  const showPagination = totalPage > 1;

  const categories = [
    t('featured.categories.all'),
    t('featured.categories.rent'),
    t('featured.categories.sale'),
  ];
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredProperties = allProperties.filter((p: Hotel) => {
    const purpose = p.listing?.purpose ?? '';
    if (activeTab === t('featured.categories.all')) return true;
    if (activeTab === t('featured.categories.rent')) return purpose === 'for_rent';
    if (activeTab === t('featured.categories.sale')) return purpose === 'for_sale';
    return true;
  });

  const getPurposeLabel = (purpose: string) => {
    if (purpose === 'for_rent') return t('featured.categories.rent');
    if (purpose === 'for_sale') return t('featured.categories.sale');
    return purpose;
  };

  return (
    <section className="py-12 md:py-2 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-2 md:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] sm:text-3xl md:text-5xl font-medium text-neutral-1 leading-[1.2] md:leading-tight"
          >
            {t('featured.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[13px] sm:text-sm md:text-lg text-neutral-2 max-w-2xl mx-auto leading-relaxed"
          >
            {t('featured.subtitle')}
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto justify-start md:justify-center gap-3 sm:gap-3 md:gap-4 mb-10 md:mb-16 pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex md:flex-wrap gap-2 md:gap-4 ml-auto mr-auto">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 sm:px-6 md:px-8 py-2 md:py-3 rounded-[10px] md:rounded-lg cursor-pointer font-medium transition-all border whitespace-nowrap text-[14px] md:text-base shrink-0",
                  activeTab === cat
                    ? "bg-primary text-white border-primary shadow-[0_8px_20px_-6px_rgba(241,145,61,0.4)]"
                    : "bg-white text-neutral-2 border-gray-100 hover:border-primary hover:text-primary"
                )}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property: Hotel) => {
              const addressStr = [property.address?.street, property.address?.city, property.address?.country].filter(Boolean).join(', ');
              const purpose = property.listing?.purpose ?? '';

              return (
                <motion.div
                  key={property._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                >
                  <Link href={`/properties/${property._id}`} className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden m-3 md:m-4 rounded-lg">
                      <Image
                        src={getImg(property.images?.[0])}
                        alt={property.title ?? 'Property'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-2">
                        {property.isVerified && (
                          <span className="bg-[#2B9724] text-white text-[9px] md:text-[10px] font-medium px-2.5 md:px-3 py-1 rounded-full">
                            {t('featured.property.verified')}
                          </span>
                        )}
                        {purpose && (
                          <span className="bg-primary text-white text-[9px] md:text-[10px] font-medium px-2.5 md:px-3 py-1 rounded-full">
                            {getPurposeLabel(purpose)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 pt-2 md:pt-2 space-y-3 md:space-y-4">
                      <p className="text-sm md:text-base font-medium text-neutral-1 line-clamp-1">
                        {property.title ?? property.name ?? ''}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-medium text-primary">
                        {property.currency} {property.price?.toLocaleString()}
                      </h3>
                      <div className="flex items-center gap-2 text-neutral-2">
                        <MapPin size={14} className="shrink-0 md:size-[18px]" />
                        <span className="text-[12px] md:text-[15px] font-medium line-clamp-1">{addressStr}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 md:pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 md:gap-2.5">
                          <Bed size={15} className="md:size-[18px] text-primary shrink-0" />
                          <div className="flex flex-col md:flex-row md:gap-1">
                            <span className="text-[11px] md:text-sm font-medium text-neutral-1">{property.listing?.bedrooms ?? 0}</span>
                            <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.beds')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2.5">
                          <Bath size={15} className="md:size-[18px] text-primary shrink-0" />
                          <div className="flex flex-col md:flex-row md:gap-1">
                            <span className="text-[11px] md:text-sm font-medium text-neutral-1">{property.listing?.bathrooms ?? 0}</span>
                            <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.baths')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2.5">
                          <Maximize2 size={15} className="md:size-[18px] text-primary shrink-0" />
                          <div className="flex flex-col md:flex-row md:gap-1">
                            <span className="text-[11px] md:text-sm font-medium text-neutral-1">{property.listing?.totalArea ?? 0}</span>
                            <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.sqft')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination — only when more than 1 page */}
        {showPagination && (
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-12 md:mt-20">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 md:w-12 md:h-12 border border-gray-200 rounded-full flex items-center justify-center text-neutral-2 hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} className="md:size-6" />
            </button>

            <div className="flex items-center gap-3 md:gap-4">
              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={i + 1 === page
                    ? 'w-3 h-3 rounded-full border-2 border-primary flex items-center justify-center cursor-pointer'
                    : 'w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer hover:bg-primary/40 transition-colors'}
                >
                  {i + 1 === page && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPage, p + 1))}
              disabled={page === totalPage}
              className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} className="md:size-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
