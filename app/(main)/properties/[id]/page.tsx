'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Bath,
  BedDouble,
  Calendar,
  Car,
  Check,
  ChevronRight,
  Clock,
  Heart,
  Home,
  Layers,
  MapPin,
  Maximize2,
  Play,
  Share2,
  Star,
  User,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const OverviewItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
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

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">
    <span className="text-sm text-neutral-2 font-medium">{label}</span>
    <span className="text-sm font-bold text-neutral-1">{value}</span>
  </div>
);

const ReviewItem = ({ name, date, rating, comment, avatar }: any) => (
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
            <Star key={i} size={14} className={i < rating ? "fill-primary text-primary" : "text-gray-200"} />
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral-2 font-medium leading-relaxed">{comment}</p>
    </div>
  </div>
);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

const replySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  comment: z.string().min(1, 'Comment is required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type ReplyFormValues = z.infer<typeof replySchema>;

export default function PropertyDetailPage() {
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', message: '' }
  });

  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { name: '', email: '', comment: '' }
  });

  const onContactSubmit = (data: ContactFormValues) => {
    console.log('Contact Form:', data);
  };

  const onReplySubmit = (data: ReplyFormValues) => {
    console.log('Reply Form:', data);
  };

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Photo Gallery Header */}
      <section className="container mx-auto px-4 md:px-6 pt-6 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[500px]">
          <div className="lg:col-span-1 relative h-[250px] md:h-auto rounded-2xl md:rounded-[2rem] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
              alt="Property"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="hidden md:block lg:col-span-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200"
              alt="Property"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="hidden md:block lg:col-span-1 relative rounded-2xl md:rounded-[2rem] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200"
              alt="Property"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Property Basic Info */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 md:pb-12 border-b border-gray-100">
          <div className="space-y-3 md:space-y-4">
            <span className="inline-block bg-[#2B9724] text-white text-[10px] font-bold px-4 py-1.5 rounded-full">For Rent</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-1 leading-tight">Lakeview Haven, Lake Tahoe</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <BedDouble size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-neutral-2">3 Bedroom</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-neutral-2">2 Bedroom</span>
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-neutral-2">1 Bedroom</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <MapPin size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-neutral-2">St Shadalaly, Brooklyn, New York</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between lg:justify-end gap-6 lg:text-right w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-primary uppercase">ETB250,00 <span className="text-xs md:text-sm text-neutral-2 font-bold lowercase">/month</span></h2>
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
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-neutral-1">Description</h3>
              <p className="text-neutral-2 font-medium leading-relaxed">
                Located around an hour away from Paris, between the Perche and the Iton valley, in a beautiful wooded park bordered by a charming stream, this country property immediately seduces with its bucolic and soothing environment. An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (15m x 5m), tennis court, gym and sauna.
              </p>
              <button className="text-primary font-bold hover:underline flex items-center gap-1">
                View More <ChevronRight size={16} />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <OverviewItem icon={Layers} label="ID" value="2357" />
                <OverviewItem icon={Home} label="Type" value="House" />
                <OverviewItem icon={User} label="Bedrooms" value="3 Rooms" />
                <OverviewItem icon={Bath} label="Bathrooms" value="3" />
                <OverviewItem icon={Car} label="Garages" value="2" />
                <OverviewItem icon={Maximize2} label="Size" value="900 SqFt" />
                <OverviewItem icon={Maximize2} label="Land Size" value="2,000 SqFt" />
                <OverviewItem icon={Calendar} label="Year Built" value="2025" />
              </div>
            </div>

            {/* Video */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Video</h3>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200" alt="Video" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-[#F7F7F7] rounded-lg p-5 flex items-center gap-8 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-neutral-1 flex items-center justify-center text-white flex-shrink-0">
                <Image src="/icons/checkMark.png" alt="Zila" width={32} height={32} className="" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-neutral-1">ZilaHomes Verified</h4>
                <p className="text-neutral-2 text-sm font-medium">This property has been personally verified by our team. Ownership, availability, and listing details have been confirmed.</p>
                <p className="text-xs text-neutral-2 mt-2 flex items-center gap-1 italic"><Clock size={12} /> Verified on: 12/12/2024</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                  <DetailRow label="Property ID:" value="AV7T1029" />
                  <DetailRow label="Price:" value="ETB250,00/month" />
                  <DetailRow label="Property Size:" value="1200 SqFt" />
                  <DetailRow label="Year Built:" value="2025 - 12 - 11" />
                  <DetailRow label="Property Type:" value="House, Apartment" />
                  <DetailRow label="Garage Size:" value="AV7T1029" />
                </div>
                <div>
                  <DetailRow label="Bathrooms:" value="4" />
                  <DetailRow label="Bedrooms:" value="2" />
                  <DetailRow label="Bathrooms:" value="4" />
                  <DetailRow label="Garage:" value="2" />
                  <DetailRow label="Property Status:" value="1200 SqFt" />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Amenities and Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F7F7F7] p-4 rounded-xl">
                    <Zap size={18} className="text-primary" />
                    <span className="text-sm font-bold text-neutral-1">Fiber</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">What's nearby?</h3>
              <p className="text-sm text-neutral-2 font-medium">Explore nearby amenities to precisely locate your property and identify surrounding conveniences, promoting cost-effective and time-efficient visit of your property's convenience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 sm:gap-y-4">
                {[
                  { label: 'School', dist: '0.7 km' },
                  { label: 'Univeryity', dist: '1.3 km' },
                  { label: 'Grocery center', dist: '0.8 km' },
                  { label: 'Market', dist: '1.1 km' },
                  { label: 'Hospital', dist: '1.5 km' },
                  { label: 'Metro station', dist: '2.2 km' },
                  { label: 'Gym, wellness', dist: '1.6 km' },
                  { label: 'River', dist: '1.2 km' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-neutral-2 font-bold">{item.label}</span>
                    <span className="text-sm font-bold text-neutral-1">{item.dist}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-neutral-1">Guest Reviews</h3>
                <button className="text-sm font-medium cursor-pointer text-neutral-1 bg-[#F7F7F7] px-4 py-2 rounded-lg hover:bg-gray-100">Show All Reviews</button>
              </div>
              <div className="space-y-12 pt-8">
                <ReviewItem
                  name="What's nearby?"
                  date="August 12, 2025"
                  rating={5}
                  comment="It's really easy to use and it is exactly what I am looking for. A lot of good looking templates. It's highly commendable. Give a support is helpful & solved my issues in no time."
                  avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&fit=crop"
                />
                <ReviewItem
                  name="What's nearby?"
                  date="August 12, 2025"
                  rating={5}
                  comment="It's really easy to use and it is exactly what I am looking for. A lot of good looking templates. It's highly commendable. Give a support is helpful & solved my issues in no time."
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop"
                />
                <ReviewItem
                  name="What's nearby?"
                  date="August 12, 2025"
                  rating={5}
                  comment="It's really easy to use and it is exactly what I am looking for. A lot of good looking templates. It's highly commendable. Give a support is helpful & solved my issues in no time."
                  avatar="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&fit=crop"
                />
                <ReviewItem
                  name="What's nearby?"
                  date="August 12, 2025"
                  rating={5}
                  comment="It's really easy to use and it is exactly what I am looking for. A lot of good looking templates. It's highly commendable. Give a support is helpful & solved my issues in no time."
                  avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop"
                />
              </div>
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

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-8 md:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-0">
          <div className="space-y-3 md:space-y-4 text-left">
            <h2 className="text-3xl md:text-5xl font-black text-neutral-1 tracking-tight">Featured Verified Properties</h2>
            <p className="text-sm md:text-base text-neutral-2 font-medium italic">Explore all the different types of properties so you can choose the best option for you.</p>
          </div>
          <Button variant="outline" className="h-12 w-full sm:w-auto px-8 rounded-lg font-bold border-gray-200">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="group bg-white rounded-lg overflow-hidden shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&fit=crop`}
                  alt="Property"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#2B9724] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Zila Verified</span>
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">For Sale</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-black text-neutral-1">ETB165.00</h3>
                <div className="flex items-center gap-2 text-neutral-2 text-sm font-medium italic">
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <p>14691 Stratford Dr, Woodbridge, VA 22193</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-neutral-2 font-bold text-xs uppercase italic opacity-60">
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={16} />
                    <span>Beds 4</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath size={16} />
                    <span>Baths 3</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={16} />
                    <span>m2 900</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
