'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SummerTrips() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full rounded-xl overflow-hidden group shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop"
              alt="Summer Trips"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl ml-12 md:ml-20 p-8 md:p-12 rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/10 space-y-6 shadow-2xl"
            >
              <div className="inline-block px-4 py-1.5 bg-white text-neutral-1 text-xs font-bold rounded-full uppercase tracking-wider">
                Featured
              </div>
              <h2 className="text-4xl md:text-4xl font-bold text-white leading-[1.1]">
                Save 30% on summer trips
              </h2>
              <p className="text-base text-white/90 font-medium">
                Book your transportation and hotel together to unlock exclusive rewards.
              </p>
              <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white  font-bold h-12 px-10 rounded-sm transition-all shadow-xl shadow-primary/20 text-base">
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
