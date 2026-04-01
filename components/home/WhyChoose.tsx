'use client';

import { motion } from 'framer-motion';
import { Globe2, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhyChoose() {
  const { t } = useTranslation('common');

  const benefits = [
    {
      title: t('why.benefits.secure_title'),
      description: t('why.benefits.secure_desc'),
      icon: <ShieldCheck className="w-16 h-16 text-primary" />
    },
    {
      title: t('why.benefits.partners_title'),
      description: t('why.benefits.partners_desc'),
      icon: <Users className="w-16 h-16 text-primary" />
    },
    {
      title: t('why.benefits.remote_title'),
      description: t('why.benefits.remote_desc'),
      icon: <Globe2 className="w-16 h-16 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFF9F2]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-neutral-1 leading-tight"
          >
            {t('why.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-neutral-2 max-w-2xl mx-auto font-medium"
          >
            {t('why.subtitle')}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 md:p-12 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4 md:gap-6 group cursor-default"
            >
              <div className="mb-2 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <div className="scale-75 md:scale-100">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-1 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-neutral-2 text-xs md:text-base leading-relaxed font-medium">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
