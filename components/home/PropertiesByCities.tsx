'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const cities = [
  { name: 'Bahir Dar', count: 2, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&h=400&fit=crop' },
  { name: 'Addis Ababa', count: 2, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&h=400&fit=crop' },
  { name: 'Bishoftu', count: 2, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400&h=400&fit=crop' },
  { name: 'Adama', count: 2, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&h=400&fit=crop' },
  { name: 'Hawassa', count: 2, image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=400&h=400&fit=crop' },
  { name: 'Bahir Dar', count: 2, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&h=400&fit=crop' },
  { name: 'Dire Dawa', count: 2, image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=400&h=400&fit=crop' },
  { name: 'Dire Dawa', count: 2, image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=400&h=400&fit=crop' },
  { name: 'Dire Dawa', count: 2, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400&h=400&fit=crop' },
];

export default function PropertiesByCities() {
  return (
    <section className="bg-white pb-20  overflow-hidden">
      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#FFF9F2] py-4 px-6 md:px-12 flex items-center gap-4 "
      >
        <div className="container mx-auto flex items-center gap-4 py-5">
          <div className="w-12 h-12  bg-primary rounded-xl flex  items-center justify-center rotate-[-15deg] shadow-lg">
            <Tag className="text-white fill-white" size={24} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-2xl font-bold text-neutral-1">Annual Vacation Sale</h4>
            <p className="text-sm text-neutral-2">
              Members save up to 40% on select hotels and homes. <span className="font-bold underline cursor-pointer">Book now</span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto  py-32 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-4"
        >
          <h2 className="text-5xl font-bold text-neutral-1 tracking-tight">Properties By Cities</h2>
          <p className="text-lg text-neutral-2 font-medium">Display your properties by city or area.</p>
        </motion.div>

        {/* Swiper Slider */}
        <div className="relative px-12 group">
          <Swiper
            modules={[Navigation]}
            slidesPerView={7}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 7 },
            }}
            className="pb-12"
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2 group/card cursor-pointer"
                >
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-transparent group-hover/card:border-primary transition-all duration-500 shadow-xl">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center">
                    <h5 className="text-xl font-bold text-neutral-1 group-hover/card:text-primary transition-colors whitespace-nowrap">
                      {city.name}
                    </h5>
                    <p className="text-sm text-neutral-2 font-medium mt-1">
                      {city.count} Properties
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <button className="swiper-button-prev-custom absolute left-0 top-[40%] -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-[40%] -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
