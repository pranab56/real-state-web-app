'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Combobox } from '@/components/ui/combobox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllListingsQuery, useGetSingleListingQuery } from '@/features/listings/listingsApi';
import { useCreateReservationMutation } from '@/features/reservation/page';
import { useCreateReviewMutation, useGetReviewsByPropertyQuery } from '@/features/review/reviewApi';
import { useCreateWishlistToggleMutation } from '@/features/wishlists/wishlistsApi';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { cn, getFullAddress } from '@/lib/utils';
import { ApiError, Hotel, Review, RootState } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { useLazyGetExchangeRatesQuery } from '@/utils/exchangeRateApi';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  Heart,
  Info,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  User,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import type { Swiper as SwiperType } from 'swiper';

interface LocalGoogleMaps {
  Map: new (container: HTMLElement, options: {
    center: { lat: number; lng: number };
    zoom: number;
    disableDefaultUI?: boolean;
    clickableIcons?: boolean;
  }) => google.maps.Map;
  Marker: new (options: {
    position: { lat: number; lng: number };
    map: google.maps.Map;
    title: string;
  }) => unknown;
}

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as z from 'zod';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getAvatarSrc = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const getRatingLabel = (r: number) => {
  if (r >= 5) return { label: 'Excellent', color: 'bg-green-50 text-green-600' };
  if (r >= 4) return { label: 'Very Good', color: 'bg-blue-50 text-blue-600' };
  if (r >= 3) return { label: 'Good', color: 'bg-yellow-50 text-yellow-600' };
  if (r >= 2) return { label: 'Fair', color: 'bg-orange-50 text-orange-600' };
  return { label: 'Poor', color: 'bg-red-50 text-red-500' };
};

const DatePicker = ({
  label,
  date,
  setDate,
  className,
  minDate,
  error,
}: {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  minDate?: Date;
  error?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('space-y-1.5 sm:space-y-2 w-full', className)}>
      <label className="text-[10px] sm:text-xs font-medium w-full text-neutral-2 uppercase tracking-wider ml-1">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <button
            className={cn(
              'w-full h-10 sm:h-12 bg-[#F6F6F6] border flex items-center justify-start text-left font-medium shadow-none hover:border-primary/30 hover:bg-[#EFEFEF] transition-all px-3 sm:px-4 rounded-lg text-xs sm:text-sm cursor-pointer',
              error ? 'border-red-500' : 'border-gray-200',
              !date ? 'text-neutral-2' : 'text-neutral-1'
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-(--anchor-width) p-0 rounded-xl shadow-2xl border-none overflow-hidden ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { setDate(d); setOpen(false); }}
            disabled={minDate ? { before: minDate } : undefined}
            className="w-full rounded-xl border-none"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
    </div>
  );
};

const replySchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
});
type ReplyFormValues = z.infer<typeof replySchema>;

const CURRENCY_OPTIONS = ['USD', 'ETB'] as const;

const GUEST_OPTIONS = [
  { value: '1', label: '1 Adult, 0 Children', guests: { adults: 1, children: 0, pets: 0 } },
  { value: '2', label: '2 Adults, 0 Children', guests: { adults: 2, children: 0, pets: 0 } },
  { value: '3', label: '3 Adults, 1 Children', guests: { adults: 3, children: 1, pets: 0 } },
];

const ROOM_OPTIONS = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'suite', label: 'Luxury Suite' },
  { value: 'luxury_suite', label: 'Luxury Suite Plus' },
];

export default function HotelDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [bookingErrors, setBookingErrors] = useState<{ checkIn?: string; checkOut?: string }>({});
  const [guestKey, setGuestKey] = useState('2');
  const [roomClass, setRoomClass] = useState('deluxe');
  const [bookingCurrency, setBookingCurrency] = useState<typeof CURRENCY_OPTIONS[number]>('USD');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [trigger, { isFetching: isFetchingRate }] = useLazyGetExchangeRatesQuery();

  const token = useSelector((state: RootState) => state.auth?.token);
  const user = useSelector((state: RootState) => state.auth?.user);
  const isHost = user?.role === 'host';
  const { requireAuth } = useAuthGuard();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const openGallery = (idx: number) => {
    setActivePhotoIdx(idx);
    setGalleryIdx(idx);
    setShowAllPhotos(true);
  };
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [toggleWishlist] = useCreateWishlistToggleMutation();
  const [createReservation, { isLoading: isBooking }] = useCreateReservationMutation();
  const [createReview, { isLoading: isSubmittingReview }] = useCreateReviewMutation();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const userId = (() => {
    if (!token) return undefined;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload._id ?? payload.userId ?? payload.id ?? payload.sub ?? undefined;
    } catch { return undefined; }
  })();

  const { data: apiData, isLoading } = useGetSingleListingQuery({ id, userId }, { skip: !id });
  const { data: similarApiData } = useGetAllListingsQuery({ category: 'accommodation', page: 1, limit: 3 });
  const h: Hotel | undefined = apiData?.data;

  // Sync wishlist status from backend data once it loads (adjusted during render, not in an effect)
  const [prevH, setPrevH] = useState(h);
  if (h !== prevH) {
    setPrevH(h);
    if (h) setIsWishlisted(h.isWishlisted ?? false);
  }

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await trigger('USD').unwrap();
        const rate = res?.rates?.ETB;
        if (rate) setExchangeRate(rate);
      } catch (err) {
        console.error('Failed to fetch exchange rate', err);
      }
    };
    fetchRate();
  }, [trigger]);

  const images: string[] = h?.images ?? [];
  const title: string = h?.title ?? h?.name ?? '';
  const description: string = h?.description ?? '';
  const price: number | undefined = h?.price;
  const currency: string = h?.currency ?? 'ETB';

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const totalPrice = price != null ? price * (nights || 1) : 0;

  const getConvertedPrice = (amount: number) => {
    if (bookingCurrency === 'ETB' && exchangeRate) {
      return `ETB ${Math.round(amount * exchangeRate).toLocaleString()}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  };

  const handleWishlist = async () => {
    if (!requireAuth('Login required. Please log in to add to your wishlist.')) return;
    setIsWishlisted(prev => !prev);
    try {
      const res = await toggleWishlist({ property: id }).unwrap();
      setIsWishlisted(res.data?.isWishlisted ?? !isWishlisted);
      toast.success(res.message ?? 'Wishlist updated');
    } catch (err) {
      const error = err as ApiError;
      setIsWishlisted(prev => !prev);
      toast.error(getErrorMessage(error, 'Failed to update wishlist'));
    }
  };

  const handleBook = async () => {
    if (!requireAuth('Login required. Please log in to book a stay.')) return;
    if (isHost) { toast.error('Host accounts cannot book stays. Please use a customer account.'); return; }

    const nextErrors: { checkIn?: string; checkOut?: string } = {};
    if (!checkIn) nextErrors.checkIn = 'Please select a check-in date';
    if (!checkOut) nextErrors.checkOut = 'Please select a check-out date';
    if (Object.keys(nextErrors).length > 0) { setBookingErrors(nextErrors); return; }
    if (!checkIn || !checkOut) return;
    setBookingErrors({});

    const selectedGuests = GUEST_OPTIONS.find(o => o.value === guestKey)?.guests ?? { adults: 2, children: 0, pets: 0 };
    try {
      const res = await createReservation({
        property: id,
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        guests: selectedGuests,
        roomClass,
        currency: bookingCurrency,
      }).unwrap();
      toast.success(res.message ?? 'Reservation created!');
      if (res.data?.checkoutUrl) {
        router.push(res.data.checkoutUrl);
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(getErrorMessage(error, 'Failed to create reservation'));
    }
  };
  const similarList: Hotel[] = similarApiData?.data ?? [];

  const { data: reviewsData } = useGetReviewsByPropertyQuery(
    { propertyId: id, page: 1 },
    { skip: !id }
  );

  const locationCoordinates = h?.location?.coordinates;
  const mapLat = Array.isArray(locationCoordinates) && locationCoordinates.length === 2 ? locationCoordinates[1] : undefined;
  const mapLng = Array.isArray(locationCoordinates) && locationCoordinates.length === 2 ? locationCoordinates[0] : undefined;
  const hasLocation = mapLat != null && mapLng != null;

  useEffect(() => {
    if (!hasLocation || !mapContainerRef.current) return;
    const apiKey = process.env.NEXT_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key is not defined in NEXT_GOOGLE_MAPS_API_KEY');
      return;
    }

    setOptions({ key: apiKey, v: 'weekly' });
    importLibrary('maps')
      .then(() => {
        if (!window.google?.maps) return;

        const center = { lat: mapLat!, lng: mapLng! };
        const map = new window.google.maps.Map(mapContainerRef.current!, {
          center,
          zoom: 15,
          disableDefaultUI: true,
          clickableIcons: false,
        });

        new window.google.maps.Marker({
          position: center,
          map,
          title: title || 'Property Location',
        });
      })
      .catch((err) => {
        console.error('Failed to load Google Maps library', err);
      });
  }, [hasLocation, mapLat, mapLng, title]);
  const reviews: Review[] = reviewsData?.data ?? [];

  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { comment: '' },
  });

  const onReplySubmit = async (data: ReplyFormValues) => {
    if (!token) { toast.error('Please login to leave a review'); return; }
    if (isHost) { toast.error('Host accounts cannot leave reviews. Please use a customer account.'); return; }
    if (reviewRating === 0) { toast.error('Please select a rating'); return; }
    try {
      const res = await createReview({ property: id, rating: reviewRating, comment: data.comment }).unwrap();
      toast.success(res.message ?? 'Review submitted successfully');
      replyForm.reset();
      setReviewRating(0);
    } catch (err) {
      const error = err as ApiError;
      toast.error(getErrorMessage(error, 'Failed to submit review'));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  const address = h?.address;
  const addressStr = getFullAddress(address);
  const amenities: string[] = h?.amenities ?? [];
  const rating: number = h?.averageRating ?? 0;
  const ratingCount: number = h?.ratingCount ?? 0;

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-28 font-sans">
      {/* Gallery */}
      <section className="container mx-auto px-4 sm:px-6 pt-4 md:pt-12">
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 h-auto md:h-[500px]">
          <div
            className="md:col-span-8 relative aspect-[4/3] md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-xl cursor-pointer"
            onClick={() => openGallery(0)}
          >
            <Image src={getImg(images[0])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 sm:gap-6">
            <div
              className="relative aspect-square md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
              onClick={() => openGallery(1)}
            >
              <Image src={getImg(images[1])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div
              className="relative aspect-square md:aspect-auto rounded-xl md:rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
              onClick={() => openGallery(2)}
            >
              <Image src={getImg(images[2])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => openGallery(0)}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-white text-neutral-1 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg hover:bg-neutral-1 hover:text-white transition-all cursor-pointer"
            >
              <Grid2x2 size={16} />
              View all {images.length} photos
            </button>
          )}
        </div>
      </section>

      {/* All Photos Overlay */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 shrink-0 bg-black/60">
            <span className="text-white text-sm font-medium">
              {title} &middot; {galleryIdx + 1} / {images.length}
            </span>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-lg leading-none transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
          {/* Swiper fills the rest */}
          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
            <Swiper
              key={activePhotoIdx}
              modules={[SwiperPagination]}
              pagination={{ clickable: true }}
              initialSlide={activePhotoIdx}
              loop={false}
              style={{ height: '100%' }}
              onSwiper={(s) => { swiperRef.current = s; }}
              onSlideChange={(s) => setGalleryIdx(s.activeIndex)}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#000',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImg(img)}
                      alt={`${title} photo ${idx + 1}`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Prev */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={galleryIdx === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={galleryIdx === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Hotel Info & Booking */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-12 border-b border-gray-100">
          <div className="space-y-4 md:space-y-6">
            {h?.status && (
              <span className="inline-block bg-[#2B9724] text-white text-[10px] font-medium px-4 py-1.5 rounded-full shadow-lg shadow-green-500/10 capitalize">
                {h.status}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-medium text-neutral-1 tracking-tight">{title}</h1>
            {rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(rating) ? 'fill-primary text-primary' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-sm font-medium text-neutral-2">{rating.toFixed(1)} ({ratingCount} reviews)</span>
              </div>
            )}
            {addressStr && (
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-neutral-2 opacity-80">{addressStr}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:text-right">
            {price != null && (
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-medium text-neutral-1">
                    {currency} {price.toLocaleString()}
                    <span className="text-xs sm:text-sm text-neutral-2 font-medium opacity-60"> / night</span>
                  </h2>
                </div>
                <PriceConvertButton price={price} currency={currency} />
              </div>
            )}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleWishlist}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110 border-2 ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-[#F7F7F7] border-transparent text-neutral-2 hover:bg-primary hover:text-white'}`}
              >
                <Heart size={20} className={`sm:w-6 sm:h-6 ${isWishlisted ? 'fill-red-500' : ''}`} />
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
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-1">Description</h3>
                <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed">{description}</p>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-neutral-1">Popular Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4 bg-[#F7F7F7] p-4 sm:p-6 rounded-lg">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-neutral-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {hasLocation && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-medium text-neutral-1">Location</h3>

                </div>
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  <div ref={mapContainerRef} className="w-full h-[360px]" />
                </div>
              </div>
            )}

            {/* Guest Reviews */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-1">Guest Reviews</h3>
                {ratingCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.round(rating) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-2">{rating.toFixed(1)} ({ratingCount})</span>
                  </div>
                )}
              </div>

              {reviews.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquare size={24} className="text-gray-300" />
                  </div>
                  <p className="text-neutral-2 font-medium text-sm">No reviews yet.</p>
                </div>
              )}

              {reviews.length > 0 && (
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {reviews.slice(0, 2).map((review: Review, idx: number) => {
                    const customer = review.customer ?? {};
                    const avatarSrc = getAvatarSrc(customer.image);
                    const initials = getInitials(customer.firstName, customer.lastName);
                    const displayName = `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim() || customer.email || 'Anonymous';
                    const dateStr = review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : '';
                    const ratingInfo = getRatingLabel(review.rating ?? 0);

                    return (
                      <div key={review._id ?? idx} className="flex gap-4 p-5 md:p-6">
                        <div className="shrink-0">
                          {avatarSrc ? (
                            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-100">
                              <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                              {initials !== '?' ? (
                                <span className="text-primary font-medium text-sm">{initials}</span>
                              ) : (
                                <User size={16} className="text-primary" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-neutral-1">{displayName}</span>
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ratingInfo.color}`}>
                                {ratingInfo.label}
                              </span>
                            </div>
                            <span className="text-xs text-neutral-2 font-medium whitespace-nowrap">{dateStr}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} className={i < (review.rating ?? 0) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'} />
                            ))}
                            <span className="text-xs text-neutral-2 font-medium ml-1">{review.rating}/5</span>
                          </div>
                          <p className="text-sm text-neutral-2 font-medium leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {(ratingCount ?? reviews.length) > 2 && (
                <Link
                  href={`/hotels/${id}/reviews`}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-neutral-1 hover:border-primary hover:text-primary transition-all"
                >
                  See All {ratingCount} Reviews
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>

            {/* Leave A Reply */}
            <div className="space-y-8 bg-[#FDFDFD] p-10 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-medium text-neutral-1">Leave A Review</h3>
              {isHost && (
                <div className="flex items-start gap-2.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-xl px-4 py-3">
                  <Info size={16} className="mt-0.5 shrink-0" />
                  <p>You&apos;re signed in with a host account. Switch to a customer account to leave a review.</p>
                </div>
              )}
              <form className="space-y-6" onSubmit={replyForm.handleSubmit(onReplySubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        disabled={isHost}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer p-0.5 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50"
                      >
                        <Star
                          size={28}
                          className={star <= (hoverRating || reviewRating) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Your Review</label>
                  <Textarea
                    placeholder="Write comments here..."
                    disabled={isHost}
                    {...replyForm.register('comment')}
                    className={`min-h-[150px] bg-[#F6F6F6] border-none rounded-lg p-6 font-medium resize-none shadow-none disabled:opacity-50 disabled:cursor-not-allowed ${replyForm.formState.errors.comment ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {replyForm.formState.errors.comment && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{replyForm.formState.errors.comment.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingReview || isHost}
                  className="h-12 px-10 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isSubmittingReview ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : isHost ? 'Reviews Unavailable' : 'Post Comment'}
                </Button>
              </form>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#FAF6F2] rounded-lg p-6 sm:p-6 space-y-8 sm:space-y-10 border border-primary/5">
              <h3 className="text-xl sm:text-2xl font-medium text-neutral-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                  <Bookmark className="w-6 h-6" />
                </div>
                Reserve Stay
              </h3>
              {isHost && (
                <div className="flex items-start gap-2.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-xl px-4 py-3">
                  <Info size={16} className="mt-0.5 shrink-0" />
                  <p>You&apos;re signed in with a host account. Switch to a customer account to book a stay.</p>
                </div>
              )}
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <DatePicker
                    className="w-full"
                    label="Check In"
                    date={checkIn}
                    setDate={(d) => { setCheckIn(d); setBookingErrors(prev => ({ ...prev, checkIn: undefined })); }}
                    minDate={new Date()}
                    error={bookingErrors.checkIn}
                  />
                  <DatePicker
                    className="w-full"
                    label="Check Out"
                    date={checkOut}
                    setDate={(d) => { setCheckOut(d); setBookingErrors(prev => ({ ...prev, checkOut: undefined })); }}
                    minDate={checkIn ?? new Date()}
                    error={bookingErrors.checkOut}
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-medium text-neutral-2 uppercase tracking-wider ml-1">Guests</label>
                  <Combobox
                    options={GUEST_OPTIONS}
                    value={guestKey}
                    onChange={setGuestKey}
                    placeholder="Select guests"
                    className="border-gray-200 hover:border-primary/30"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-medium text-neutral-2 uppercase tracking-wider ml-1">Room Type</label>
                  <Combobox
                    options={ROOM_OPTIONS}
                    value={roomClass}
                    onChange={setRoomClass}
                    placeholder="Select room type"
                    className="border-gray-200 hover:border-primary/30"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-medium text-neutral-2 uppercase tracking-wider ml-1">Currency</label>
                  <div className="flex gap-3 sm:gap-4">
                    {CURRENCY_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className={cn(
                          'flex-1 flex items-center justify-center gap-2 h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-medium cursor-pointer transition-all',
                          bookingCurrency === opt
                            ? 'bg-primary text-white border-primary'
                            : 'bg-[#F6F6F6] text-neutral-2 border-gray-200 hover:border-primary/30'
                        )}
                      >
                        <input
                          type="radio"
                          name="bookingCurrency"
                          value={opt}
                          checked={bookingCurrency === opt}
                          onChange={() => setBookingCurrency(opt)}
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {price != null && (
                  <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-primary/10">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-medium uppercase tracking-tight">
                      <span className="text-neutral-2">{getConvertedPrice(price)} / night</span>
                      {nights > 0 && <span className="text-neutral-2">{nights} night{nights > 1 ? 's' : ''}</span>}
                    </div>
                    <div className="flex justify-between pt-4 sm:pt-6 border-t border-primary/10 text-lg sm:text-xl font-medium tracking-tight">
                      <span className="text-neutral-1">Total Price</span>
                      <span className="text-primary">{getConvertedPrice(totalPrice)}</span>
                    </div>
                    {bookingCurrency === 'ETB' && isFetchingRate && (
                      <p className="text-[10px] text-neutral-2 italic animate-pulse text-center">Updating exchange rate...</p>
                    )}
                  </div>
                )}

                <Button
                  onClick={handleBook}
                  disabled={isBooking || isHost}
                  className="w-full h-14 bg-primary hover:bg-primary text-white font-medium rounded-xl transition-all active:scale-95 text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isBooking ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : isHost ? 'Booking Unavailable' : 'Proceed to CheckOut'}
                </Button>
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
              <h2 className="text-3xl sm:text-4xl font-medium text-neutral-1 tracking-tight">Top Destinations</h2>
              <p className="text-sm sm:text-base text-neutral-2 font-medium">Explore hundreds of luxury stays across the globe.</p>
            </div>
            <Link href="/hotels">
              <Button variant="outline" className="h-10 sm:h-12 px-6 sm:px-8 rounded-lg font-medium border-gray-200 hover:bg-primary hover:text-white transition-all shadow-sm w-fit">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {similarList.map((hotel: Hotel, i: number) => (
              <motion.div
                key={hotel._id ?? i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={getImg(hotel.images?.[0])} alt={hotel.title ?? hotel.name ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    {hotel.isVerified && (
                      <span className="absolute top-4 left-4 bg-[#2B9724] text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-lg">Verified</span>
                    )}
                  </div>
                </Link>
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-1.5">
                    <Link href={`/hotels/${hotel._id ?? hotel.id}`} className="text-base sm:text-lg font-medium text-neutral-1 hover:text-primary transition-colors line-clamp-1 block">
                      {hotel.title ?? hotel.name}
                    </Link>
                    {hotel.address && (
                      <div className="flex items-center gap-1.5 text-neutral-2">
                        <MapPin size={14} className="text-primary flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-medium line-clamp-1">{[hotel.address.street, hotel.address.city].filter(Boolean).join(', ')}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg sm:text-xl font-medium text-neutral-1">{hotel.currency ?? 'ETB'} {hotel.price?.toLocaleString() ?? ''}</span>
                      <span className="text-xs text-neutral-2 font-medium">/ night</span>
                      <PriceConvertButton price={hotel.price} currency={hotel.currency} />
                    </div>
                    <Link href={`/hotels/${hotel._id ?? hotel.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 px-4 sm:px-5 h-9 rounded-lg font-medium cursor-pointer text-xs sm:text-sm transition-all shadow-sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
