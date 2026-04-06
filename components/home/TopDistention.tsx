'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function TopDistention() {
  const { t } = useTranslation('common');

  const destinations = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop',
      title: 'Lalibela Rock Churches',
      location: 'Lalibela, Ethiopia',
      price: '150',
      rating: 4.9,
      reviews: 124
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&h=600&fit=crop',
      title: 'Simien Mountains',
      location: 'Gondar, Ethiopia',
      price: '120',
      rating: 4.8,
      reviews: 98
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&h=600&fit=crop',
      title: 'Lake Tana Monasteries',
      location: 'Bahir Dar, Ethiopia',
      price: '90',
      rating: 4.7,
      reviews: 86
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-center text-center gap-6 mb-10 md:mb-16 px-4">
          <div className="space-y-2 md:space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-neutral-1"
            >
              {t('top_dest.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-lg text-neutral-2 font-medium"
            >
              {t('top_dest.subtitle')}
            </motion.p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                  <Heart size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dest.rating} <Star size={10} className="inline-block fill-white mb-0.5" />
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-1 group-hover:text-primary transition-colors">
                    {dest.title}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-2">
                    <MapPin size={16} className="shrink-0" />
                    <span className="text-sm md:text-base font-medium">{dest.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-bold text-primary">${dest.price}</span>
                    <span className="text-xs md:text-sm text-neutral-2 font-medium">{t('top_dest.per_night')}</span>
                  </div>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold px-6 md:px-8 py-5 cursor-pointer md:py-6 rounded-sm transition-all text-sm md:text-base">
                    {t('top_dest.book_now')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mt-12">
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
