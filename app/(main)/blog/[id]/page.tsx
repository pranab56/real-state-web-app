'use client';

import { Input } from '@/components/ui/input';
import { useGetAllCategoryQuery, useGetSingleBlogQuery } from '@/features/blog/blogsApi';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Clock, Loader2, Search, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BlogPost } from '@/types';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

const getReadTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const { data: blogData, isLoading } = useGetSingleBlogQuery(id, { skip: !id });
  const { data: categoryData } = useGetAllCategoryQuery(undefined);
  const blog: BlogPost | undefined = blogData?.data;
  const categories: string[] = categoryData?.data ?? [];

  const extraImages: string[] = blog?.images?.slice(1) ?? [];
  const readTime = blog ? getReadTime(blog.content) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 size={44} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <BookOpen size={26} className="text-gray-300" />
        </div>
        <p className="text-neutral-1 font-semibold text-lg">Blog post not found</p>
        <Link href="/blog" className="text-primary font-semibold hover:underline text-sm">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-18 ">

      {/* Hero */}
      <section className="relative w-full h-[340px] md:h-[480px] lg:h-[560px] overflow-hidden">
        <Image
          src={blog.images?.[0] || ""}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-6 pb-8 md:pb-12 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {blog.category && (
                <span className="text-[11px] font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wide shadow">
                  {blog.category}
                </span>
              )}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl"
            >
              {blog.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-white/80">
              {blog.authorName && (
                <span className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {blog.authorName[0]}
                  </div>
                  {blog.authorName}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" />
                {formatDate(blog.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" />
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14 lg:flex gap-10 xl:gap-14">

        {/* Article */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-2 font-medium hover:text-primary transition-colors cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
              <ArrowLeft size={15} />
            </div>
            <span className="text-sm">Back to Blog</span>
          </button>

          {/* Article card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 px-6 md:px-10 py-5 border-b border-gray-100 bg-[#FDFCFB]">
              {blog.authorName && (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black shadow-md shadow-primary/20">
                    {blog.authorName[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-2 font-medium">Author</p>
                    <p className="text-sm font-bold text-neutral-1">{blog.authorName}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-2">
                <Calendar size={14} className="text-primary" />
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-2">
                <Clock size={14} className="text-primary" />
                <span>{readTime} min read</span>
              </div>
              {blog.category && (
                <span className="ml-auto text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  {blog.category}
                </span>
              )}
            </div>

            {/* HTML content */}
            <div
              className="px-6 md:px-10 py-8 md:py-10
                [&>p]:text-[15px] [&>p]:md:text-base [&>p]:text-neutral-2 [&>p]:font-medium [&>p]:leading-[1.85] [&>p]:mb-5
                [&>h1]:text-2xl [&>h1]:md:text-3xl [&>h1]:font-black [&>h1]:text-neutral-1 [&>h1]:mb-4 [&>h1]:mt-8
                [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-black [&>h2]:text-neutral-1 [&>h2]:mb-3 [&>h2]:mt-7
                [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:font-bold [&>h3]:text-neutral-1 [&>h3]:mb-3 [&>h3]:mt-6
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:text-[15px] [&>ul>li]:text-neutral-2 [&>ul>li]:font-medium [&>ul>li]:mb-2
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:text-[15px] [&>ol>li]:text-neutral-2 [&>ol>li]:font-medium [&>ol>li]:mb-2
                [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-neutral-2 [&>blockquote]:my-6 [&>blockquote]:bg-primary/5 [&>blockquote]:py-3 [&>blockquote]:rounded-r-lg
                [&>img]:rounded-xl [&>img]:w-full [&>img]:my-6
                [&>a]:text-primary [&>a]:underline [&>a]:font-semibold
                [&>strong]:text-neutral-1 [&>strong]:font-bold
                [&>div]:text-[15px] [&>div]:text-neutral-2"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Extra images gallery */}
            {extraImages.length > 0 && (
              <div className="px-6 md:px-10 pb-8">
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">Photo Gallery</h3>
                  <div className={`grid gap-3 ${extraImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {extraImages.map((img, i) => (
                      <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden group">
                        <Image
                          src={img || ""}
                          alt={`${blog.title} image ${i + 2}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="px-6 md:px-10 pb-8">
                <div className="border-t border-gray-100 pt-6 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-2 uppercase tracking-wider mr-1">
                    <Tag size={13} className="text-primary" /> Tags
                  </span>
                  {blog.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="text-xs font-semibold text-neutral-2 bg-gray-100 hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1.5 rounded-full cursor-pointer"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Back to blog link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-2 hover:text-primary transition-colors"
          >
            <ArrowLeft size={15} /> View all articles
          </Link>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[300px] xl:w-[320px] shrink-0 space-y-6 mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-28 space-y-6">

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">Search Blog</h3>
              <div className="relative">
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchInput.trim()) {
                      router.push(`/blog?search=${encodeURIComponent(searchInput.trim())}`);
                    }
                  }}
                  placeholder="Search Now"
                  className="h-11 bg-[#F7F7F7] border-none rounded-xl pl-10 pr-10 text-neutral-1 font-medium text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-2/60 w-4 h-4 pointer-events-none" />
                <button
                  onClick={() => {
                    if (searchInput.trim()) router.push(`/blog?search=${encodeURIComponent(searchInput.trim())}`);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <Search size={14} />
                </button>
              </div>
            </div>

            {/* Author info */}
            {blog.authorName && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">About the Author</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-black shadow-md shadow-primary/20 shrink-0">
                    {blog.authorName[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-1">{blog.authorName}</p>
                    <p className="text-xs text-neutral-2 font-medium">Real Estate Writer</p>
                  </div>
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat: string) => (
                    <Link
                      key={cat}
                      href={`/blog`}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${blog.category === cat
                        ? 'bg-primary/10 text-primary'
                        : 'text-neutral-2 hover:bg-gray-50 hover:text-neutral-1'
                        }`}
                    >
                      <Tag size={13} className={blog.category === cat ? 'text-primary' : 'text-neutral-2/40 group-hover:text-neutral-2'} />
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}



          </div>
        </aside>
      </section>
    </div>
  );
}
