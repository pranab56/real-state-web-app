'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';

export default function SummerTrips() {
  const { t } = useTranslation('common');

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.summer-trips-pagination',
          }}
          loop={true}
          className="rounded-2xl shadow-2xl"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[480px] md:h-[600px] w-full group"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2670&auto=format&fit=crop"
                  alt="Summer Trips"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center p-6 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-xl md:ml-12 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-black/30 backdrop-blur-md border border-white/10 space-y-4 md:space-y-6 shadow-2xl w-full"
                >
                  <div className="inline-block px-4 py-1.5 bg-white text-neutral-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider">
                    {t('summer.featured')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.2] md:leading-[1.1]">
                    {t('summer.slide1_title')}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 font-medium line-clamp-2 md:line-clamp-none">
                    {t('summer.slide1_desc')}
                  </p>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-11 md:h-12 px-8 md:px-10 rounded-lg transition-all shadow-xl shadow-primary/20 text-sm md:text-base w-full md:w-auto">
                    {t('summer.slide1_btn')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[480px] md:h-[600px] w-full group"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2670&auto=format&fit=crop"
                  alt="Beach Getaway"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center p-6 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-xl md:ml-12 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-black/30 backdrop-blur-md border border-white/10 space-y-4 md:space-y-6 shadow-2xl w-full"
                >
                  <div className="inline-block px-4 py-1.5 bg-white text-neutral-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider">
                    {t('summer.exclusive')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.2] md:leading-[1.1]">
                    {t('summer.slide2_title')}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 font-medium line-clamp-2 md:line-clamp-none">
                    {t('summer.slide2_desc')}
                  </p>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-11 md:h-12 px-8 md:px-10 rounded-lg transition-all shadow-xl shadow-primary/20 text-sm md:text-base w-full md:w-auto">
                    {t('summer.slide2_btn')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[480px] md:h-[600px] w-full group"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=2670&auto=format&fit=crop"
                  alt="City Adventure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center p-6 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-xl md:ml-12 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-black/30 backdrop-blur-md border border-white/10 space-y-4 md:space-y-6 shadow-2xl w-full"
                >
                  <div className="inline-block px-4 py-1.5 bg-white text-neutral-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider">
                    {t('summer.urban')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.2] md:leading-[1.1]">
                    {t('summer.slide3_title')}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 font-medium line-clamp-2 md:line-clamp-none">
                    {t('summer.slide3_desc')}
                  </p>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-11 md:h-12 px-8 md:px-10 rounded-lg transition-all shadow-xl shadow-primary/20 text-sm md:text-base w-full md:w-auto">
                    {t('summer.slide3_btn')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Pagination Interface */}
        <div className="summer-trips-pagination flex items-center justify-center gap-3 mt-8" />
      </div>
    </section>
  );
}
