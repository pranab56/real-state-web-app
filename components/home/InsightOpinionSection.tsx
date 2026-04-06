'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const articles = [
  {
    id: 1,
    category: 'Home Construction',
    date: 'July 23, 2025',
    title: 'Why Access Is So Important When Selling Your House',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop'
  },
  {
    id: 2,
    category: 'Home Construction',
    date: 'July 23, 2025',
    title: 'Why Access Is So Important When Selling Your House',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&h=600&fit=crop'
  },
  {
    id: 3,
    category: 'Home Construction',
    date: 'July 23, 2025',
    title: 'Why Access Is So Important When Selling Your House',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&h=600&fit=crop'
  }
];

export default function InsightOpinionSection() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-white pt-16 md:pt-24">
      {/* Blog Section */}
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 md:space-y-4 mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-1">{t('insights.title')}</h2>
          <p className="text-sm md:text-lg text-neutral-2 font-medium">{t('insights.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-left space-y-3 md:space-y-4 bg-white rounded-xl border border-gray-100 p-3 md:p-4 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span className="bg-primary text-white text-[9px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                <div className="flex items-center gap-2 text-neutral-2">
                  <Clock size={14} className="md:size-4" />
                  <span className="text-xs md:text-sm font-medium">{article.date}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-neutral-1 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                  {article.title}
                </h3>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all cursor-pointer text-sm md:text-base">
                  {t('insights.read_more')}
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-primary flex items-center justify-center">
                    <ArrowRight size={12} className="md:size-[14px]" />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Slice */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <button className="w-10 h-10 md:w-12 md:h-12 border border-gray-200 rounded-full flex items-center justify-center text-neutral-2 hover:border-primary hover:text-primary transition-all cursor-pointer">
            <ChevronLeft size={20} className="md:size-6" />
          </button>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-primary cursor-pointer relative flex items-center justify-center">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 cursor-pointer" />
          </div>

          <button className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <ChevronRight size={20} className="md:size-6" />
          </button>
        </div>
      </div>

      {/* CTA Banner */}

    </section>
  );
}
