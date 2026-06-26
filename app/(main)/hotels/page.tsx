'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetAllListingsQuery } from '@/features/listings/listingsApi';
import { useCreateWishlistToggleMutation } from '@/features/wishlists/wishlistsApi';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
  Star,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Hotel, RootState } from '@/types';

const LIMIT = 6;
const MAX_PRICE = 50000;
const TYPE_VISIBLE_LIMIT = 6;

const HOTEL_TYPES = [
  'house', 'apartment', 'villa', 'penthouse',
  'office', 'shop', 'warehouse', 'farmhouse',
  'hotel', 'resort', 'guest_house', 'treehouse', 'houseboat',
];

const formatType = (t: string) =>
  t.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

function HotelsPageContent() {
  const { t } = useTranslation('common');
  const sp = useSearchParams();
  const token = useSelector((state: RootState) => state.auth?.token);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [toggleWishlist] = useCreateWishlistToggleMutation();
  const [showAllTypes, setShowAllTypes] = useState(false);

  const handleWishlist = async (id: string) => {
    if (!token) { toast.error('Please login to add to wishlist'); return; }
    setWishlisted(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
    try {
      const res = await toggleWishlist({ property: id }).unwrap();
      toast.success(res.message ?? 'Wishlist updated');
    } catch {
      setWishlisted(prev => {
        const s = new Set(prev);
        if (s.has(id)) s.delete(id);
        else s.add(id);
        return s;
      });
      toast.error('Failed to update wishlist');
    }
  };

  // ── Mobile filter toggle ──
  const [showFilters, setShowFilters] = useState(false);

  // ── Pagination & search — initialise from URL params ──
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(() => sp.get('searchTerm') ?? '');
  const [searchTerm, setSearchTerm] = useState(() => sp.get('searchTerm') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Filters — initialise from URL params ──
  const [priceRange, setPriceRange] = useState<number[]>(() => [
    Number(sp.get('minPrice') ?? 0),
    Number(sp.get('maxPrice') ?? MAX_PRICE),
  ]);
  const [structureType, setStructureType] = useState(() => sp.get('structureType') ?? '');
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);

  // debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput]);

  // Handle filter changes and reset page
  const handlePriceChange = (v: number[]) => {
    setPriceRange(v);
    setPage(1);
  };

  const handleStructureTypeChange = (type: string) => {
    setStructureType(structureType === type ? '' : type);
    setPage(1);
  };

  const { data, isLoading, isFetching } = useGetAllListingsQuery({
    category: 'accommodation',
    page,
    limit: LIMIT,
    ...(searchTerm && { searchTerm }),
    ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
    ...(priceRange[1] < MAX_PRICE && { maxPrice: priceRange[1] }),
    ...(structureType && { structureType }),
  });

  // Rating is client-side since API doesn't expose a rating filter param
  const rawHotels: Hotel[] = data?.data ?? [];

  useEffect(() => {
    if (!data?.data) return;
    const initialWishlisted = new Set<string>(
      data.data
        .filter((h: Hotel) => h.isWishlisted)
        .map((h: Hotel) => h._id ?? h.id ?? '')
        .filter((id: string) => id !== '')
    );
    // Use a small delay or check to avoid synchronous setState warning
    const currentSerialized = Array.from(wishlisted).sort().join(',');
    const newSerialized = Array.from(initialWishlisted).sort().join(',');
    if (currentSerialized !== newSerialized) {
      Promise.resolve().then(() => {
        setWishlisted(initialWishlisted);
      });
    }
  }, [data, wishlisted]);
  const hotels = rawHotels.filter((h) => {
    if (ratingFilter.length === 0) return true;
    const r = Math.round(h.averageRating ?? h.rating ?? 0);
    return ratingFilter.includes(r);
  }).filter((h) => {
    if (!availableOnly) return true;
    return h.status === 'active' || h.status === 'available';
  });

  const total: number = data?.pagination?.total ?? 0;
  const totalPages = Math.max(1, data?.pagination?.totalPage ?? Math.ceil(total / LIMIT));
  const showing = { start: (page - 1) * LIMIT + 1, end: Math.min(page * LIMIT, total) };

  const pageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const toggleRating = (star: number) => {
    setRatingFilter((prev) => prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setPriceRange([0, MAX_PRICE]);
    setStructureType('');
    setRatingFilter([]);
    setAvailableOnly(false);
    setPage(1);
  };

  const hasActiveFilters = searchInput || priceRange[0] > 0 || priceRange[1] < MAX_PRICE || structureType || ratingFilter.length > 0 || availableOnly;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#1E2024] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" alt="Hotels Hero" fill className="object-cover opacity-40 scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2024] via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-primary transition-colors">{t('listing.hero.home')}</Link>
              <ChevronRight size={10} />
              <span className="text-white">Hotels</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: t('hotels.hero.title') }} />
            <p className="text-sm md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">{t('hotels.hero.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:pb-24 lg:flex gap-12">

        {/* Mobile filter toggle */}
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden w-full mb-8 h-12 px-5 bg-white border border-gray-100 rounded-xl flex items-center justify-between font-medium text-neutral-1 active:scale-95 transition-all">
          <div className="flex items-center gap-3"><Search size={18} className="text-primary" /><span className="text-sm">{t('hotels.sidebar.filter_search')}</span></div>
          <motion.div animate={{ rotate: showFilters ? 90 : 0 }}><ChevronRight size={16} /></motion.div>
        </button>

        {/* ── Sidebar ── */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-[300px] xl:w-[320px] flex-shrink-0 space-y-6 mb-8 lg:mb-0`}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-medium text-neutral-1">{t('hotels.sidebar.filters')}</h2>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors">
                  <X size={14} /> Clear All
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('hotels.sidebar.filter_search')}
                className="w-full h-12 bg-[#F7F7F7] border-none rounded-sm pl-12 pr-4 text-neutral-1 font-medium text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2" size={18} />
            </div>

            {/* Hotel Type */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-1 uppercase tracking-wider">Hotel Type</h3>
              <div className="flex flex-wrap gap-2">
                {(showAllTypes ? HOTEL_TYPES : HOTEL_TYPES.slice(0, TYPE_VISIBLE_LIMIT)).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleStructureTypeChange(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${structureType === type
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F7F7F7] text-neutral-2 border-transparent hover:border-primary/30 hover:text-primary'
                      }`}
                  >
                    {formatType(type)}
                  </button>
                ))}
                {HOTEL_TYPES.length > TYPE_VISIBLE_LIMIT && (
                  <button
                    onClick={() => setShowAllTypes((prev) => !prev)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border border-dashed border-primary/40 text-primary hover:bg-primary/5"
                  >
                    {showAllTypes ? 'Show Less' : `+${HOTEL_TYPES.length - TYPE_VISIBLE_LIMIT} More`}
                  </button>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-neutral-1 text-sm sm:text-base">{t('listing.sidebar.price_range')}</h3>
                <span className="text-xs font-medium text-primary">
                  {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()} ETB
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={(v) => handlePriceChange(Array.isArray(v) ? [...(v as number[])] : [v as number])}
                min={0}
                max={MAX_PRICE}
                step={500}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className="w-1/2 h-9 bg-[#F7F7F7] border-none rounded-lg px-3 text-neutral-1 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className="w-1/2 h-9 bg-[#F7F7F7] border-none rounded-lg px-3 text-neutral-1 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-4">
              <h3 className="font-medium text-neutral-1 text-sm sm:text-base">{t('hotels.sidebar.rating')}</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2].map((star) => (
                  <div
                    key={star}
                    onClick={() => toggleRating(star)}
                    className={`flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-lg transition-colors ${ratingFilter.includes(star) ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`star-${star}`}
                        checked={ratingFilter.includes(star)}
                        onCheckedChange={() => toggleRating(star)}
                        className="border-neutral-2 data-[state=checked]:bg-primary"
                      />
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(star)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        {[...Array(5 - star)].map((_, i) => <Star key={i} size={14} className="text-gray-200" />)}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-1 font-medium">{star} {t('hotels.sidebar.stars')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available now */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="font-medium text-neutral-1 text-sm sm:text-base">{t('hotels.sidebar.available')}</span>
              <Switch
                checked={availableOnly}
                onCheckedChange={setAvailableOnly}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 space-y-8 mt-12 lg:mt-0">
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100">
            {isLoading || isFetching ? (
              <span className="text-neutral-2 font-medium text-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading...</span>
            ) : (
              <span className="text-neutral-2 font-medium text-xs sm:text-base" dangerouslySetInnerHTML={{ __html: t('hotels.main.showing', { start: showing.start, end: showing.end, total }) }} />
            )}
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-xs text-neutral-2 hover:text-primary font-medium flex items-center gap-1 transition-colors">
                <X size={12} /> Reset
              </button>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={40} className="animate-spin text-primary" />
            </div>
          )}

          {!isLoading && hotels.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-neutral-2 font-medium text-lg">No hotels found.</p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="h-10 px-6 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {!isLoading && hotels.length > 0 && (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
              {hotels.map((hotel: Hotel, index: number) => {
                const isItemWishlisted = wishlisted.has(hotel._id ?? hotel.id ?? '');
                return (
                  <motion.div key={hotel._id ?? hotel.id ?? index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                    <div className="group block bg-white rounded-sm overflow-hidden border border-gray-100 hover:shadow-sm transition-all duration-500 relative">
                      <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image src={getImg(hotel.images?.[0])} alt={hotel.name ?? hotel.title ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                          {hotel.status && <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-sm capitalize">{hotel.status.replace('_', ' ')}</span>}
                        </div>
                      </Link>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleWishlist(hotel._id ?? hotel.id ?? '');
                        }}
                        className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${isItemWishlisted ? 'bg-primary text-white' : 'bg-white/80 text-neutral-1 hover:bg-primary hover:text-white'}`}
                      >
                        <Star size={16} fill={isItemWishlisted ? 'currentColor' : 'none'} />
                      </button>

                      <div className="p-4 sm:p-5 space-y-4">
                        <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                          <div className="space-y-3">
                            <h3 className="text-xl sm:text-2xl font-medium text-neutral-1 group-hover:text-primary transition-colors line-clamp-1">{hotel.name ?? hotel.title}</h3>
                            {(hotel.averageRating ?? hotel.rating ?? 0) > 0 && (
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.round(hotel.averageRating ?? hotel.rating ?? 0) ? 'fill-primary text-primary' : 'text-gray-200'} />)}
                              </div>
                            )}
                            <div className="flex items-start gap-2 text-neutral-2">
                              <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                              <p className="font-medium text-sm line-clamp-2">
                                {[hotel.address?.street, hotel.address?.city, hotel.address?.country].filter(Boolean).join(', ')}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-1">{hotel.currency ?? 'ETB'} {hotel.price?.toLocaleString() ?? ''}</span>
                              <span className="text-neutral-2 text-xs sm:text-sm font-medium">{t('hotels.main.per_night')}</span>
                            </div>
                            <PriceConvertButton price={hotel.price} currency={hotel.currency} />
                          </div>
                          <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                            <Button className="w-full bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-medium h-10 sm:h-12 px-4 sm:px-6 rounded-sm transition-all active:scale-95 text-sm sm:text-base border-none">{t('hotels.main.book_now')}</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-8 pb-12">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 px-3 sm:px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary hover:border-primary cursor-pointer transition-all font-medium text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft size={16} /><span className="hidden sm:inline">{t('listing.main.previous')}</span>
              </button>
              <div className="flex items-center gap-1 sm:gap-2">
                {pageNumbers().map((p, idx) =>
                  p === '...' ? (
                    <span key={idx} className="px-1 text-neutral-2 text-sm">...</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-sm font-medium text-xs sm:text-sm cursor-pointer transition-all ${page === p ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-neutral-2 hover:bg-gray-50'}`}>{p}</button>
                  )
                )}
              </div>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 px-3 sm:px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary hover:border-primary cursor-pointer transition-all font-medium text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                <span className="hidden sm:inline">{t('listing.main.next')}</span><ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HotelsPageContent />
    </Suspense>
  );
}
