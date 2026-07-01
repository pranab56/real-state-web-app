'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { Button } from '@/components/ui/button';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Hotel } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllListingsQuery } from '../../features/listings/listingsApi';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop';
const MAX_VISIBLE = 6;

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function TopDistention() {
  const { data } = useGetAllListingsQuery({ category: 'accommodation', limit: MAX_VISIBLE });
  const destinations: Hotel[] = data?.data ?? [];
  const total: number = data?.pagination?.total ?? 0;
  const showSeeMore = total > MAX_VISIBLE;

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
              className="text-2xl md:text-4xl font-medium text-neutral-1"
            >
              Top Destinations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-lg text-neutral-2 font-medium"
            >
              We have hundreds of place for you to choose from.
            </motion.p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {destinations.map((dest: Hotel, idx: number) => {
            const location = [dest.address?.city, dest.address?.country].filter(Boolean).join(', ');
            const rating: number = dest.averageRating ?? 0;

            return (
              <motion.div
                key={dest._id}
                // initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={getImg(dest.images?.[0])}
                    alt={dest.title ?? 'Destination'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                 
                  {rating > 0 && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                        {rating.toFixed(1)} <Star size={10} className="inline-block fill-white mb-0.5" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-medium text-neutral-1 group-hover:text-primary transition-colors">
                      {dest.title}
                    </h3>
                    {location && (
                      <div className="flex items-center gap-2 text-neutral-2">
                        <MapPin size={16} className="shrink-0" />
                        <span className="text-sm md:text-base font-medium">{location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-3xl font-medium text-primary">
                          {dest.currency} {dest.price?.toLocaleString()}
                        </span>
                        <span className="text-xs md:text-sm text-neutral-2 font-medium">/ night</span>
                      </div>
                      <PriceConvertButton price={dest.price} currency={dest.currency} />
                    </div>
                    <Link href={`/hotels/${dest._id}`}>
                      <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium px-6 md:px-8 py-5 cursor-pointer md:py-6 rounded-sm transition-all text-sm md:text-base">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See More — only when there are more destinations than the homepage preview shows */}
        {showSeeMore && (
          <div className="flex justify-center mt-12">
            <Link href="/hotels">
              <button className="px-8 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all cursor-pointer">
                See More
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
