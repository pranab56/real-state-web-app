'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllListingsQuery, useGetSingleListingQuery } from '@/features/listings/listingsApi';
import { baseURL } from '@/utils/BaseURL';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Bath,
  BedDouble,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Home,
  Layers,
  Loader2,
  MapPin,
  Maximize2,
  Play,
  Share2,
  Star,
  User,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
      <p className="text-xs sm:text-sm font-bold text-neutral-1 truncate">{value}</p>
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">
    <span className="text-sm text-neutral-2 font-medium">{label}</span>
    <span className="text-sm font-bold text-neutral-1">{value}</span>
  </div>
);

interface ReviewItemProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

const ReviewItem = ({ name, date, rating, comment, avatar }: ReviewItemProps) => (
  <div className="flex gap-6 pb-8 border-b border-gray-100 last:border-none last:pb-0">
    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
      <Image src={avatar} alt={name} fill className="object-cover" />
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-neutral-1">{name}</h4>
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={10} className="text-white" fill="currentColor" />
            </div>
          </div>
          <p className="text-xs text-neutral-2 font-medium">{date}</p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < rating ? 'fill-primary text-primary' : 'text-gray-200'} />
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral-2 font-medium leading-relaxed">{comment}</p>
    </div>
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
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').regex(EMAIL_RE, 'Invalid email address'),
  comment: z.string().min(1, 'Comment is required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type ReplyFormValues = z.infer<typeof replySchema>;

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data: apiData, isLoading } = useGetSingleListingQuery(id, { skip: !id });
  const { data: featuredApiData } = useGetAllListingsQuery({ category: 'listing', page: 1, limit: 3 });

  const p = apiData?.data;
  const featuredList: any[] = featuredApiData?.data ?? [];

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { name: '', email: '', comment: '' },
  });

  const onContactSubmit = (data: ContactFormValues) => console.log('Contact:', data);
  const onReplySubmit = (data: ReplyFormValues) => console.log('Reply:', data);

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
      <section className="container mx-auto px-4 md:px-6 pt-6 md:pt-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-1 font-bold hover:text-primary transition-colors cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="text-sm">Back to Listings</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[500px]">
            <div className="lg:col-span-1 relative h-[250px] md:h-auto rounded-2xl md:rounded-[2rem] overflow-hidden group">
              <Image src={getImg(images[0])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block lg:col-span-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden group">
              <Image src={getImg(images[1])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block lg:col-span-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden group">
              <Image src={getImg(images[2])} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 md:pb-12 border-b border-gray-100">
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-wrap gap-2">
              {isVerified && <span className="inline-block bg-[#2B9724] text-white text-[10px] font-bold px-4 py-1.5 rounded-full">Verified</span>}
              {purpose && <span className="inline-block bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full capitalize">{purpose}</span>}
              {status && <span className="inline-block bg-neutral-1 text-white text-[10px] font-bold px-4 py-1.5 rounded-full capitalize">{status}</span>}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-1 leading-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {ld.bedrooms != null && (
                <div className="flex items-center gap-2">
                  <BedDouble size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-2">{ld.bedrooms} Bedroom{ld.bedrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              {ld.bathrooms != null && (
                <div className="flex items-center gap-2">
                  <Bath size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-2">{ld.bathrooms} Bathroom{ld.bathrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              {ld.garage != null && (
                <div className="flex items-center gap-2">
                  <Car size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-2">{ld.garage} Garage</span>
                </div>
              )}
              {addressStr && (
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <MapPin size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-2">{addressStr}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between lg:justify-end gap-6 lg:text-right w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
            <div>
              {price != null && (
                <h2 className="text-3xl md:text-4xl font-black text-primary uppercase">
                  {currency} {price.toLocaleString()}
                  {purpose === 'for rent' && <span className="text-xs md:text-sm text-neutral-2 font-bold lowercase"> /month</span>}
                </h2>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-neutral-2 hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Share2 className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-neutral-2 hover:bg-primary hover:text-white transition-all cursor-pointer border-2 border-primary/20">
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
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
                <h3 className="text-2xl font-bold text-neutral-1">Description</h3>
                <p className="text-neutral-2 font-medium leading-relaxed">{description}</p>
              </div>
            )}

            {/* Overview */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Overview</h3>
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
                <h3 className="text-2xl font-bold text-neutral-1">Video</h3>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl">
                  <Image src={getImg(images[0])} alt="Video" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
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
                  <h4 className="text-xl font-bold text-neutral-1">ZilaHomes Verified</h4>
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
              <h3 className="text-2xl font-bold text-neutral-1">Property Details</h3>
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
                <h3 className="text-2xl font-bold text-neutral-1">Amenities and Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F7F7F7] p-4 rounded-xl">
                      <Zap size={18} className="text-primary shrink-0" />
                      <span className="text-sm font-bold text-neutral-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby / Landmarks */}
            {landmarks.length > 0 && (
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-2xl font-bold text-neutral-1">What&apos;s nearby?</h3>
                <p className="text-sm text-neutral-2 font-medium">Explore nearby amenities to precisely locate your property and identify surrounding conveniences.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 sm:gap-y-4">
                  {landmarks.map((lm, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-neutral-2 font-bold">{lm.name}</span>
                      <span className="text-sm font-bold text-neutral-1">{lm.distanceInKm} km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews (static placeholders) */}
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-neutral-1">Guest Reviews</h3>
                {(p?.ratingCount ?? 0) > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.round(p?.averageRating ?? 0) ? 'fill-primary text-primary' : 'text-gray-200'} />)}
                    </div>
                    <span className="text-sm font-bold text-neutral-1">{p?.averageRating?.toFixed(1)} ({p?.ratingCount})</span>
                  </div>
                )}
              </div>
              {(p?.ratingCount ?? 0) === 0 && (
                <p className="text-neutral-2 font-medium text-sm">No reviews yet.</p>
              )}
            </div>

            {/* Leave a Reply */}
            <div className="space-y-8 bg-[#FDFDFD] p-10 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold text-neutral-1">Leave A Reply</h3>
              <form className="space-y-6" onSubmit={replyForm.handleSubmit(onReplySubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-1 ml-1">Name</label>
                    <Input
                      placeholder="Enter your name here..."
                      {...replyForm.register('name')}
                      className={`h-12 bg-[#F6F6F6] border-none rounded-lg px-6 font-medium ${replyForm.formState.errors.name ? 'ring-2 ring-red-500' : ''}`}
                    />
                    {replyForm.formState.errors.name && (
                      <p className="text-red-500 text-xs font-bold mt-1 ml-1">{replyForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-1 ml-1">Email Address</label>
                    <Input
                      placeholder="Enter your email address here..."
                      {...replyForm.register('email')}
                      className={`h-12 bg-[#F6F6F6] border-none rounded-lg px-6 font-medium ${replyForm.formState.errors.email ? 'ring-2 ring-red-500' : ''}`}
                    />
                    {replyForm.formState.errors.email && (
                      <p className="text-red-500 text-xs font-bold mt-1 ml-1">{replyForm.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-1 ml-1">Review</label>
                  <Textarea
                    placeholder="Write comments here..."
                    {...replyForm.register('comment')}
                    className={`min-h-[150px] bg-[#F6F6F6] border-none rounded-lg p-6 font-medium resize-none shadow-none ${replyForm.formState.errors.comment ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {replyForm.formState.errors.comment && (
                    <p className="text-red-500 text-xs font-bold mt-1 ml-1">{replyForm.formState.errors.comment.message}</p>
                  )}
                </div>
                <Button type="submit" className="h-12 px-10 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all">
                  Post Comment
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#FAF6F2] rounded-lg p-10 space-y-8 sticky top-24">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-neutral-1">Contact Sellers</h3>
                <p className="text-sm text-neutral-2 font-medium italic">Reach out to the owner or agent for more details.</p>
              </div>
              <form className="space-y-4" onSubmit={contactForm.handleSubmit(onContactSubmit)}>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-neutral-1 ml-1">Name</label>
                  <Input
                    placeholder="Enter your name"
                    {...contactForm.register('name')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.name ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.name && (
                    <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-neutral-1 ml-1">Phone Number</label>
                  <Input
                    placeholder="eg: +251 912345678"
                    {...contactForm.register('phone')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.phone ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.phone && (
                    <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.formState.errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-neutral-1 ml-1">Email Address</label>
                  <Input
                    placeholder="example@gmail.com"
                    {...contactForm.register('email')}
                    className={`h-12 bg-white border-none rounded-sm px-6 font-medium ${contactForm.formState.errors.email ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.email && (
                    <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-neutral-1 ml-1">Your Message</label>
                  <Textarea
                    placeholder="enter your message here..."
                    {...contactForm.register('message')}
                    className={`min-h-[120px] bg-white border-none rounded-sm p-6 font-medium resize-none shadow-none ${contactForm.formState.errors.message ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {contactForm.formState.errors.message && (
                    <p className="text-red-500 text-xs font-bold mt-1 ml-1">{contactForm.formState.errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/10 transition-all mt-4">
                  Send Message
                </Button>
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
              <Button variant="outline" className="h-12 w-full sm:w-auto px-8 rounded-lg font-bold border-gray-200">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredList.map((item: any, i: number) => (
              <motion.div
                key={item._id ?? i}
                className="group bg-white rounded-lg overflow-hidden shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-700"
              >
                <Link href={`/properties/${item._id ?? item.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={getImg(item.images?.[0])} alt={item.title ?? ''} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.isVerified && <span className="bg-[#2B9724] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Verified</span>}
                      {item.listing?.purpose && <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full capitalize">{item.listing.purpose.replace('_', ' ')}</span>}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-black text-neutral-1">{item.currency ?? 'ETB'} {item.price?.toLocaleString() ?? ''}</h3>
                    <p className="text-base font-bold text-neutral-1 line-clamp-1">{item.title ?? item.name}</p>
                    <div className="flex items-center gap-2 text-neutral-2 text-sm font-medium italic">
                      <MapPin size={16} className="text-primary flex-shrink-0" />
                      <p className="line-clamp-1">{[item.address?.street, item.address?.city].filter(Boolean).join(', ')}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-neutral-2 font-bold text-xs uppercase italic opacity-60">
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
