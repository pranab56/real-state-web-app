'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from 'framer-motion';
import {
  Beer,
  Bookmark,
  Calendar as CalendarIcon,
  Car,
  ChevronRight,
  Clock,
  Dumbbell,
  Heart,
  MapPin,
  Palmtree,
  Share2,
  Star,
  Utensils,
  Waves,
  Wifi,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const AmenityItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-3 sm:gap-4 bg-[#F7F7F7] p-4 sm:p-6 rounded-lg">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={20} className="sm:w-6 sm:h-6" />
    </div>
    <span className="text-xs sm:text-sm font-bold text-neutral-1">{label}</span>
  </div>
);

const ReviewItem = ({ name, date, rating, comment, avatar }: any) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-100 last:border-none last:pb-0">
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
      <Image src={avatar} alt={name} fill className="object-cover" />
    </div>
    <div className="space-y-3 sm:space-y-4 flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-neutral-1">{name}</h4>
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <Zap size={10} className="text-white" fill="currentColor" />
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-neutral-2 font-medium">{date}</p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < rating ? "fill-primary text-primary" : "text-gray-200"} />
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-neutral-2 font-medium leading-relaxed">{comment}</p>
    </div>
  </div>
);

const DatePicker = ({ label, date, setDate, className }: { label: string, date: Date | undefined, setDate: (date: Date | undefined) => void, className?: string }) => (
  <div className={cn("space-y-1.5 sm:space-y-2 w-full", className)}>
    <label className="text-[10px] sm:text-xs font-black w-full text-neutral-2 uppercase tracking-wider ml-1">{label}</label>
    <Popover>
      <PopoverTrigger>
        <button
          className={cn(
            "w-full h-10 sm:h-12 bg-white border-none flex items-center justify-start text-left font-bold shadow-none hover:bg-white active:scale-95 transition-all px-3 sm:px-4 rounded-lg text-xs sm:text-sm",
            !date ? "text-neutral-2" : "text-neutral-1"
          )}
        >
          <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-none">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-xl border-none"
        />
      </PopoverContent>
    </Popover>
  </div>
);

export default function HotelDetailPage() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <div className="min-h-screen bg-white pt-10 font-sans">
      {/* Gallery Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 h-auto md:h-[500px]">
          <div className="md:col-span-8 relative aspect-[16/10] md:aspect-auto rounded-lg overflow-hidden group shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"
              alt="Hotel"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 sm:gap-6">
            <div className="relative aspect-square md:aspect-auto rounded-lg overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
                alt="Hotel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-square md:aspect-auto rounded-lg overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800"
                alt="Hotel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Info & Booking */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-12 border-b border-gray-100">
          <div className="space-y-4">
            <span className="inline-block bg-[#2B9724] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-green-500/10">Best Seller</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-1">Grand Palais Royale</h1>
            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs text-neutral-2 font-bold uppercase tracking-widest">Location:</p>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-extrabold text-neutral-2">8 Broadway, Brooklyn, New York</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:text-right">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-1">$42 <span className="text-xs sm:text-sm text-neutral-2 font-bold opacity-60">/ night</span></h2>
            </div>
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
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-1">Description</h3>
              <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed italic">
                Experience the pinnacle of French elegance at the Grand Palais Royale. Located in
                the heart of Paris, our hotel combines historic grandeur with contemporary luxury.
                Each detail is meticulously curated to provide an unforgettable stay.
              </p>
              <button className="text-primary text-sm sm:text-base font-black hover:underline flex items-center gap-1 transition-all">
                View More <ChevronRight size={16} />
              </button>
            </div>

            {/* Popular Amenities */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-neutral-1">Popular Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AmenityItem icon={Wifi} label="Free WiFi" />
                <AmenityItem icon={Waves} label="Indoor Pool" />
                <AmenityItem icon={Dumbbell} label="Gym" />
                <AmenityItem icon={Palmtree} label="Full Spa" />
                <AmenityItem icon={Utensils} label="Fine Dining" />
                <AmenityItem icon={Beer} label="Lounge Bar" />
                <AmenityItem icon={Clock} label="24h Service" />
                <AmenityItem icon={Car} label="Valet Parking" />
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-1">Guest Reviews</h3>
                <button className="text-xs sm:text-sm font-black text-neutral-1 bg-[#F7F7F7] px-5 sm:px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm w-fit">View All Reviews</button>
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
              </div>
            </div>

            {/* Leave a Reply */}
            <div className="space-y-6 sm:space-y-8 p-6 sm:p-10 bg-[#FDFDFD] border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-1">Leave A Reply</h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-neutral-1 ml-1">Name</label>
                    <Input placeholder="Enter your name here..." className="h-10 sm:h-12 bg-[#F6F6F6] border-none rounded-lg px-4 sm:px-6 font-medium focus:ring-1 focus:ring-primary shadow-none text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-neutral-1 ml-1">Email Address</label>
                    <Input placeholder="Enter your email address here..." className="h-10 sm:h-12 bg-[#F6F6F6] border-none rounded-lg px-4 sm:px-6 font-medium focus:ring-1 focus:ring-primary shadow-none text-xs sm:text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-neutral-1 ml-1">Review</label>
                  <Textarea placeholder="Write Comments here..." className="min-h-[120px] sm:min-h-[150px] bg-[#F6F6F6] border-none rounded-lg p-4 sm:p-6 font-medium resize-none shadow-none focus:ring-1 focus:ring-primary text-xs sm:text-sm" />
                </div>
                <Button className="h-10 sm:h-12 px-8 sm:px-10 bg-primary hover:bg-primary/90 text-white font-black rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm sm:text-base">
                  Post Comment
                </Button>
              </form>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#FAF6F2] rounded-lg p-6 sm:p-10 space-y-8 sm:space-y-10 border border-primary/5 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-1 flex items-center gap-3">
                <Bookmark className="text-primary fill-primary/20 w-5 h-5 sm:w-6 sm:h-6" />
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
                    <SelectTrigger className="w-full h-10 sm:h-12 py-5 sm:py-6 bg-white border-none font-bold text-neutral-1 shadow-none transition-all active:scale-95 text-xs sm:text-sm">
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
                    <SelectTrigger className="w-full h-10 sm:h-12 bg-white border-none font-bold text-neutral-1 shadow-none transition-all active:scale-95 text-xs sm:text-sm">
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="deluxe">Deluxe Room</SelectItem>
                      <SelectItem value="suite">Luxury Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-primary/10">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-neutral-2 font-extrabold">$450 x 5 nights</span>
                    <span className="text-neutral-1 font-black">$2,250</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-neutral-2 font-extrabold">Service Fee</span>
                    <span className="text-neutral-1 font-black">$85</span>
                  </div>
                  <div className="flex justify-between pt-4 sm:pt-6 border-t border-primary/10 text-lg sm:text-xl font-black italic tracking-tight">
                    <span className="text-neutral-1 uppercase">Total Price</span>
                    <span className="text-primary">$2,335</span>
                  </div>
                </div>

                <Button className="w-full h-14 bg-primary hover:bg-black text-white font-black rounded-xl shadow-xl shadow-primary/30 transition-all active:scale-95 text-lg uppercase tracking-tighter">
                  Book This Hotel
                </Button>
                <p className="text-center text-[10px] font-black text-neutral-2/40 uppercase tracking-widest italic">Verification may be required</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 space-y-8 sm:space-y-12 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 sm:space-y-4 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-1 tracking-tight">Top Destinations</h2>
            <p className="text-sm sm:text-base text-neutral-2 font-medium italic">Explore hundreds of luxury stays across the globe.</p>
          </div>
          <Button variant="outline" className="h-10 sm:h-12 px-6 sm:px-8 rounded-lg font-bold border-gray-200 hover:bg-primary hover:text-white transition-all shadow-sm w-fit">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/[0.03] hover:shadow-primary/5 transition-all duration-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop`}
                  alt="Hotel"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#2B9724] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-xl tracking-widest">Verified</span>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-1 group-hover:text-primary transition-colors leading-none tracking-tighter">Grand Palais Paris</h3>
                  <div className="flex items-center gap-2 text-neutral-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
                    <MapPin size={12} className="text-primary flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                    <p>430 Lamar Street, Houston, Texas</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-gray-50">
                  <div className="flex items-baseline gap-1 italic">
                    <span className="text-xl sm:text-2xl font-black text-neutral-1">ETB42</span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-2 font-bold opacity-40">/ night</span>
                  </div>
                  <Button size="sm" className="bg-primary px-4 sm:px-6 py-5 sm:py-6 rounded-lg font-black cursor-pointer hover:bg-primary/80 uppercase text-[9px] sm:text-[10px] tracking-widest transition-all shadow-lg shadow-primary/20">Book Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
