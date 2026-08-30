'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAdvertisementQuery } from '../../features/advertisement/advertisementApi';

interface Advertisement {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  status: string;
}



export default function SummerTrips() {
  const { data } = useGetAdvertisementQuery({});
  const ads: Advertisement[] = data?.data ?? [];

  if (ads.length === 0) return null;

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
          loop={ads.length >= 2}
          className="rounded-2xl shadow-2xl"
        >
          {ads.map((ad) => {
            const imgSrc = ad.image || "";
            return (
              <SwiperSlide key={ad._id}>
                <Link href={ad.link ?? '#'} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[480px] md:h-[600px] w-full group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-neutral-800">
                      {imgSrc && (
                        <Image
                          src={imgSrc}
                          alt={ad.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-end md:items-center p-6 md:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="max-w-xl md:ml-12 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-black/30 backdrop-blur-md border border-white/10 space-y-4 md:space-y-6 shadow-2xl w-full"
                      >
                        <h2 className="text-3xl md:text-4xl font-medium text-white leading-[1.2] md:leading-[1.1]">
                          {ad.title}
                        </h2>
                        {ad.description && (
                          <p className="text-sm md:text-base text-white/90 font-medium line-clamp-2 md:line-clamp-none">
                            {ad.description}
                          </p>
                        )}
                        <span className="inline-flex items-center text-white font-medium text-sm md:text-base underline group-hover:text-primary transition-colors">
                          Explore
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Pagination */}
        <div className="summer-trips-pagination flex items-center justify-center gap-3 mt-8" />
      </div>
    </section>
  );
}
