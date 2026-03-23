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
  Maximize2,
  Search as SearchIcon
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const categories = ['All', 'For Rent', 'For Sale', 'Sold'];

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
  const [activeTab, setActiveTab] = useState('All');

  const filteredProperties = properties.filter(p =>
    activeTab === 'All' || p.category === activeTab
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-1"
          >
            Featured Verified Properties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-2 max-w-2xl mx-auto"
          >
            We have hundreds of properties for you to choose from.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-16">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-8 py-2.5 rounded cursor-pointer font-bold transition-all border",
                activeTab === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-neutral-2 border-gray-100 hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => (
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
                <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-lg">
                  <Image
                    src={property.image}
                    alt="Property"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.verified && (
                      <span className="bg-[#2B9724] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        Zila Verified
                      </span>
                    )}
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      {property.category}
                    </span>
                  </div>

                  {/* Hover Icons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                      <ArrowRightLeft size={18} />
                    </button>
                    <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                      <Heart size={18} />
                    </button>
                    <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                      <SearchIcon size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-2 space-y-4">
                  <h3 className="text-3xl font-bold text-neutral-1">{property.price}</h3>
                  <div className="flex items-center gap-2 text-neutral-2">
                    <MapPin size={18} className="shrink-0" />
                    <span className="text-sm font-medium line-clamp-1">{property.address}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-neutral-2">
                      <Bed size={20} />
                      <span className="text-sm font-bold text-neutral-1">Beds {property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-2">
                      <Bath size={20} />
                      <span className="text-sm font-bold text-neutral-1">Baths {property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-2">
                      <Maximize2 size={20} />
                      <span className="text-sm font-bold text-neutral-1">m2 {property.size}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-8 mt-20">
          <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-neutral-2 hover:border-primary hover:text-primary transition-all cursor-pointer">
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full border-2 border-primary cursor-pointer relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
          </div>

          <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
