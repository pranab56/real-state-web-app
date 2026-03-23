'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Clock, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Why Access Is So Important When Selling Your House',
    date: 'July 23, 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop',
    excerpt: 'A home is where you make memories. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Professional Insurance and Financial Guarantees to join the registry, agents and agencies must also fulfill one'
  },
  {
    id: 2,
    title: 'Why Access Is So Important When Selling Your House',
    date: 'July 23, 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop',
    excerpt: 'A home is where you make memories. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Professional Insurance and Financial Guarantees to join the registry, agents and agencies must also fulfill one'
  },
  {
    id: 3,
    title: 'Why Access Is So Important When Selling Your House',
    date: 'July 23, 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop',
    excerpt: 'A home is where you make memories. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Professional Insurance and Financial Guarantees to join the registry, agents and agencies must also fulfill one'
  }
];

const categories = [
  { name: 'Buying Tips', count: 1 },
  { name: 'Community Spotlight', count: 1 },
  { name: 'Home Construction', count: 1 },
  { name: 'Interior Inspiration', count: 1 },
  { name: 'Investment Insights', count: 1 },
  { name: 'Legal Guidance', count: 1 },
  { name: 'Market Updates', count: 1 },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-sm mt-12">
       <Link href="/">
        <span className="text-primary font-medium hover:underline cursor-pointer">Home</span>
       </Link>
        <ChevronRight size={14} className="text-neutral-2" />
        <span className="text-neutral-2">Blog Grid</span>
      </div>

      <div className="container mx-auto px-6 pb-24 lg:flex gap-12">

        {/* Blog Content */}
        <div className="flex-1 space-y-16">
          <h1 className="text-3xl font-bold text-neutral-1">Blog</h1>

          <div className="space-y-20">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-6"
              >
                <div className="relative  aspect-[16/9] rounded-lg overflow-hidden group">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-2 text-sm font-medium">
                    <Clock size={16} className="text-primary" />
                    <span>{post.date}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-neutral-1 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>

                  <p className="text-neutral-2 leading-relaxed max-w-4xl">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group"
                  >
                    Read More
                    <ArrowRight size={18} className="translate-y-[1px]" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[350px] space-y-10 mt-12 lg:mt-0">
          {/* Search */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6 shadow-sm shadow-black/5">
            <h3 className="font-bold text-neutral-1">Search Blog</h3>
            <div className="relative">
              <Input
                placeholder="Search Now"
                className="h-12 bg-[#F7F7F7] border-none rounded-lg pl-10 pr-4 text-neutral-1 font-medium"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-2" size={18} />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 shadow-sm shadow-black/5">
            <h3 className="font-bold text-neutral-1 border-b border-gray-50">Categories</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-medium text-neutral-2 group-hover:text-primary transition-colors">{cat.name}</span>
                  <span className="text-sm font-bold text-neutral-1 opacity-60">({cat.count})</span>
                </div>
              ))}
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-lg mt-4">
              Send Inquiry
            </Button>
          </div>

          {/* CTA Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[450px] flex flex-col justify-end group">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&h=1200&fit=crop"
              alt="Real Estate Agent"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative p-8 space-y-6 text-white">
              <h3 className="text-2xl font-bold leading-tight">We can help you find a local real estate agent</h3>
              <p className="text-sm text-white/80 font-medium leading-relaxed">Connect with a trusted agent who knows the market inside out - whether you're buying or selling.</p>
              <Button className="w-full bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-12 rounded-xl">
                Connect with an agent
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
