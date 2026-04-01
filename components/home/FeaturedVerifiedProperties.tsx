'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightLeft,
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Maximize2
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&h=600&fit=crop',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: 900,
    category: 'For Sale',
    verified: true
  }
];

export default function FeaturedVerifiedProperties() {
  const { t } = useTranslation('common');
  const categories = [
    t('featured.categories.all'), 
    t('featured.categories.rent'), 
    t('featured.categories.sale'), 
    t('featured.categories.sold')
  ];
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredProperties = properties.filter(p => {
    if (activeTab === t('featured.categories.all')) return true;
    if (activeTab === t('featured.categories.rent')) return p.category === 'For Rent';
    if (activeTab === t('featured.categories.sale')) return p.category === 'For Sale';
    if (activeTab === t('featured.categories.sold')) return p.category === 'Sold';
    return true;
  });

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-2 md:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] sm:text-3xl md:text-5xl font-bold text-neutral-1 leading-[1.2] md:leading-tight"
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

        {/* Categories - Scrollable on mobile */}
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
                  "px-6 sm:px-6 md:px-8 py-2 md:py-3 rounded-[10px] md:rounded-lg cursor-pointer font-bold transition-all border whitespace-nowrap text-[14px] md:text-base shrink-0",
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
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden m-3 md:m-4 rounded-lg">
                  <Image
                    src={property.image}
                    alt="Property"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-2">
                    {property.verified && (
                      <span className="bg-[#2B9724] text-white text-[9px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 rounded-full flex items-center gap-1">
                        {t('featured.property.verified')}
                      </span>
                    )}
                    <span className="bg-primary text-white text-[9px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 rounded-full text-center">
                      {property.category === 'For Rent' ? t('featured.categories.rent') : property.category === 'For Sale' ? t('featured.categories.sale') : t('featured.categories.sold')}
                    </span>
                  </div>

                  {/* Hover Icons - Fixed for Touch */}
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-9 h-9 md:w-10 md:h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                      <ArrowRightLeft size={16} className="md:size-[18px]" />
                    </button>
                    <button className="w-9 h-9 md:w-10 md:h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                      <Heart size={16} className="md:size-[18px]" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 pt-2 md:pt-2 space-y-3 md:space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-1">{property.price}</h3>
                  <div className="flex items-center gap-2 text-neutral-2">
                    <MapPin size={14} className="shrink-0 md:size-[18px]" />
                    <span className="text-[12px] md:text-[15px] font-medium line-clamp-1">{property.address}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 md:gap-2.5">
                      <Bed size={15} className="md:size-[18px] text-primary shrink-0" />
                      <div className="flex flex-col md:flex-row md:gap-1">
                        <span className="text-[11px] md:text-sm font-bold text-neutral-1">{property.beds}</span>
                        <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.beds')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2.5">
                      <Bath size={15} className="md:size-[18px] text-primary shrink-0" />
                      <div className="flex flex-col md:flex-row md:gap-1">
                        <span className="text-[11px] md:text-sm font-bold text-neutral-1">{property.baths}</span>
                        <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.baths')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2.5">
                      <Maximize2 size={15} className="md:size-[18px] text-primary shrink-0" />
                      <div className="flex flex-col md:flex-row md:gap-1">
                        <span className="text-[11px] md:text-sm font-bold text-neutral-1">{property.size}</span>
                        <span className="text-[9px] md:text-[13px] text-neutral-2 font-medium">{t('featured.property.sqft')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mt-12 md:mt-20">
          <button className="w-10 h-10 md:w-12 md:h-12 border border-gray-200 rounded-full flex items-center justify-center text-neutral-2 hover:border-primary hover:text-primary transition-all cursor-pointer">
            <ChevronLeft size={20} className="md:size-6" />
          </button>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-3 h-3 rounded-full border-2 border-primary cursor-pointer relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
          </div>

          <button className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <ChevronRight size={20} className="md:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
