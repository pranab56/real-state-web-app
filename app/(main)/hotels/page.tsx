'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  Star
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const hotels = [
  {
    id: 1,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  },
  {
    id: 2,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  },
  {
    id: 3,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  },
  {
    id: 4,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  },
  {
    id: 5,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  },
  {
    id: 6,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&h=600&fit=crop',
    rating: 5,
    tag: 'For Sale'
  }
];

export default function HotelsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#1E2024] overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            alt="Hotels Hero" 
            fill 
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2024] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-primary transition-colors">{t('listing.hero.home')}</Link>
              <ChevronRight size={10} />
              <span className="text-white">{t('hotels.hero.title').replace(/<[^>]*>?/gm, '')}</span>
            </div>
            
            <h1 
              className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('hotels.hero.title') }}
            />
            <p className="text-sm md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
              {t('hotels.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:pb-24 lg:flex gap-12">

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-8 h-12 px-5 bg-white border border-gray-100 rounded-xl flex items-center justify-between font-bold text-neutral-1 shadow-sm active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <Search size={18} className="text-primary" />
            <span className="text-sm">{t('hotels.sidebar.filter_search')}</span>
          </div>
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </button>

        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-[300px] xl:w-[320px] flex-shrink-0 space-y-10 mb-8 lg:mb-0`}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-1">{t('hotels.sidebar.filters')}</h2>
              <button className="text-sm text-neutral-2 hover:text-primary transition-colors">{t('listing.sidebar.clear_all')}</button>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs sm:text-sm font-bold text-neutral-1">
                  {t('listing.sidebar.price_range')} <span className="text-primary truncate">$100</span> {t('listing.sidebar.to')} <span className="text-primary truncate">$650,000</span>
                </span>
              </div>
              <Slider defaultValue={[20, 80]} max={100} step={1} className="text-primary" />
            </div>

            {/* Hotel Rating */}
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-1 text-sm sm:text-base">{t('hotels.sidebar.rating')}</h3>
              <div className="space-y-3 sm:space-y-4">
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`star-${star}`} className="border-neutral-2 data-[state=checked]:bg-primary" />
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(star)].map((_, i) => <Star key={i} size={14} className="sm:w-4 sm:h-4" fill="currentColor" />)}
                        {[...Array(5 - star)].map((_, i) => <Star key={i} size={14} className="sm:w-4 sm:h-4 text-gray-200" />)}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-1 font-bold">{star} {t('hotels.sidebar.stars')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h3 className="font-bold text-neutral-1 text-sm sm:text-base uppercase tracking-wider">{t('listing.sidebar.amenities')}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F7F7F7] p-3 rounded-lg cursor-pointer hover:bg-primary/5 transition-all group/item">
                    <Checkbox id={`hotel-amenity-${i}`} className="w-5 h-5 border-neutral-2 data-[state=checked]:bg-primary" />
                    <label htmlFor={`hotel-amenity-${i}`} className="text-[13px] font-bold text-neutral-2 group-hover/item:text-primary cursor-pointer transition-colors">Bed Linens</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Only */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="font-bold text-neutral-1 text-sm sm:text-base">{t('hotels.sidebar.available')}</span>
              <Switch className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 mt-12 lg:mt-0">
          {/* List Header */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100">
            <span 
              className="text-neutral-2 font-medium text-xs sm:text-base"
              dangerouslySetInnerHTML={{ __html: t('hotels.main.showing', { start: 1, end: 6, total: 24 }) }}
            />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-sm text-neutral-2 font-medium">{t('listing.main.sort_by')}</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-32 sm:w-40 h-8 sm:h-10 border-none bg-transparent font-bold text-neutral-1 shadow-none focus:ring-0">
                  <SelectValue placeholder={t('listing.main.sort_placeholder')} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem className="rounded-none py-1" value="newest">{t('listing.main.sort_newest')}</SelectItem>
                  <SelectItem className="rounded-none py-1" value="oldest">{t('listing.main.sort_oldest')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {hotels.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/hotels/${hotel.id}`}
                  className="group block bg-white rounded-sm overflow-hidden border border-gray-100 hover:shadow-sm transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Badge */}
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {hotel.tag}
                    </span>
                    {/* Quick Actions */}
                    <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-10 h-10 rounded-sm bg-white/90 backdrop-blur flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all shadow-lg">
                        <Bookmark size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-sm bg-white/90 backdrop-blur flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all shadow-lg">
                        <Search size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-1 group-hover:text-primary transition-colors line-clamp-1">{hotel.name}</h3>
                      <div className="flex items-start gap-2 text-neutral-2">
                        <MapPin size={16} className="mt-1 flex-shrink-0 text-primary sm:w-[18px] sm:h-[18px]" />
                        <p className="font-medium text-sm sm:text-base line-clamp-2">{hotel.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-neutral-1">{hotel.price}</span>
                        <span className="text-neutral-2 text-xs sm:text-sm font-medium">{t('hotels.main.per_night')}</span>
                      </div>
                      <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium h-10 sm:h-12 px-4 sm:px-6 rounded-sm transition-all active:scale-95 text-sm sm:text-base">
                        {t('hotels.main.book_now')}
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-8 sm:pt-12 pb-12">
            <button className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 px-3 sm:px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary hover:border-primary cursor-pointer transition-all font-bold text-xs sm:text-sm">
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{t('listing.main.previous')}</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-primary text-white font-medium shadow-lg shadow-primary/20 text-xs sm:text-sm">1</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer text-xs sm:text-sm">2</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer text-xs sm:text-sm">3</button>
              <span className="px-1 sm:px-2 text-neutral-2 text-xs sm:text-sm">...</span>
              <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer text-sm">12</button>
            </div>
            <button className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 px-3 sm:px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary cursor-pointer hover:border-primary transition-all font-bold text-xs sm:text-sm">
              <span className="hidden sm:inline">{t('listing.main.next')}</span>
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
