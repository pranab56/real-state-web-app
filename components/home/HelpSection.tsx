'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Building2, Home as HomeIcon, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HelpSection() {
  const { t } = useTranslation('common');

  const services = [
    {
      title: t('help.services.buy_title'),
      description: t('help.services.desc'),
      icon: <Building2 className="w-16 h-16 text-primary" />,
      btnText: t('help.services.learn_more')
    },
    {
      title: t('help.services.rent_title'),
      description: t('help.services.desc'),
      icon: <HomeIcon className="w-16 h-16 text-primary" />,
      btnText: t('help.services.learn_more')
    },
    {
      title: t('help.services.sell_title'),
      description: t('help.services.desc'),
      icon: <Search className="w-16 h-16 text-primary" />,
      btnText: t('help.services.learn_more')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-neutral-1"
          >
            {t('help.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-neutral-2 max-w-2xl mx-auto"
          >
            {t('help.subtitle')}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 container mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4 md:gap-6 group"
            >
              <div className="mb-2 shrink-0">
                <div className="scale-75 md:scale-100">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-neutral-1 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-neutral-2 leading-relaxed text-xs md:text-sm">
                {service.description}
              </p>
              <Button
                variant="ghost"
                className="mt-2 md:mt-4 bg-[#F2F2F2] hover:bg-primary hover:text-white text-neutral-1 font-medium px-8 md:px-10 h-11 md:h-12 rounded transition-all"
              >
                {service.btnText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
