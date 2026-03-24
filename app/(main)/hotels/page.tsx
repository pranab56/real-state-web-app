'use client';

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
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-sm mt-12">
        <span className="text-primary font-medium hover:underline cursor-pointer">Home</span>
        <ChevronRight size={14} className="text-neutral-2" />
        <span className="text-neutral-2">Listing Hotel</span>
      </div>

      <div className="container mx-auto px-6 pb-24 lg:flex gap-12">

        {/* Sidebar Filters */}
        <aside className="lg:w-[320px] flex-shrink-0 space-y-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-1">Filters</h2>
              <button className="text-sm text-neutral-2 hover:text-primary transition-colors">Clear All</button>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-neutral-1">Price Range from <span className="text-primary">$100</span> to <span className="text-primary">$650,000</span></span>
              </div>
              <Slider defaultValue={[20, 80]} max={100} step={1} className="text-primary" />
            </div>

            {/* Hotel Rating */}
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-1">Hotel Rating</h3>
              <div className="space-y-4">
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`star-${star}`} className="border-neutral-2 data-[state=checked]:bg-primary" />
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(star)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        {[...Array(5 - star)].map((_, i) => <Star key={i} size={16} className="text-gray-200" />)}
                      </div>
                    </div>
                    <span className="text-sm text-neutral-1 font-bold">{star} Stars</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h3 className="font-bold text-neutral-1">Amenities:</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#F7F7F7] p-3 rounded-sm cursor-pointer hover:bg-gray-100 transition-all">
                    <Checkbox id={`hotel-amenity-${i}`} className="border-neutral-2 data-[state=checked]:bg-primary" />
                    <label htmlFor={`hotel-amenity-${i}`} className="text-sm font-medium text-neutral-1 cursor-pointer">Bed Linens</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Only */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="font-bold text-neutral-1">Available Only</span>
              <Switch className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 mt-12 lg:mt-0">
          {/* List Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-neutral-2 font-medium">Showing <span className="text-neutral-1 font-bold">1-6</span> of <span className="text-neutral-1 font-bold">24 Hotels</span></span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-2 font-medium">Sort by:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40 h-10 border-none bg-transparent font-bold text-neutral-1 shadow-none">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem className="rounded-none py-1" value="newest">Newest First</SelectItem>
                  <SelectItem className="rounded-none py-1" value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                  <div className="p-5 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-neutral-1 group-hover:text-primary transition-colors">{hotel.name}</h3>
                      <div className="flex items-start gap-2 text-neutral-2">
                        <MapPin size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <p className="font-medium">{hotel.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-neutral-1">{hotel.price}</span>
                        <span className="text-neutral-2 text-sm font-medium">/ night</span>
                      </div>
                      <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium h-12 px-6 rounded-sm transition-all active:scale-95">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-12 pb-12">
            <button className="flex items-center gap-2 p-2 px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary hover:border-primary cursor-pointer transition-all font-bold">
              <ChevronLeft size={20} />
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-sm bg-primary text-white font-medium shadow-lg shadow-primary/20">1</button>
              <button className="w-10 h-10 rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer">2</button>
              <button className="w-10 h-10 rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer">3</button>
              <span className="px-2 text-neutral-2">...</span>
              <button className="w-10 h-10 rounded-sm text-neutral-2 font-medium hover:bg-gray-50 outline-none cursor-pointer">12</button>
            </div>
            <button className="flex items-center gap-2 p-2 px-4 rounded-sm border border-gray-100 text-neutral-2 hover:text-primary cursor-pointer hover:border-primary transition-all font-bold">
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
