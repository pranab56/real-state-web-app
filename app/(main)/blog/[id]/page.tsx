'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetSingleBlogQuery } from '@/features/blog/blogsApi';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Loader2, Search, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop';

const getImageUrl = (path?: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

export default function BlogDetailPage() {
  const { t } = useTranslation('common');
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const { data: blogData, isLoading } = useGetSingleBlogQuery(id, { skip: !id });
  const blog = blogData?.data;

  const categories = [
    { name: t('blog.categories_list.buying_tips'), count: 1 },
    { name: t('blog.categories_list.community_spotlight'), count: 1 },
    { name: t('blog.categories_list.home_construction'), count: 1 },
    { name: t('blog.categories_list.interior_inspiration'), count: 1 },
    { name: t('blog.categories_list.investment_insights'), count: 1 },
    { name: t('blog.categories_list.legal_guidance'), count: 1 },
    { name: t('blog.categories_list.market_updates'), count: 1 },
  ];

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Breadcrumbs */}
      <section className="container mx-auto px-4 md:px-6 py-4 md:py-6 border-b border-gray-50 mt-8 md:mt-12">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-neutral-2">
          <Link href="/" className="text-primary hover:underline">{t('navbar.home')}</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link href="/blog" className="text-primary hover:underline">Blog</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="opacity-60 truncate">{blog?.title ?? '...'}</span>
        </div>
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <Loader2 size={40} className="animate-spin text-primary" />
        </div>
      )}

      {/* Not Found */}
      {!isLoading && !blog && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-neutral-2 font-medium text-lg">Blog post not found.</p>
          <Link href="/blog" className="text-primary hover:underline font-bold">← Back to Blog</Link>
        </div>
      )}

      {/* Content */}
      {!isLoading && blog && (
        <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 lg:flex gap-10 lg:gap-16">
          {/* Main Content */}
          <div className="flex-1 space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              {/* Category badge */}
              {blog.category && (
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-1 leading-tight tracking-tight">
                {blog.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs md:text-sm font-bold text-neutral-2 italic bg-[#FDFDFD] py-3 md:py-4 rounded-lg border-l-2 border-primary/20 pl-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <span>{blog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>{formatDate(blog.publishDate)}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl shadow-black/10"
            >
              <Image
                src={getImageUrl(blog.images?.[0])}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Article Body */}
            <div className="prose prose-base md:prose-lg max-w-none text-neutral-2 font-medium leading-relaxed">
              <p className="text-sm md:text-base whitespace-pre-line">{blog.content}</p>
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                <Tag size={16} className="text-primary flex-shrink-0" />
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="text-xs font-bold text-neutral-2 bg-gray-100 hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1 rounded-full cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[350px] space-y-8 md:space-y-10 mt-10 md:mt-12 lg:mt-0">
            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8 space-y-4 md:space-y-6 shadow-xl shadow-black/5">
              <h3 className="text-lg md:text-xl font-black text-neutral-1">{t('blog.search_title')}</h3>
              <div className="relative">
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchInput.trim()) {
                      router.push(`/blog?search=${encodeURIComponent(searchInput.trim())}`);
                    }
                  }}
                  placeholder={t('blog.search_placeholder')}
                  className="h-12 md:h-14 bg-[#F7F7F7] border-none rounded-lg pl-10 md:pl-12 pr-12 text-neutral-1 font-bold text-sm md:text-base"
                />
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-neutral-2 w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                <button
                  onClick={() => {
                    if (searchInput.trim()) {
                      router.push(`/blog?search=${encodeURIComponent(searchInput.trim())}`);
                    }
                  }}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-neutral-2 hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8 space-y-6 md:space-y-8 shadow-xl shadow-black/5">
              <h3 className="text-lg md:text-xl font-black text-neutral-1 border-b border-gray-50 pb-3 md:pb-4">{t('blog.categories')}</h3>
              <div className="space-y-3 md:space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1">
                    <span className="text-sm md:text-base font-bold text-neutral-2 group-hover:text-primary transition-colors">{cat.name}</span>
                    <span className="text-sm md:text-base font-black text-neutral-1 opacity-40 group-hover:opacity-100">({cat.count})</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-12 md:h-14 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 text-base md:text-lg">
                {t('blog.send_inquiry')}
              </Button>
            </div>

            {/* Connect Card */}
            <div className="relative rounded-lg overflow-hidden min-h-[350px] md:min-h-[450px] flex flex-col justify-end group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&h=1200&fit=crop"
                alt="Real Estate Agent"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative p-6 md:p-8 space-y-4 md:space-y-6 text-white">
                <h3 className="text-xl md:text-2xl font-black leading-tight">{t('blog.connect_agent.title')}</h3>
                <p className="text-xs md:text-sm font-bold text-white/70 leading-relaxed italic">
                  {t('blog.connect_agent.description')}
                </p>
                <Button className="w-full bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-black h-12 md:h-14 rounded-lg shadow-xl shadow-primary/40 transition-all group-hover:translate-y-[-4px] text-sm md:text-base">
                  {t('blog.connect_agent.button')}
                </Button>
              </div>
            </div>
          </aside>
        </section>
      )}
    </div>
  );
}
