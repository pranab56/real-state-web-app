'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { Slider } from '@/components/ui/slider';
import { useGetAllListingsQuery, useGetTopCitisQuery } from '@/features/listings/listingsApi';
import { getCardLocation } from '@/lib/utils';
import { Hotel } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { motion } from 'framer-motion';
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Maximize2,
  Search,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

const LIMIT = 10;
const MAX_PRICE = 500000;
const MAX_AREA = 10000;
const TYPE_VISIBLE_LIMIT = 6;
const FEATURED_VISIBLE_LIMIT = 4;
const BEDROOM_VISIBLE_LIMIT = 4;
const BATHROOM_VISIBLE_LIMIT = 4;
const BEDROOM_OPTIONS = [0, 1, 2, 3, 4, 5];
const BATHROOM_OPTIONS = [0, 1, 2, 3, 4];

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop';

const STRUCTURE_TYPES = [
  'house', 'apartment', 'villa', 'penthouse',
  'office', 'shop', 'warehouse', 'farmhouse',
  'hotel', 'resort', 'guest_house', 'treehouse', 'houseboat',
];

const formatType = (t: string) =>
  t.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};


function PropertiesPageContent() {
  const sp = useSearchParams();
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllBedrooms, setShowAllBedrooms] = useState(false);
  const [showAllBathrooms, setShowAllBathrooms] = useState(false);

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
  const [areaRange, setAreaRange] = useState<number[]>(() => [
    Number(sp.get('minArea') ?? 0),
    Number(sp.get('maxArea') ?? MAX_AREA),
  ]);
  const [structureType, setStructureType] = useState(() => sp.get('structureType') ?? '');
  const [bedrooms, setBedrooms] = useState<number>(() => Number(sp.get('bedrooms') ?? 0));
  const [bathrooms, setBathrooms] = useState<number>(() => Number(sp.get('bathrooms') ?? 0));
  const [city, setCity] = useState(() => sp.get('city') ?? '');
  const [cityInput, setCityInput] = useState(() => sp.get('city') ?? '');
  const [stateInput, setStateInput] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(() => {
    const lat = sp.get('latitude');
    const lng = sp.get('longitude');
    return lat && lng ? { lat: Number(lat), lng: Number(lng) } : null;
  });

  // ── Top cities for partial city-name resolution ──
  const { data: topCitiesData } = useGetTopCitisQuery({});
  const topCities: string[] = (topCitiesData?.data ?? []).map(
    (c: { city: string; count: number }) => c.city
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resolveCity = (input: string): string => {
    if (!input) return '';
    const lower = input.toLowerCase();
    return (
      topCities.find((c) => c.toLowerCase().startsWith(lower)) ??
      topCities.find((c) => c.toLowerCase().includes(lower)) ??
      ''
    );
  };

  // debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput]);

  useEffect(() => {
    const t = setTimeout(() => { setCity(cityInput); setPage(1); }, 500);
    return () => clearTimeout(t);
  }, [cityInput]);

  useEffect(() => {
    const t = setTimeout(() => { setStateFilter(stateInput); setPage(1); }, 500);
    return () => clearTimeout(t);
  }, [stateInput]);

  useEffect(() => {
    const t = setTimeout(() => { setAreaFilter(areaInput); setPage(1); }, 500);
    return () => clearTimeout(t);
  }, [areaInput]);

  // Handle filter updates
  const handlePriceChange = (v: number | readonly number[]) => {
    const val = Array.isArray(v) ? [...v] : [v];
    setPriceRange(val);
    setPage(1);
  };

  const handleAreaChange = (v: number | readonly number[]) => {
    const val = Array.isArray(v) ? [...v] : [v];
    setAreaRange(val);
    setPage(1);
  };

  const handleStructureTypeChange = (type: string) => {
    setStructureType(structureType === type ? '' : type);
    setPage(1);
  };

  const handleBedroomsChange = (n: number) => {
    setBedrooms(n);
    setPage(1);
  };

  const handleBathroomsChange = (n: number) => {
    setBathrooms(n);
    setPage(1);
  };

  const queryArgs = {
    category: 'listing',
    page,
    limit: LIMIT,
    ...(searchTerm && { searchTerm }),
    ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
    ...(priceRange[1] < MAX_PRICE && { maxPrice: priceRange[1] }),
    ...(areaRange[0] > 0 && { minArea: areaRange[0] }),
    ...(areaRange[1] < MAX_AREA && { maxArea: areaRange[1] }),
    ...(structureType && { structureType }),
    ...(bedrooms > 0 && { bedrooms }),
    ...(bathrooms > 0 && { bathrooms }),
    ...(city && { city }),
    ...(stateFilter && { state: stateFilter }),
    ...(areaFilter && { area: areaFilter }),
    ...(coords && { latitude: coords.lat, longitude: coords.lng }),
  };

  const { data, isLoading, isFetching } = useGetAllListingsQuery(queryArgs);

  // Parallel city search — frontend merges name + city results for the same input
  const cityQueryArgs = {
    category: 'listing',
    page,
    limit: LIMIT,
    city: searchTerm,
    ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
    ...(priceRange[1] < MAX_PRICE && { maxPrice: priceRange[1] }),
    ...(areaRange[0] > 0 && { minArea: areaRange[0] }),
    ...(areaRange[1] < MAX_AREA && { maxArea: areaRange[1] }),
    ...(structureType && { structureType }),
    ...(bedrooms > 0 && { bedrooms }),
    ...(bathrooms > 0 && { bathrooms }),
  };
  const { data: cityData } = useGetAllListingsQuery(cityQueryArgs, { skip: !searchTerm });

  const { data: featuredData } = useGetAllListingsQuery({ category: 'listing', page: 1, limit: 5 });

  const nameResults: Hotel[] = data?.data ?? [];
  const seenIds = new Set(nameResults.map((n) => n._id ?? n.id ?? ''));
  const uniqueCityResults: Hotel[] = (cityData?.data ?? []).filter(
    (c: Hotel) => !seenIds.has(c._id ?? c.id ?? '')
  );
  const listings: Hotel[] = [...nameResults, ...uniqueCityResults];

  useEffect(() => {
    if (!data?.data) return;
    const initialWishlisted = new Set<string>(
      data.data
        .filter((item: Hotel) => item.isWishlisted)
        .map((item: Hotel) => item._id ?? item.id ?? '')
        .filter((id: string) => id !== '')
    );
    const currentSerialized = Array.from(wishlisted).sort().join(',');
    const newSerialized = Array.from(initialWishlisted).sort().join(',');
    if (currentSerialized !== newSerialized) {
      Promise.resolve().then(() => {
        setWishlisted(initialWishlisted);
      });
    }
  }, [data, wishlisted]);
  const total: number = (data?.pagination?.total ?? 0) + uniqueCityResults.length;
  const totalPages = Math.max(1, data?.pagination?.totalPage ?? Math.ceil(total / LIMIT));
  const showing = { start: (page - 1) * LIMIT + 1, end: Math.min(page * LIMIT, total) };
  const featuredList: Hotel[] = featuredData?.data ?? [];

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

  const clearAllFilters = () => {
    setSearchInput('');
    setPriceRange([0, MAX_PRICE]);
    setAreaRange([0, MAX_AREA]);
    setStructureType('');
    setBedrooms(0);
    setBathrooms(0);
    setCityInput(''); setCity('');
    setStateInput(''); setStateFilter('');
    setAreaInput(''); setAreaFilter('');
    setCoords(null);
    setPage(1);
  };

  const hasActiveFilters =
    searchInput || priceRange[0] > 0 || priceRange[1] < MAX_PRICE ||
    areaRange[0] > 0 || areaRange[1] < MAX_AREA || structureType || bedrooms > 0 || bathrooms > 0 ||
    cityInput || stateInput || areaInput || coords;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#1E2024] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" alt="Properties Hero" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2024] via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-white">Properties</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: 'Listing <span class="text-primary">Property</span>' }} />
            <p className="text-sm md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed">Discover your perfect match from our exclusive collection of verified premium properties across Ethiopia.</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:pb-24 lg:flex gap-12">
        {/* ── Sidebar ── */}
        <aside className="lg:w-[320px] flex-shrink-0 space-y-6 mb-10 lg:mb-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-1">Property Search</h2>
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
                placeholder="Search By Property And City"
                className="w-full h-12 bg-[#F7F7F7] border-none rounded-sm pl-12 pr-4 text-neutral-1 font-medium text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2" size={20} />
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-1">Price Range from</h3>
                <span className="text-xs font-medium text-primary">
                  {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()} ETB
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={MAX_PRICE}
                step={5000}
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

            {/* Structure Type */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-1 uppercase tracking-wider">Property Type</h3>
              <div className="flex flex-wrap gap-2">
                {(showAllTypes ? STRUCTURE_TYPES : STRUCTURE_TYPES.slice(0, TYPE_VISIBLE_LIMIT)).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleStructureTypeChange(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${structureType === type
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F7F7F7] text-neutral-2 border-transparent hover:border-primary/30 hover:text-primary'
                      }`}
                  >
                    {formatType(type)}
                  </button>
                ))}
                {STRUCTURE_TYPES.length > TYPE_VISIBLE_LIMIT && (
                  <button
                    onClick={() => setShowAllTypes((prev) => !prev)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border border-dashed border-primary/40 text-primary hover:bg-primary/5"
                  >
                    {showAllTypes ? 'Show Less' : `+${STRUCTURE_TYPES.length - TYPE_VISIBLE_LIMIT} More`}
                  </button>
                )}
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-1 uppercase tracking-wider">Bedrooms</h3>
              <div className="flex gap-2 flex-wrap">
                {(showAllBedrooms ? BEDROOM_OPTIONS : BEDROOM_OPTIONS.slice(0, BEDROOM_VISIBLE_LIMIT)).map((n) => (
                  <button
                    key={n}
                    onClick={() => handleBedroomsChange(n)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all border cursor-pointer ${bedrooms === n
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F7F7F7] text-neutral-2 border-transparent hover:border-primary/30'
                      }`}
                  >
                    {n === 0 ? 'Any' : n}
                  </button>
                ))}
                {BEDROOM_OPTIONS.length > BEDROOM_VISIBLE_LIMIT && (
                  <button
                    onClick={() => setShowAllBedrooms((prev) => !prev)}
                    className="px-3 h-10 rounded-lg text-xs font-medium transition-all border border-dashed border-primary/40 text-primary hover:bg-primary/5 cursor-pointer"
                  >
                    {showAllBedrooms ? 'Show Less' : `+${BEDROOM_OPTIONS.length - BEDROOM_VISIBLE_LIMIT} More`}
                  </button>
                )}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-1 uppercase tracking-wider">Bathrooms</h3>
              <div className="flex gap-2 flex-wrap">
                {(showAllBathrooms ? BATHROOM_OPTIONS : BATHROOM_OPTIONS.slice(0, BATHROOM_VISIBLE_LIMIT)).map((n) => (
                  <button
                    key={n}
                    onClick={() => handleBathroomsChange(n)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all border cursor-pointer ${bathrooms === n
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F7F7F7] text-neutral-2 border-transparent hover:border-primary/30'
                      }`}
                  >
                    {n === 0 ? 'Any' : n}
                  </button>
                ))}
                {BATHROOM_OPTIONS.length > BATHROOM_VISIBLE_LIMIT && (
                  <button
                    onClick={() => setShowAllBathrooms((prev) => !prev)}
                    className="px-3 h-10 rounded-lg text-xs font-medium transition-all border border-dashed border-primary/40 text-primary hover:bg-primary/5 cursor-pointer"
                  >
                    {showAllBathrooms ? 'Show Less' : `+${BATHROOM_OPTIONS.length - BATHROOM_VISIBLE_LIMIT} More`}
                  </button>
                )}
              </div>
            </div>

            {/* Area Range */}
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-1">Size Range from</h3>
                <span className="text-xs font-medium text-primary">
                  {areaRange[0].toLocaleString()} – {areaRange[1].toLocaleString()} SqFt
                </span>
              </div>
              <Slider
                value={areaRange}
                onValueChange={handleAreaChange}
                min={0}
                max={MAX_AREA}
                step={100}
              />
            </div>

          </div>

          {/* Featured mini list */}
          <div className="border border-gray-100 bg-white p-6 rounded-2xl space-y-6">
            <h3 className="font-medium text-neutral-1">Featured Homes</h3>
            {featuredList.length === 0 ? (
              <p className="text-sm text-neutral-2 text-center py-4">No featured properties</p>
            ) : (
              <div
                className={`space-y-6 ${featuredList.length > FEATURED_VISIBLE_LIMIT ? 'max-h-[360px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}
              >
                {featuredList.map((item: Hotel, idx: number) => (
                  <Link href={`/properties/${item._id ?? item.id}`} key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-50 last:border-none pb-4 last:pb-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={getImg(item.images?.[0])} alt={item.title ?? item.name ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-neutral-1 group-hover:text-primary transition-colors line-clamp-1">{item.title ?? item.name}</h4>
                      <p className="text-[10px] text-neutral-2 font-medium uppercase tracking-wider">
                        {item.listing?.bedrooms ?? 0} Beds | {item.listing?.bathrooms ?? 0} Baths
                      </p>
                      <p className="text-sm font-black text-primary">{item.currency ?? 'ETB'} {item.price?.toLocaleString() ?? ''}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 space-y-8 mt-10 md:mt-12 lg:mt-0">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-100 gap-4">
            {isLoading || isFetching ? (
              <span className="text-neutral-2 font-medium italic text-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading...</span>
            ) : (
              <span className="text-neutral-2 font-medium italic text-[13px] md:text-sm" dangerouslySetInnerHTML={{ __html: `Showing <span class="text-neutral-1 font-medium not-italic">${showing.start}-${showing.end}</span> of <span class="text-neutral-1 font-medium not-italic">${total}</span> properties` }} />
            )}
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-xs text-neutral-2 hover:text-primary font-medium flex items-center gap-1 transition-colors">
                <X size={12} /> Reset filters
              </button>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={40} className="animate-spin text-primary" />
            </div>
          )}

          {!isLoading && listings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-neutral-2 font-medium text-lg">No properties found.</p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="h-10 px-6 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {!isLoading && listings.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
              {listings.map((item: Hotel, index: number) => (
                <motion.div key={item._id ?? item.id ?? index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Link href={`/properties/${item._id ?? item.id}`} className="group block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 relative">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={getImg(item.images?.[0])} alt={item.title ?? item.name ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.isVerified && <span className="bg-[#2B9724] text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-lg">Zila Verified</span>}
                        {item.listing?.purpose && <span className="bg-primary text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-lg capitalize">{item.listing.purpose.replace('_', ' ')}</span>}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl sm:text-2xl font-black text-neutral-1">{item.currency ?? 'ETB'} {item.price?.toLocaleString() ?? ''}</h3>
                          <PriceConvertButton price={item.price} currency={item.currency} />
                        </div>
                        <p className="text-base sm:text-lg font-medium text-neutral-1 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                          {item.title ?? item.name}
                        </p>
                        <div className="flex items-start gap-1.5 text-neutral-2">
                          <MapPin size={16} className="mt-1 flex-shrink-0 text-primary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <p className="font-medium text-[13px] sm:text-sm italic line-clamp-1">
                            {getCardLocation(item.address)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-neutral-2 gap-1">
                        <div className="flex items-center gap-1 font-medium text-[9px] sm:text-[10px] uppercase tracking-wider">
                          <BedDouble className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span>Beds <span className="text-neutral-1 font-black">{item.listing?.bedrooms ?? 0}</span></span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-[9px] sm:text-[10px] uppercase tracking-wider">
                          <Bath className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span>Baths <span className="text-neutral-1 font-black">{item.listing?.bathrooms ?? 0}</span></span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-[9px] sm:text-[10px] uppercase tracking-wider">
                          <Maximize2 className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span>Sqft <span className="text-neutral-1 font-black">{item.listing?.totalArea ?? 0}</span></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-8 sm:pt-12">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="flex items-center gap-1 sm:gap-2 p-2 px-3 sm:px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-medium text-xs sm:text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex items-center gap-1 sm:gap-2">
                {pageNumbers().map((p, idx) =>
                  p === '...' ? (
                    <span key={idx} className="px-1 sm:px-2 text-neutral-2">...</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-medium text-xs sm:text-sm cursor-pointer transition-all ${page === p ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-neutral-2 hover:bg-gray-50'}`}>{p}</button>
                  )
                )}
              </div>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="flex items-center gap-1 sm:gap-2 p-2 px-3 sm:px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-medium text-xs sm:text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}
