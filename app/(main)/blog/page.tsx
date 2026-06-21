'use client';

import { Input } from '@/components/ui/input';
import { useGetAllBlogsQuery, useGetAllCategoryQuery } from '@/features/blog/blogsApi';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Loader2, Search, Tag, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '@/types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop';

const getImageUrl = (path?: string) => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

const getExcerpt = (content: string, max = 120) => {
  const plain = content.replace(/<[^>]*>/g, '').trim();
  return plain.length <= max ? plain : plain.substring(0, max).trimEnd() + '...';
};

const getReadTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

function BlogContent() {
  const { t } = useTranslation('common');
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: blogData, isLoading, isFetching } = useGetAllBlogsQuery(
    { searchTerm: debouncedSearch || undefined },
  );
  const { data: categoryData } = useGetAllCategoryQuery(undefined);

  const allPosts: BlogPost[] = blogData?.data ?? [];
  const categories: string[] = categoryData?.data ?? [];

  const filtered = activeCategory
    ? allPosts.filter((p: BlogPost) => p.category === activeCategory)
    : allPosts;

  const featuredPost = filtered[0];
  const gridPosts = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 md:pt-28">

      {/* Page Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wide inline-block">
                {t('blog.breadcrumb_grid')}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-neutral-1">{t('blog.title')}</h1>
              <p className="text-sm md:text-base text-neutral-2 font-medium max-w-lg">
                Stay informed with expert insights, market trends, and tips on real estate.
              </p>
            </div>
            {filtered.length > 0 && (
              <span className="text-sm text-neutral-2 font-medium whitespace-nowrap">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                {activeCategory && <span className="ml-1">in <span className="text-primary font-semibold">{activeCategory}</span></span>}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 lg:flex gap-10 xl:gap-14">

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* Loading */}
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={36} className="animate-spin text-primary" />
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isFetching && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <BookOpen size={26} className="text-gray-300" />
              </div>
              <p className="text-neutral-1 font-semibold text-lg">No articles found</p>
              <p className="text-neutral-2 text-sm font-medium">
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"`
                  : activeCategory
                    ? `No posts in "${activeCategory}" yet.`
                    : 'No blog posts available yet.'}
              </p>
              {(debouncedSearch || activeCategory) && (
                <button
                  onClick={() => { setSearchInput(''); setActiveCategory(''); }}
                  className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!isLoading && !isFetching && filtered.length > 0 && (
            <div className="space-y-8">

              {/* Featured post */}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/blog/${featuredPost._id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
                      <Image
                        src={getImageUrl(featuredPost.images?.[0])}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <span className="absolute top-4 left-4 text-[11px] font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wide shadow">
                        Featured
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
                      {featuredPost.category && (
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                          {featuredPost.category}
                        </span>
                      )}
                      <h2 className="text-xl md:text-2xl font-black text-neutral-1 group-hover:text-primary transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm text-neutral-2 font-medium leading-relaxed">
                        {getExcerpt(featuredPost.content, 160)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-2 font-medium">
                        {featuredPost.authorName && (
                          <span className="flex items-center gap-1.5">
                            <User size={12} className="text-primary" />
                            {featuredPost.authorName}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-primary" />
                          {formatDate(featuredPost.publishDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={12} className="text-primary" />
                          {getReadTime(featuredPost.content)} min read
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        {t('blog.read_more')} <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>

              {/* Grid posts */}
              {gridPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {gridPosts.map((post: BlogPost, index: number) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={`/blog/${post._id}`}
                        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={getImageUrl(post.images?.[0])}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {post.category && (
                            <span className="absolute top-3 left-3 text-[11px] font-semibold text-primary bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                              {post.category}
                            </span>
                          )}
                        </div>
                        <div className="p-5 md:p-6 flex flex-col flex-1 gap-3">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-2 font-medium">
                            {post.authorName && (
                              <span className="flex items-center gap-1.5">
                                <User size={11} className="text-primary" />
                                {post.authorName}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Clock size={11} className="text-primary" />
                              {formatDate(post.publishDate)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen size={11} className="text-primary" />
                              {getReadTime(post.content)} min read
                            </span>
                          </div>
                          <h2 className="text-base md:text-lg font-bold text-neutral-1 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-sm text-neutral-2 font-medium leading-relaxed line-clamp-3 flex-1">
                            {getExcerpt(post.content)}
                          </p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all mt-auto pt-1">
                            {t('blog.read_more')} <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[300px] xl:w-[320px] shrink-0 space-y-6 mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-28 space-y-6">

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">{t('blog.search_title')}</h3>
              <div className="relative">
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('blog.search_placeholder')}
                  className="h-11 bg-[#F7F7F7] border-none rounded-xl pl-10 pr-10 text-neutral-1 font-medium text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-2/60 w-4 h-4 pointer-events-none" />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-2 hover:text-neutral-1 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              {isFetching && searchInput && (
                <p className="text-xs text-neutral-2 flex items-center gap-1.5">
                  <Loader2 size={11} className="animate-spin" /> Searching...
                </p>
              )}
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">{t('blog.categories')}</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory('')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
                      activeCategory === ''
                        ? 'bg-primary/10 text-primary'
                        : 'text-neutral-2 hover:bg-gray-50 hover:text-neutral-1'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Tag size={13} className={activeCategory === '' ? 'text-primary' : 'text-neutral-2/50 group-hover:text-neutral-2'} />
                      All Posts
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      activeCategory === '' ? 'bg-primary text-white' : 'bg-gray-100 text-neutral-2'
                    }`}>
                      {allPosts.length}
                    </span>
                  </button>
                  {categories.map((cat: string) => {
                    const count = allPosts.filter((p: BlogPost) => p.category === cat).length;
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(isActive ? '' : cat)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-neutral-2 hover:bg-gray-50 hover:text-neutral-1'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 text-left">
                          <Tag size={13} className={isActive ? 'text-primary' : 'text-neutral-2/50 group-hover:text-neutral-2'} />
                          {cat}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive ? 'bg-primary text-white' : 'bg-gray-100 text-neutral-2'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stats */}
            {allPosts.length > 0 && (
              <div className="bg-primary rounded-2xl p-6 space-y-4 text-white">
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-70">Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-2xl font-black">{allPosts.length}</p>
                    <p className="text-xs font-medium opacity-70">Total Articles</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black">{categories.length}</p>
                    <p className="text-xs font-medium opacity-70">Categories</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}
