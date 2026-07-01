'use client';

import { PriceConvertButton } from '@/components/shared/price-convert-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { logout } from '@/features/auth/authSlice';
import { useCreateInquiryMutation } from '@/features/inquiry/inquiryApi';
import { useGetAllListingsQuery, useGetSingleListingQuery } from '@/features/listings/listingsApi';
import { useCreateReviewMutation, useGetReviewsByPropertyQuery } from '@/features/review/reviewApi';
import { useCreateWishlistToggleMutation } from '@/features/wishlists/wishlistsApi';
import { isTokenExpired, useAuthGuard } from '@/hooks/use-auth-guard';
import { ApiError, Hotel, Review, RootState } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Bath,
  BedDouble,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid2x2,
  Heart,
  Home,
  Layers,
  Loader2,
  MapPin,
  Maximize2,
  Play,
  Star,
  User,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as z from 'zod';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';

const getImg = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const OverviewItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3 sm:gap-4 bg-[#F7F7F7] p-3 sm:p-6 rounded-lg">
    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] sm:text-xs text-neutral-2 font-medium truncate">{label}</p>
      <p className="text-xs sm:text-sm font-medium text-neutral-1 truncate">{value}</p>
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">
    <span className="text-sm text-neutral-2 font-medium">{label}</span>
    <span className="text-sm font-medium text-neutral-1">{value}</span>
  </div>
);


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().min(1, 'Email is required').regex(EMAIL_RE, 'Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

const replySchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type ReplyFormValues = z.infer<typeof replySchema>;

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth?.token);
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
  const [playVideo, setPlayVideo] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [toggleWishlist] = useCreateWishlistToggleMutation();
  const [createInquiry, { isLoading: isSending }] = useCreateInquiryMutation();
  const [createReview, { isLoading: isSubmittingReview }] = useCreateReviewMutation();

  const redirectToLogin = (message = 'Your session has expired. Please login again.') => {
    dispatch(logout());
    toast.error(message);
    router.push('/login');
  };

  const tokenExpired = isTokenExpired(token);

  const userId = (() => {
    if (!token || tokenExpired) return undefined;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload._id ?? payload.userId ?? payload.id ?? payload.sub ?? undefined;
    } catch { return undefined; }
  })();

  // a logged-in session whose token has already expired should be treated as logged out
  useEffect(() => {
    if (token && tokenExpired) {
      redirectToLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpired]);

  const { data: apiData, isLoading } = useGetSingleListingQuery({ id, userId }, { skip: !id });
  const { data: featuredApiData } = useGetAllListingsQuery({ category: 'listing', page: 1, limit: 3, isFeatured: true, isVerified: true });
  const { data: reviewsData } = useGetReviewsByPropertyQuery({ property: id, }, { skip: !id });



  const p: Hotel | undefined = apiData?.data;

  useEffect(() => {
    if (p?.isWishlisted != null && p.isWishlisted !== isWishlisted) {
      Promise.resolve().then(() => {
        setIsWishlisted(p.isWishlisted as boolean);
      });
    }
  }, [p?.isWishlisted, isWishlisted]);

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
      if (error?.status === 401) { redirectToLogin(); return; }
      toast.error(error?.data?.message ?? 'Failed to update wishlist');
    }
  };
  const featuredList: Hotel[] = featuredApiData?.data ?? [];
  const reviews: Review[] = reviewsData?.data ?? [];

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { comment: '' },
  });

  const onContactSubmit = async (data: ContactFormValues) => {
    try {
      const res = await createInquiry({
        property: id,
        customer: { name: data.name, email: data.email, phone: data.phone },
        message: data.message,
      }).unwrap();
      toast.success(res.message ?? 'Inquiry sent successfully');
      contactForm.reset();
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to send inquiry');
    }
  };
  const onReplySubmit = async (data: ReplyFormValues) => {
    if (!requireAuth('Login required. Please log in to leave a review.')) return;
    if (reviewRating === 0) { toast.error('Please select a rating'); return; }
    try {
      const res = await createReview({ property: id, rating: reviewRating, comment: data.comment }).unwrap();
      toast.success(res.message ?? 'Review submitted successfully');
      replyForm.reset();
      setReviewRating(0);
    } catch (err) {
      const error = err as ApiError;
      if (error?.status === 401) { redirectToLogin(); return; }
      toast.error(error?.data?.message ?? 'Failed to submit review');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  const images: string[] = p?.images ?? [];
  const title: string = p?.title ?? p?.name ?? '';
  const description: string = p?.description ?? '';
  const price: number | undefined = p?.price;
  const currency: string = p?.currency ?? 'ETB';
  const address = p?.address;
  const addressStr = [address?.street, address?.city, address?.country].filter(Boolean).join(', ');
  const amenities: string[] = p?.amenities ?? [];
  const status: string = p?.status ?? '';
  const isVerified: boolean = p?.isVerified ?? false;
  const ld = p?.listing ?? {};
  const landmarks: { name: string; distanceInKm: number }[] = ld.landmarks ?? [];
  const purpose: string = (ld.purpose ?? '').replace('_', ' ');

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Photo Gallery */}
      <section className="container mx-auto px-4 md:px-6 pt-6 md:pt-20">
        <div className="flex flex-col gap-8 md:gap-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-1 font-medium hover:text-primary transition-colors cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="text-sm">Back to Listings</span>
          </button>

          <div className={`relative grid grid-cols-1 gap-4 md:gap-6 h-auto md:h-[500px] ${images.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : images.length === 2 ? 'md:grid-cols-2' : ''}`}>
            <div
              className="relative h-[250px] md:h-auto rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer"
              onClick={() => openGallery(0)}
            >
              <Image src={getImg(images[0])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            {images.length >= 2 && (
              <div
                className="hidden md:block relative rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer"
                onClick={() => openGallery(1)}
              >
                <Image src={getImg(images[1])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            )}
            {images.length >= 3 && (
              <div
                className="hidden md:block relative rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer"
                onClick={() => openGallery(2)}
              >
                <Image src={getImg(images[2])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            )}
            {images.length > 0 && (
              <button
                type="button"
                onClick={() => openGallery(0)}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white text-neutral-1 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg hover:bg-neutral-1 hover:text-white transition-all cursor-pointer"
              >
                <Grid2x2 size={16} />
                View all {images.length} photos
              </button>
            )}
          </div>
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

      {/* Property Info */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 md:pb-12 border-b border-gray-100">
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-wrap gap-2">
              {isVerified && <span className="inline-block bg-[#2B9724] text-white text-[10px] font-medium px-4 py-1.5 rounded-full">Verified</span>}
              {purpose && <span className="inline-block bg-primary text-white text-[10px] font-medium px-4 py-1.5 rounded-full capitalize">{purpose}</span>}
              {status && <span className="inline-block bg-neutral-1 text-white text-[10px] font-medium px-4 py-1.5 rounded-full capitalize">{status}</span>}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-1 leading-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {ld.bedrooms != null && (
                <div className="flex items-center gap-2">
                  <BedDouble size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-2">{ld.bedrooms} Bedroom{ld.bedrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              {ld.bathrooms != null && (
                <div className="flex items-center gap-2">
                  <Bath size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-2">{ld.bathrooms} Bathroom{ld.bathrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              {ld.garage != null && (
                <div className="flex items-center gap-2">
                  <Car size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-2">{ld.garage} Garage</span>
                </div>
              )}
              {addressStr && (
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <MapPin size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-2">{addressStr}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between lg:justify-end gap-6 lg:text-right w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
            <div>
              {price != null && (
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-black text-primary uppercase">
                    {currency} {price.toLocaleString()}
                    {purpose === 'for rent' && <span className="text-xs md:text-sm text-neutral-2 font-medium lowercase"> /month</span>}
                  </h2>
                  <PriceConvertButton price={price} currency={currency} />
                </div>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3">

              <button
                onClick={handleWishlist}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer border-2 hover:scale-110 ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-[#F7F7F7] border-primary/20 text-neutral-2 hover:bg-primary hover:text-white'}`}
              >
                <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">

            {/* Description */}
            {description && (
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-neutral-1">Description</h3>
                <p className="text-neutral-2 font-medium leading-relaxed">{description}</p>
              </div>
            )}

            {/* Overview */}
            <div className="space-y-8">
              <h3 className="text-2xl font-medium text-neutral-1">Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <OverviewItem icon={Home} label="Type" value={p?.structureType ?? ''} />
                {ld.bedrooms != null && <OverviewItem icon={User} label="Bedrooms" value={`${ld.bedrooms} Rooms`} />}
                {ld.bathrooms != null && <OverviewItem icon={Bath} label="Bathrooms" value={String(ld.bathrooms)} />}
                {ld.garage != null && <OverviewItem icon={Car} label="Garages" value={String(ld.garage)} />}
                {ld.totalArea != null && <OverviewItem icon={Maximize2} label="Size" value={`${ld.totalArea} SqFt`} />}
                {ld.landArea != null && <OverviewItem icon={Maximize2} label="Land Size" value={`${ld.landArea} SqFt`} />}
                {ld.yearBuilt != null && <OverviewItem icon={Calendar} label="Year Built" value={String(ld.yearBuilt)} />}
                {p?._id && <OverviewItem icon={Layers} label="ID" value={p._id.slice(-6).toUpperCase()} />}
              </div>
            </div>

            {/* Video (only if URL exists) */}
            {p?.videoUrl && (
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-neutral-1">Video</h3>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                  {playVideo ? (
                    <video
                      src={getImg(p.videoUrl)}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayVideo(true)}
                      className="absolute inset-0 w-full h-full group cursor-pointer"
                    >
                      <Image src={getImg(images[0])} alt="Video" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                          <Play size={32} fill="currentColor" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Verified Badge */}
            {isVerified && (
              <div className="bg-[#F7F7F7] rounded-lg p-5 flex items-center gap-8 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-neutral-1 flex items-center justify-center text-white flex-shrink-0">
                  <Image src="/icons/checkMark.png" alt="Zila" width={32} height={32} />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-neutral-1">ZilaHomes Verified</h4>
                  <p className="text-neutral-2 text-sm font-medium">This property has been personally verified by our team. Ownership, availability, and listing details have been confirmed.</p>
                  {p?.verifiedAt && (
                    <p className="text-xs text-neutral-2 mt-2 flex items-center gap-1 italic">
                      <Clock size={12} /> Verified on: {new Date(p.verifiedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl font-medium text-neutral-1">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                  {p?._id && <DetailRow label="Property ID:" value={p._id.slice(-8).toUpperCase()} />}
                  {price != null && <DetailRow label="Price:" value={`${currency} ${price.toLocaleString()}`} />}
                  {ld.totalArea != null && <DetailRow label="Property Size:" value={`${ld.totalArea} SqFt`} />}
                  {ld.yearBuilt != null && <DetailRow label="Year Built:" value={String(ld.yearBuilt)} />}
                  {p?.structureType && <DetailRow label="Property Type:" value={p.structureType} />}
                  {ld.garage != null && <DetailRow label="Garage:" value={String(ld.garage)} />}
                </div>
                <div>
                  {ld.bathrooms != null && <DetailRow label="Bathrooms:" value={String(ld.bathrooms)} />}
                  {ld.bedrooms != null && <DetailRow label="Bedrooms:" value={String(ld.bedrooms)} />}
                  {ld.landArea != null && <DetailRow label="Land Area:" value={`${ld.landArea} SqFt`} />}
                  {status && <DetailRow label="Status:" value={status} />}
                  {purpose && <DetailRow label="Purpose:" value={purpose} />}
                  {address?.city && <DetailRow label="City:" value={address.city} />}
                </div>
              </div>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-neutral-1">Amenities and Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F7F7F7] p-4 rounded-xl">
                      <Zap size={18} className="text-primary shrink-0" />
                      <span className="text-sm font-medium text-neutral-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby / Landmarks */}
            {landmarks.length > 0 && (
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-2xl font-medium text-neutral-1">What&apos;s nearby?</h3>
                <p className="text-sm text-neutral-2 font-medium">Explore nearby amenities to precisely locate your property and identify surrounding conveniences.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 sm:gap-y-4">
                  {landmarks.map((lm, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-neutral-2 font-medium">{lm.name}</span>
                      <span className="text-sm font-medium text-neutral-1">{lm.distanceInKm} km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guest Reviews */}
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-medium text-neutral-1">Guest Reviews</h3>
                {(p?.ratingCount ?? 0) > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.round(p?.averageRating ?? 0) ? 'fill-primary text-primary' : 'text-gray-200 fill-gray-200'} />)}
                    </div>
                    <span className="text-sm font-medium text-neutral-1">{p?.averageRating?.toFixed(1)} ({p?.ratingCount})</span>
                  </div>
                )}
              </div>
              {reviews.length === 0 ? (
                <p className="text-neutral-2 font-medium text-sm">No reviews yet. Be the first to review!</p>
              ) : (
                <>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {reviews.slice(0, 2).map((review: Review, idx: number) => (
                      <div key={review._id ?? idx} className="flex gap-4 py-6">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User size={18} className="text-primary" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-neutral-1">
                              {review.customer
                                ? `${review.customer.firstName ?? ''} ${review.customer.lastName ?? ''}`.trim() || review.customer.email
                                : review.user?.name ?? review.user?.email ?? 'Anonymous'}
                            </span>
                            <span className="text-xs text-neutral-2">
                              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} className={i < (review.rating ?? 0) ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200'} />
                            ))}
                          </div>
                          <p className="text-sm text-neutral-2 font-medium leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {(p?.ratingCount ?? reviews.length) > 2 && (
                    <div className="flex justify-center pt-4">
                      <Link href={`/properties/${id}/reviews`}>
                        <Button variant="outline" className="h-11 px-8 rounded-lg border-gray-200 font-medium text-sm hover:border-primary hover:text-primary cursor-pointer">
                          See All {p?.ratingCount ?? reviews.length} Reviews
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Leave a Reply */}
            <div className="space-y-8 bg-[#FDFDFD] p-10 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-medium text-neutral-1">Leave A Reply</h3>
              <form className="space-y-6" onSubmit={replyForm.handleSubmit(onReplySubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer p-0.5 transition-transform hover:scale-110"
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
                    {...replyForm.register('comment')}
                    className={`min-h-[150px] bg-[#F6F6F6] border-none rounded-lg p-6 font-medium resize-none shadow-none ${replyForm.formState.errors.comment ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {replyForm.formState.errors.comment && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{replyForm.formState.errors.comment.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="h-12 px-10 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {isSubmittingReview ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Post Comment'}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#FAF6F2] rounded-lg p-10 space-y-8 sticky top-24">
              <div className="space-y-2">
                <h3 className="text-2xl font-medium text-neutral-1">Contact Owner</h3>
                <p className="text-sm text-neutral-2 font-medium italic">Reach out to the owner or agent for more details.</p>
              </div>
              <form className="space-y-4" onSubmit={contactForm.handleSubmit(onContactSubmit)}>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Name</label>
                  <Input
                    placeholder="Enter your name"
                    {...contactForm.register('name')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.name ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.name && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{contactForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Phone Number</label>
                  <Input
                    placeholder="eg: +251 912345678"
                    {...contactForm.register('phone')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.phone ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.phone && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{contactForm.formState.errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Email Address</label>
                  <Input
                    placeholder="example@gmail.com"
                    {...contactForm.register('email')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.email ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.email && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{contactForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-1 ml-1">Your Message</label>
                  <Textarea
                    placeholder="enter your message here..."
                    {...contactForm.register('message')}
                    className={`min-h-[120px] bg-white border-none rounded-sm p-6 font-medium resize-none shadow-none ${contactForm.formState.errors.message ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.message && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{contactForm.formState.errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white cursor-pointer font-medium rounded-lg shadow-lg shadow-primary/10 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Message'}
                </Button>
                <p className="text-xs text-neutral-2 font-medium text-center pt-1">
                  Please fill out the following information and we will get back to you asap!
                </p>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredList.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-8 md:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-0">
            <div className="space-y-3 md:space-y-4 text-left">
              <h2 className="text-3xl md:text-5xl font-black text-neutral-1 tracking-tight">Featured Verified Properties</h2>
              <p className="text-sm md:text-base text-neutral-2 font-medium italic">Explore all the different types of properties so you can choose the best option for you.</p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="h-12 w-full sm:w-auto px-8 cursor-pointer rounded-lg font-medium border-gray-200">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredList.map((item: Hotel, i: number) => (
              <motion.div
                key={item._id ?? i}
                className="group bg-white rounded-lg overflow-hidden shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-700"
              >
                <Link href={`/properties/${item._id ?? item.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={getImg(item.images?.[0])} alt={item.title ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.isVerified && <span className="bg-[#2B9724] text-white text-[10px] font-medium px-3 py-1.5 rounded-full uppercase">Verified</span>}
                      {item.listing?.purpose && <span className="bg-primary text-white text-[10px] font-medium px-3 py-1.5 rounded-full capitalize">{item.listing.purpose.replace('_', ' ')}</span>}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-black text-neutral-1">{item.currency ?? 'ETB'} {item.price?.toLocaleString() ?? ''}</h3>
                    <p className="text-base font-medium text-neutral-1 line-clamp-1">{item.title ?? item.name}</p>
                    <div className="flex items-center gap-2 text-neutral-2 text-sm font-medium italic">
                      <MapPin size={16} className="text-primary flex-shrink-0" />
                      <p className="line-clamp-1">{[item.address?.street, item.address?.city].filter(Boolean).join(', ')}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-neutral-2 font-medium text-xs uppercase italic opacity-60">
                      <div className="flex items-center gap-1.5"><BedDouble size={16} /><span>Beds {item.listing?.bedrooms ?? 0}</span></div>
                      <div className="flex items-center gap-1.5"><Bath size={16} /><span>Baths {item.listing?.bathrooms ?? 0}</span></div>
                      <div className="flex items-center gap-1.5"><Maximize2 size={16} /><span>m² {item.listing?.totalArea ?? 0}</span></div>
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
