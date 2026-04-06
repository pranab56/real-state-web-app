'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Maximize2,
  Repeat,
  Search
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const properties = [
  {
    id: 1,
    title: 'Modern Villa Lakeview',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  },
  {
    id: 2,
    title: 'Luxury Apartment Skyline',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  },
  {
    id: 3,
    title: 'Cozy Family House',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  },
  {
    id: 4,
    title: 'Beach Front Paradise',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  },
  {
    id: 5,
    title: 'Urban Chic Loft',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  },
  {
    id: 6,
    title: 'The Grand Penthouse',
    price: 'ETB165.00',
    address: '14691 Stratford Dr, Woodbridge, VA 22193',
    beds: 4,
    baths: 3,
    size: '900 m2',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&h=600&fit=crop',
    tags: ['Zila Verified', 'For Sale']
  }
];

const featuredHomes = [
  { title: 'House In Foxhall Ave', price: '$165,400', beds: 5, baths: 3, size: '1,652 SqFt', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=100&h=100&fit=crop' },
  { title: 'House In Foxhall Ave', price: '$165,400', beds: 5, baths: 3, size: '1,652 SqFt', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=100&h=100&fit=crop' },
  { title: 'House In Foxhall Ave', price: '$165,400', beds: 5, baths: 3, size: '1,652 SqFt', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=100&h=100&fit=crop' },
  { title: 'House In Foxhall Ave', price: '$165,400', beds: 5, baths: 3, size: '1,652 SqFt', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=100&h=100&fit=crop' },
  { title: 'House In Foxhall Ave', price: '$165,400', beds: 5, baths: 3, size: '1,652 SqFt', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=100&h=100&fit=crop' },
];

const SidebarSelect = ({ label }: { label: string }) => {
  const { t } = useTranslation('common');
  return (
    <Select>
      <SelectTrigger className="w-full h-12 py-6 bg-[#F7F7F7] border-none rounded-sm text-neutral-2 shadow-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="rounded">
        <SelectItem className='rounded-none py-1' value="all">{t('listing.sidebar.all', { placeholder: label })}</SelectItem>
        <SelectItem className='rounded-none py-1' value="1">Option 1</SelectItem>
        <SelectItem className='rounded-none py-1' value="2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default function PropertiesPage() {
  const { t } = useTranslation('common');



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#1E2024] overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
            alt="Properties Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2024] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-primary transition-colors">{t('listing.hero.home')}</Link>
              <ChevronRight size={10} />
              <span className="text-white">{t('listing.hero.properties')}</span>
            </div>

            <h1
              className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('listing.hero.title') }}
            />
            <p className="text-sm md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed">
              {t('listing.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:pb-24 lg:flex gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-[320px] flex-shrink-0 space-y-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-1">{t('listing.sidebar.search_title')}</h2>
              <button className="text-sm text-neutral-2 hover:text-primary transition-colors">{t('listing.sidebar.clear_all')}</button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Input
                placeholder={t('listing.sidebar.search_placeholder')}
                className="h-12 bg-[#F7F7F7] border-none rounded-sm pl-12 pr-4 text-neutral-1 font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2" size={20} />
            </div>

            {/* Basic Selects */}
            <div className="space-y-4">
              <SidebarSelect label={t('listing.sidebar.status')} />
              <SidebarSelect label={t('listing.sidebar.type')} />
              <SidebarSelect label={t('listing.sidebar.bath')} />
              <SidebarSelect label={t('listing.sidebar.bed')} />
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-neutral-1">
                  {t('listing.sidebar.price_range')} <span className="text-primary truncate">ETB100</span> {t('listing.sidebar.to')} <span className="text-primary truncate">ETB650,000</span>
                </span>
              </div>
              <Slider defaultValue={[20, 80]} max={100} step={1} className="text-primary" />
            </div>
            {/* Size Range */}
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-neutral-1">
                  {t('listing.sidebar.size_range')} <span className="text-primary truncate">500 SqFt</span> {t('listing.sidebar.to')} <span className="text-primary truncate">1,500 SqFt</span>
                </span>
              </div>
              <Slider defaultValue={[30, 70]} max={100} step={1} />
            </div>

            {/* Advanced Selects */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <SidebarSelect label={t('listing.sidebar.province')} />
              <SidebarSelect label={t('listing.sidebar.room')} />
              <SidebarSelect label={t('listing.sidebar.garage')} />
              <SidebarSelect label={t('listing.sidebar.label')} />
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-6 pt-6 border-t border-gray-50">
              <h3 className="text-sm font-bold text-neutral-1 uppercase tracking-wider">{t('listing.sidebar.amenities')}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center space-x-3 bg-[#F7F7F7] p-3 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors group/item">
                    <Checkbox id={`amenity-${i}`} className="w-5 h-5 border-gray-300 data-[state=checked]:bg-primary" />
                    <label htmlFor={`amenity-${i}`} className="text-[13px] font-bold text-neutral-2 group-hover/item:text-primary cursor-pointer transition-colors">Bed Linens</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Properties (Mini) */}
          <div className="space-y-6 border border-gray-100 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-neutral-1 mb-4">{t('listing.sidebar.featured_homes')}</h3>
            {featuredHomes.map((home, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-50 last:border-none pb-4 last:pb-0">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={home.image} alt={home.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-1 group-hover:text-primary transition-colors line-clamp-1">{home.title}</h4>
                  <p className="text-[10px] text-neutral-2 font-medium uppercase tracking-wider">
                    {home.beds} {t('featured.property.beds')} | {home.baths} {t('featured.property.baths')}
                  </p>
                  <p className="text-sm font-black text-primary">{home.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&h=1200&fit=crop"
              alt="Agent"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative p-8 space-y-6 text-white">
              <h3 className="text-2xl font-black leading-tight tracking-tight">{t('listing.sidebar.agent_title')}</h3>
              <p className="text-sm text-white/80 font-medium">{t('listing.sidebar.agent_desc')}</p>
              <Button className="w-full bg-[#F1913D] hover:bg-white hover:text-primary text-white font-bold h-12 rounded-xl transition-all">
                {t('listing.sidebar.agent_btn')}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 mt-10 md:mt-12 lg:mt-0">
          {/* List Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-100 gap-4 sm:gap-0">
            <span
              className="text-neutral-2 font-medium italic text-[13px] md:text-sm"
              dangerouslySetInnerHTML={{ __html: t('listing.main.showing', { start: 1, end: 6, total: 24 }) }}
            />
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-neutral-2 font-bold uppercase tracking-widest hidden sm:inline">{t('listing.main.sort_by')}</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px] sm:w-40 h-10 border-none bg-transparent font-bold text-neutral-1 shadow-none">
                  <SelectValue placeholder={t('listing.main.sort_placeholder')} />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  <SelectItem className='py-2' value="newest">{t('listing.main.sort_newest')}</SelectItem>
                  <SelectItem className='py-2' value="oldest">{t('listing.main.sort_oldest')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#2B9724] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">{t('featured.property.verified')}</span>
                      <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">{t('featured.categories.sale')}</span>
                    </div>
                    {/* Quick Actions Overlay */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-12 md:group-hover:translate-y-0 transition-all duration-300">
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Repeat className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Heart className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Maximize2 className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-1">{property.price}</h3>
                      <Link
                        href={`/properties/${property.id}`}
                        className="text-base sm:text-lg font-bold text-neutral-1 hover:text-primary transition-colors line-clamp-1 block leading-tight"
                      >
                        {property.title}
                      </Link>
                      <div className="flex items-start gap-1.5 text-neutral-2">
                        <MapPin size={16} className="mt-1 flex-shrink-0 text-primary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <p className="font-medium text-[13px] sm:text-sm italic">{property.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-50 text-neutral-2 gap-1 sm:gap-2">
                      <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                        <BedDouble className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="whitespace-nowrap">{t('featured.property.beds')} <span className="text-neutral-1 font-black">{property.beds}</span></span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                        <Bath className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="whitespace-nowrap">{t('featured.property.baths')} <span className="text-neutral-1 font-black">{property.baths}</span></span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                        <Maximize2 className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="whitespace-nowrap">{t('featured.property.sqft')} <span className="text-neutral-1 font-black">{property.size.split(' ')[0]}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-8 sm:pt-12">
            <button className="flex items-center gap-1 sm:gap-2 p-2 px-3 sm:px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-bold text-xs sm:text-sm cursor-pointer shadow-sm">
              <ChevronLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">{t('listing.main.previous')}</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary text-white font-black shadow-lg shadow-primary/20 cursor-pointer text-xs sm:text-base">1</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hidden min-[360px]:flex items-center justify-center text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer text-xs sm:text-base">2</button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hidden sm:flex items-center justify-center text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer text-xs sm:text-base">3</button>
              <span className="px-1 sm:px-2 text-neutral-2">...</span>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer text-xs sm:text-base">12</button>
            </div>
            <button className="flex items-center gap-1 sm:gap-2 p-2 px-3 sm:px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-bold text-xs sm:text-sm cursor-pointer shadow-sm">
              <span className="hidden sm:inline">{t('listing.main.next')}</span>
              <ChevronRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
