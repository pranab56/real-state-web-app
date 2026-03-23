'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Bath, Bed, MapPin, Move } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  status: 'For Sale' | 'For Rent';
  className?: string;
}

export function PropertyCard({
  title,
  price,
  location,
  beds,
  baths,
  area,
  image,
  status,
  className,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group overflow-hidden rounded-2xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-xl',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {status}
        </div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-1 text-sm text-zinc-500">
          <MapPin size={14} className="text-zinc-400" />
          {location}
        </div>
        <h3 className="mb-3 text-lg font-bold text-zinc-900 group-hover:text-black transition-colors line-clamp-1">
          {title}
        </h3>

        <div className="mb-6 grid grid-cols-3 gap-4 border-y border-zinc-100 py-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Bed size={14} />
              Beds
            </div>
            <span className="text-sm font-semibold">{beds}</span>
          </div>
          <div className="flex flex-col gap-1 border-x border-zinc-100 px-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Bath size={14} />
              Baths
            </div>
            <span className="text-sm font-semibold">{baths}</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Move size={14} />
              Sqft
            </div>
            <span className="text-sm font-semibold">{area}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-400">Price</span>
            <span className="text-xl font-bold text-black">{price}</span>
          </div>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
