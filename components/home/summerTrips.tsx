'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SummerTrips() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[480px] md:h-[600px] w-full rounded-2xl overflow-hidden group shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop"
              alt="Summer Trips"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center p-6 md:p-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl md:ml-20 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-black/30 backdrop-blur-md border border-white/10 space-y-4 md:space-y-6 shadow-2xl w-full"
            >
              <div className="inline-block px-4 py-1.5 bg-white text-neutral-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider">
                Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.2] md:leading-[1.1]">
                Save 30% on summer trips
              </h2>
              <p className="text-sm md:text-base text-white/90 font-medium line-clamp-2 md:line-clamp-none">
                Book your transportation and hotel together to unlock exclusive rewards.
              </p>
              <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-11 md:h-12 px-8 md:px-10 rounded-lg transition-all shadow-xl shadow-primary/20 text-sm md:text-base w-full md:w-auto">
                Explore Deals
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-3 h-3 rounded-full border-2 border-primary cursor-pointer relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
