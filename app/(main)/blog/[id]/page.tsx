'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  Search,
  User
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Buying Tips', count: 1 },
  { name: 'Community Spotlight', count: 1 },
  { name: 'Home Construction', count: 1 },
  { name: 'Interior Inspiration', count: 1 },
  { name: 'Investment Insights', count: 1 },
  { name: 'Legal Guidance', count: 1 },
  { name: 'Market Updates', count: 1 },
];

export default function BlogDetailPage() {
  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Breadcrumbs */}
      <section className="container mx-auto px-6 py-6 border-b border-gray-50 mt-12">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-2">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <ChevronRight size={14} />
          <span className="opacity-60 truncate">Why Access Is So Important When Selling Your House</span>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:flex gap-16">
        {/* Main Content */}
        <div className="flex-1 space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl font-black text-neutral-1 leading-tight tracking-tight">
              Why Access Is So Important When Selling Your House
            </h1>
            <div className="flex items-center gap-6 text-sm font-bold text-neutral-2 italic bg-[#FDFDFD] py-3 rounded-lg border-l-2 border-primary/20 pl-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                <span>admin</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>July 23, 2025</span>
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
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop"
              alt="Feature"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-neutral-2 font-medium leading-relaxed space-y-8">
            <p>
              A home is where you make memories. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>

            <h3 className="text-2xl font-black text-neutral-1 tracking-tight">Professional Insurance and Financial Guarantees</h3>

            <p>
              To join the registry, agents and agencies must also fulfill one of the following economic solvency
              requirements:
            </p>

            {/* Quote Card */}
            <blockquote className="relative bg-[#FAF6F2] py-8 px-10 rounded-lg border-l-[6px] border-primary shadow-sm">
              <p className="text-lg font-bold text-primary italic leading-relaxed m-0">
                Our range of services includes a professional property valuation. We will make a detailed
                inspection and advise you on home staging, and also give you the benefit of our excellent,
                highly reliable data on supply, demand and values in the local market.
              </p>
            </blockquote>

            <p>
              Have a civil liability insurance policy to respond for the damages that may be caused in the exercise of
              their activity, with a minimum capital to be insured of 30,000 euros per establishment.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[350px] space-y-10 mt-12 lg:mt-0">

          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-100 p-8 space-y-6 shadow-xl shadow-black/5">
            <h3 className="text-xl font-black text-neutral-1">Search Blog</h3>
            <div className="relative">
              <Input
                placeholder="Search Now"
                className="h-14 bg-[#F7F7F7] border-none rounded-lg pl-12 pr-4 text-neutral-1 font-bold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2" size={20} />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg border border-gray-100 p-8 space-y-8 shadow-xl shadow-black/5">
            <h3 className="text-xl font-black text-neutral-1 border-b border-gray-50 pb-4">Categories</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1">
                  <span className="text-sm font-bold text-neutral-2 group-hover:text-primary transition-colors">{cat.name}</span>
                  <span className="text-sm font-black text-neutral-1 opacity-40 group-hover:opacity-100">({cat.count})</span>
                </div>
              ))}
            </div>
            <Button className="w-full bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-black h-14 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 text-lg">
              Send Inquiry
            </Button>
          </div>

          {/* Connect Card */}
          <div className="relative rounded-lg overflow-hidden min-h-[450px] flex flex-col justify-end group shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&h=1200&fit=crop"
              alt="Real Estate Agent"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative p-8 space-y-6 text-white">
              <h3 className="text-2xl font-black leading-tight">We can help you find a local real estate agent</h3>
              <p className="text-sm font-bold text-white/70 leading-relaxed italic">
                Connect with a trusted agent who knows the market inside out - whether you're buying or selling.
              </p>
              <Button className="w-full bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-black h-14 rounded-lg shadow-xl shadow-primary/40 transition-all group-hover:translate-y-[-4px]">
                Connect with an agent
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
