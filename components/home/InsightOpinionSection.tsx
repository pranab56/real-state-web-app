'use client';

import { BlogPost } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllBlogsQuery } from '../../features/blog/blogsApi';

const getImg = (path?: string) => {
  if (!path) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop';
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function InsightOpinionSection() {
  const { data } = useGetAllBlogsQuery({ page: 1 });
  const blogs: BlogPost[] = (data?.data ?? []).slice(0, 3);

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
          <h2 className="text-2xl md:text-4xl font-medium text-neutral-1">Insight & Opinion</h2>
          <p className="text-sm md:text-lg text-neutral-2 font-medium">Thousands of luxury home enthusiasts just like you visit our website.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {blogs.map((blog: BlogPost, index: number) => (
            <motion.div
              key={blog._id}

              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-left space-y-3 md:space-y-4 bg-white rounded-xl border border-gray-100 p-3 md:p-4 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={getImg(blog.images?.[0])}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span className="bg-primary text-white text-[9px] md:text-[10px] font-medium px-2.5 md:px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                <div className="flex items-center gap-2 text-neutral-2">
                  <Clock size={14} className="md:size-4" />
                  <span className="text-xs md:text-sm font-medium">
                    {blog.publishDate ? format(new Date(blog.publishDate), 'MMMM dd, yyyy') : ''}
                  </span>
                </div>
                <Link href={`/blog/${blog._id}`}>
                  <h3 className="text-lg md:text-xl font-medium text-neutral-1 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                    {blog.title}
                  </h3>
                </Link>
                <Link href={`/blog/${blog._id}`} className="flex items-center gap-2 mt-3 text-primary font-medium hover:gap-4 transition-all cursor-pointer text-sm md:text-base">
                  Read More
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-primary flex items-center justify-center">
                    <ArrowRight size={12} className="md:size-[14px]" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
