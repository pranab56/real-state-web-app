'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <section className="bg-white pt-24">
      {/* Blog Section */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-1">Insight & Opinion</h2>
          <p className="text-lg text-neutral-2 font-medium">Thousands of luxury home enthusiasts just like you visit our website.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-left space-y-4 bg-white rounded-xl border border-gray-100 p-4 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2 text-neutral-2">
                  <Clock size={16} />
                  <span className="text-sm font-medium">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-1 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                  {article.title}
                </h3>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all cursor-pointer">
                  Read More
                  <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center">
                    <ArrowRight size={14} />
                  </div>
                </button>
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

      {/* CTA Banner */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold">Featured Verified Properties</h2>
            <p className="text-lg opacity-90">We have hundreds of properties for you to choose from.</p>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Find your location agent"
              className="w-full h-14 bg-white rounded-lg px-6 pr-12 text-neutral-1 font-medium focus:outline-none shadow-lg focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}
