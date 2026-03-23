'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, MapPin, Search } from 'lucide-react';
import Image from 'next/image';

const destinations = [
  {
    id: 1,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: '42',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop',
    category: 'For Sale'
  },
  {
    id: 2,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: '42',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&h=600&fit=crop',
    category: 'For Sale'
  },
  {
    id: 3,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: '42',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop',
    category: 'For Sale'
  }
];

export default function TopDistention() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-1"
          >
            Top Distention
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-2 max-w-2xl mx-auto font-medium"
          >
            We have hundreds of place for you to choose from.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                    <Heart size={14} />
                  </button>
                  <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                    <Search size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-2 space-y-4">
                <h3 className="text-xl font-bold text-neutral-1 group-hover:text-primary transition-colors cursor-pointer">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 text-neutral-2">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">{item.address}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-neutral-1">ETB{item.price}</span>
                    <span className="text-sm text-neutral-2 font-medium">/ night</span>
                  </div>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-10 px-6 rounded-lg transition-all shadow-lg shadow-primary/20">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-8">
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
