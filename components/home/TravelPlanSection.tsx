'use client';

import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function TravelPlanSection() {
  const { t } = useTranslation('common');

  const travelCards = [
    {
      title: t('travel.cards.hotels_title'),
      description: t('travel.cards.hotels_desc'),
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&fit=crop',
      href: '/hotels'
    },
    {
      title: t('travel.cards.guesthouses_title'),
      description: t('travel.cards.guesthouses_desc'),
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&h=400&fit=crop',
      href: '/hotels'
    },
    {
      title: t('travel.cards.rides_title'),
      description: t('travel.cards.rides_desc'),
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&h=400&fit=crop',
      href: '/transportation'
    }
  ];

  const howItWorks = [
    {
      title: t('travel.steps.step1'),
      description: t('travel.steps.step1_desc'),
      icon: <Building2 className="w-12 h-12 text-primary" />
    },
    {
      title: t('travel.steps.step2'),
      description: t('travel.steps.step2_desc'),
      icon: <Search className="w-12 h-12 text-primary" />
    },
    {
      title: t('travel.steps.step3'),
      description: t('travel.steps.step3_desc'),
      icon: <ShieldCheck className="w-12 h-12 text-primary" />
    },
    {
      title: t('travel.steps.step4'),
      description: t('travel.steps.step4_desc'),
      icon: <CheckCircle2 className="w-12 h-12 text-primary" />
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. Plan Your Stay & Travel Section */}
      <section className="bg-[#2C2E33] py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-medium px-4"
            >
              {t('travel.plan_title')}
            </motion.h2>
            <p className="max-w-xl mx-auto text-neutral-2 text-sm md:text-lg font-medium px-4">
              {t('travel.plan_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {travelCards.map((card, idx) => (
              <Link href={card.href} key={idx} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-[#2C2E33] border border-white/10 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col items-center text-center p-0 cursor-pointer h-full group"
                >
                  <div className="relative w-full h-48 md:h-52 overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 md:p-8 space-y-3 md:space-y-4 flex flex-col items-center">
                    <h3 className="text-lg md:text-xl font-medium line-clamp-2 min-h-0 md:min-h-[3.5rem] flex items-center group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-neutral-2 text-xs md:text-sm leading-relaxed mb-2 md:mb-4">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Ready to Experience Banner */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#FFF9F2] rounded-3xl md:rounded-[1.5rem] overflow-hidden flex flex-col lg:flex-row relative min-h-0 md:min-h-[450px]"
          >
            <div className="lg:w-2/3 p-8 md:p-12 lg:p-20 space-y-6 md:space-y-8 z-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl w-10/12 font-medium text-neutral-1 leading-tight" dangerouslySetInnerHTML={{ __html: t('travel.ready_title') }} />
              <p className="text-neutral-2 text-sm md:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
                {t('travel.ready_subtitle')}
              </p>
              <Link href={"/properties"} className="bg-[#F1913D] py-3.5 hover:bg-[#F1913D]/90 text-white font-medium h-12 md:h-14 px-10 md:px-12 rounded-sm cursor-pointer text-base md:text-lg shadow-xl shadow-primary/20 w-full md:w-auto">
                {t('travel.ready_btn')}
              </Link>
            </div>

            <div className="relative w-full lg:w-2/3 h-[250px] md:h-[350px] lg:h-auto">
              <Image
                src="/images/homeOne.png"
                alt="Professional Man"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. How Zilahomes Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="space-y-2 md:space-y-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-medium text-neutral-1"
            >
              {t('travel.how_title')}
            </motion.h2>
            <p className="max-w-2xl mx-auto text-neutral-2 text-sm md:text-lg font-medium">
              {t('travel.how_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center gap-4 md:gap-6 group"
              >
                <div className="p-3 md:p-4 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <div className="scale-75 md:scale-100">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-1">
                  {item.title}
                </h3>
                <p className="text-neutral-2 text-xs md:text-sm leading-relaxed font-semibold">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
