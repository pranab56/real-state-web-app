'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllListingsQuery, useGetSingleListingQuery } from '@/features/listings/listingsApi';
import { baseURL } from '@/utils/BaseURL';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Calendar as CalendarIcon,
  ChevronRight,
  Heart,
  Loader2,
  MapPin,
  Share2,
  Star,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const DatePicker = ({
  label,
  date,
  setDate,
  className,
}: {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}) => (
  <div className={cn('space-y-1.5 sm:space-y-2 w-full', className)}>
    <label className="text-[10px] sm:text-xs font-black w-full text-neutral-2 uppercase tracking-wider ml-1">{label}</label>
    <Popover>
      <PopoverTrigger>
        <button
          className={cn(
            'w-full h-10 sm:h-12 bg-white border-none flex items-center justify-start text-left font-bold shadow-none hover:bg-white active:scale-95 transition-all px-3 sm:px-4 rounded-lg text-xs sm:text-sm',
            !date ? 'text-neutral-2' : 'text-neutral-1'
          )}
        >
          <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-none">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border-none" />
      </PopoverContent>
    </Popover>
  </div>
);

export default function HotelDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const { data: apiData, isLoading } = useGetSingleListingQuery(id, { skip: !id });
  const { data: similarApiData } = useGetAllListingsQuery({ category: 'accommodation', page: 1, limit: 3 });

  const h = apiData?.data;
  const similarList: any[] = similarApiData?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  const images: string[] = h?.images ?? [];
  const title: string = h?.title ?? h?.name ?? '';
  const description: string = h?.description ?? '';
  const price: number | undefined = h?.price;
  const currency: string = h?.currency ?? 'ETB';
  const address = h?.address;
  const addressStr = [address?.street, address?.city, address?.country].filter(Boolean).join(', ');
  const amenities: string[] = h?.amenities ?? [];
  const rating: number = h?.averageRating ?? 0;
  const ratingCount: number = h?.ratingCount ?? 0;

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-28 font-sans">
      {/* Gallery */}
      <section className="container mx-auto px-4 sm:px-6 pt-4 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 h-auto md:h-[500px]">
          <div className="md:col-span-8 relative aspect-[4/3] md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-xl">
            <Image src={getImg(images[0])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 sm:gap-6">
            <div className="relative aspect-square md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-lg">
              <Image src={getImg(images[1])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative aspect-square md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-lg">
              <Image src={getImg(images[2])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Info & Booking */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-12 border-b border-gray-100">
          <div className="space-y-4 md:space-y-6">
            {h?.status && (
              <span className="inline-block bg-[#2B9724] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-green-500/10 capitalize">
                {h.status}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-neutral-1 tracking-tight">{title}</h1>
            {rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(rating) ? 'fill-primary text-primary' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-2">{rating.toFixed(1)} ({ratingCount} reviews)</span>
              </div>
            )}
            {addressStr && (
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold text-neutral-2 opacity-80">{addressStr}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:text-right">
            {price != null && (
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-neutral-1">
                  {currency} {price.toLocaleString()}
                  <span className="text-xs sm:text-sm text-neutral-2 font-bold opacity-60"> / night</span>
                </h2>
              </div>
            )}
            <div className="flex gap-2 sm:gap-3">
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-neutral-2 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                <Share2 size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-neutral-2 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                <Heart size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">

            {/* Description */}
            {description && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-1">Description</h3>
                <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed">{description}</p>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-neutral-1">Popular Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4 bg-[#F7F7F7] p-4 sm:p-6 rounded-lg">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-neutral-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews placeholder */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-1">Guest Reviews</h3>
                {ratingCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.round(rating) ? 'fill-primary text-primary' : 'text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-neutral-2">{rating.toFixed(1)} ({ratingCount})</span>
                  </div>
                )}
              </div>
              {ratingCount === 0 && (
                <p className="text-neutral-2 font-medium text-sm">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#FAF6F2] rounded-2xl p-6 sm:p-10 space-y-8 sm:space-y-10 border border-primary/5 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                  <Bookmark className="w-6 h-6" />
                </div>
                Reserve Stay
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <DatePicker className="w-full" label="Check In" date={checkIn} setDate={setCheckIn} />
                  <DatePicker className="w-full" label="Check Out" date={checkOut} setDate={setCheckOut} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-black text-neutral-2 uppercase tracking-wider ml-1">Guests</label>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-full h-10 py-6 sm:h-12 sm:py-6 bg-white border-none font-bold text-neutral-1 shadow-none transition-all active:scale-95 text-xs sm:text-sm">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="1">1 Adult, 0 Children</SelectItem>
                      <SelectItem value="2">2 Adults, 0 Children</SelectItem>
                      <SelectItem value="3">3 Adults, 1 Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-black text-neutral-2 uppercase tracking-wider ml-1">Room Type</label>
                  <Select defaultValue="deluxe">
                    <SelectTrigger className="w-full h-10 py-6 sm:h-12 bg-white border-none font-bold text-neutral-1 shadow-none transition-all active:scale-95 text-xs sm:text-sm">
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="deluxe">Deluxe Room</SelectItem>
                      <SelectItem value="suite">Luxury Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {price != null && (
                  <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-primary/10">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-neutral-2 font-extrabold">{currency} {price.toLocaleString()} / night</span>
                    </div>
                    <div className="flex justify-between pt-4 sm:pt-6 border-t border-primary/10 text-lg sm:text-xl font-black tracking-tight">
                      <span className="text-neutral-1 uppercase">Price</span>
                      <span className="text-primary">{currency} {price.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full h-14 bg-primary hover:bg-black text-white font-black rounded-xl shadow-xl shadow-primary/30 transition-all active:scale-95 text-lg uppercase tracking-tighter">
                  Book This Hotel
                </Button>
                <p className="text-center text-[10px] font-black text-neutral-2/40 uppercase tracking-widest">Verification may be required</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar Hotels */}
      {similarList.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 space-y-8 sm:space-y-12 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 sm:space-y-4 text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-1 tracking-tight">Top Destinations</h2>
              <p className="text-sm sm:text-base text-neutral-2 font-medium">Explore hundreds of luxury stays across the globe.</p>
            </div>
            <Link href="/hotels">
              <Button variant="outline" className="h-10 sm:h-12 px-6 sm:px-8 rounded-lg font-bold border-gray-200 hover:bg-primary hover:text-white transition-all shadow-sm w-fit">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {similarList.map((hotel: any, i: number) => (
              <motion.div
                key={hotel._id ?? i}
                className="group bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/[0.03] hover:shadow-primary/5 transition-all duration-700"
              >
                <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={getImg(hotel.images?.[0])} alt={hotel.title ?? hotel.name ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {hotel.isVerified && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#2B9724] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-xl tracking-widest">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-1 group-hover:text-primary transition-colors leading-none tracking-tighter">
                        {hotel.title ?? hotel.name}
                      </h3>
                      {hotel.address && (
                        <div className="flex items-center gap-2 text-neutral-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
                          <MapPin size={12} className="text-primary flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                          <p>{[hotel.address.street, hotel.address.city].filter(Boolean).join(', ')}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-gray-50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-black text-neutral-1">{hotel.currency ?? 'ETB'} {hotel.price?.toLocaleString() ?? ''}</span>
                        <span className="text-[9px] sm:text-[10px] text-neutral-2 font-bold opacity-40">/ night</span>
                      </div>
                      <Button size="sm" className="bg-primary px-4 sm:px-6 py-5 sm:py-6 rounded-lg font-black cursor-pointer hover:bg-primary/80 uppercase text-[9px] sm:text-[10px] tracking-widest transition-all shadow-lg shadow-primary/20">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
