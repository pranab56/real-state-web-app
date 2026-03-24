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

const SidebarSelect = ({ label, placeholder }: { label?: string, placeholder: string }) => (
  <Select>
    <SelectTrigger className="w-full h-12 py-6 bg-[#F7F7F7] border-none rounded-sm text-neutral-2 shadow-none">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="rounded">
      <SelectItem className='rounded-none py-1' value="all">All {placeholder}</SelectItem>
      <SelectItem className='rounded-none py-1' value="1">Option 1</SelectItem>
      <SelectItem className='rounded-none py-1' value="2">Option 2</SelectItem>
    </SelectContent>
  </Select>
);

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-6 flex items-center gap-2 text-sm">
        <span className="text-primary font-medium">Home</span>
        <ChevronRight size={14} className="text-neutral-2" />
        <span className="text-neutral-2">Listing Property</span>
      </div>

      <div className="container mx-auto px-6 pb-24 lg:flex gap-12">

        {/* Sidebar Filters */}
        <aside className="lg:w-[320px] flex-shrink-0 space-y-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-1">Property Search</h2>
              <button className="text-sm text-neutral-2 hover:text-primary transition-colors">Clear All</button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Input
                placeholder="Search City, State or Area"
                className="h-12 bg-[#F7F7F7] border-none rounded-sm pl-12 pr-4 text-neutral-1 font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2" size={20} />
            </div>

            {/* Basic Selects */}
            <div className="space-y-4">
              <SidebarSelect placeholder="Status" />
              <SidebarSelect placeholder="Type" />
              <SidebarSelect placeholder="Bath" />
              <SidebarSelect placeholder="Bed" />
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-neutral-1">Price Range from <span className="text-primary">ETB100</span> to <span className="text-primary">ETB650,000</span></span>
              </div>
              <Slider defaultValue={[20, 80]} max={100} step={1} className="text-primary" />
            </div>
            {/* Size Range */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-neutral-1">Size Range from <span className="text-primary">500 SqFt</span> to <span className="text-primary">1,500 SqFt</span></span>
              </div>
              <Slider defaultValue={[30, 70]} max={100} step={1} />
            </div>

            {/* Advanced Selects */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <SidebarSelect placeholder="Province/States" />
              <SidebarSelect placeholder="Room" />
              <SidebarSelect placeholder="Garage" />
              <SidebarSelect placeholder="Label" />
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-6 pt-4 border-t border-gray-50">
              <h3 className="font-medium text-neutral-1">Amenities:</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="flex items-center space-x-2 bg-[#F7F7F7] p-3 rounded-sm cursor-pointer hover:bg-gray-100 transition-colors group/item">
                    <Checkbox id={`amenity-${i}`} className="border-neutral-2 data-[state=checked]:bg-primary" />
                    <label htmlFor={`amenity-${i}`} className="text-sm font-medium text-neutral-2 group-hover/item:text-primary cursor-pointer transition-colors">Bed Linens</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Properties (Mini) */}
          <div className="space-y-6 border border-gray-100 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-neutral-1 mb-4">Featured Homes</h3>
            {featuredHomes.map((home, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-50 last:border-none pb-4 last:pb-0">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={home.image} alt={home.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-1 group-hover:text-primary transition-colors line-clamp-1">{home.title}</h4>
                  <p className="text-[10px] text-neutral-2 font-medium uppercase tracking-wider">{home.beds} Beds | {home.baths} Baths</p>
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
              <h3 className="text-2xl font-black leading-tight tracking-tight">Expert Agent Assistance</h3>
              <p className="text-sm text-white/80 font-medium">Connect with a trusted agent who knows the luxury market inside out.</p>
              <Button className="w-full bg-[#F1913D] hover:bg-white hover:text-primary text-white font-bold h-12 rounded-xl transition-all">
                Connect With An Agent
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 mt-12 lg:mt-0">
          {/* List Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-neutral-2 font-medium italic text-sm">Showing <span className="text-neutral-1 font-bold not-italic">1-6</span> of <span className="text-neutral-1 font-bold not-italic">24</span> properties</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-2 font-bold uppercase tracking-widest">Sort by:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40 h-10 border-none bg-transparent font-bold text-neutral-1 shadow-none">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className='rounded-xl'>
                  <SelectItem className='py-2' value="newest">Newest first</SelectItem>
                  <SelectItem className='py-2' value="oldest">Oldest first</SelectItem>
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
                      <span className="bg-[#2B9724] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">Zila Verified</span>
                      <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">For Sale</span>
                    </div>
                    {/* Quick Actions Overlay */}
                    <div className="absolute bottom-4 right-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Repeat size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Heart size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-neutral-1 hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Maximize2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-neutral-1">{property.price}</h3>
                      <Link
                        href={`/properties/${property.id}`}
                        className="text-lg font-bold text-neutral-1 hover:text-primary transition-colors line-clamp-1 block leading-tight"
                      >
                        {property.title}
                      </Link>
                      <div className="flex items-start gap-1.5 text-neutral-2">
                        <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <p className="font-medium text-sm italic">{property.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 text-neutral-2 gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                        <BedDouble size={16} className="text-primary" />
                        <span>Beds <span className="text-neutral-1 font-black">{property.beds}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                        <Bath size={16} className="text-primary" />
                        <span>Baths <span className="text-neutral-1 font-black">{property.baths}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                        <Maximize2 size={16} className="text-primary" />
                        <span>SqFt <span className="text-neutral-1 font-black">{property.size.split(' ')[0]}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-12">
            <button className="flex items-center gap-2 p-2 px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-bold text-sm cursor-pointer shadow-sm">
              <ChevronLeft size={18} />
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-black shadow-lg shadow-primary/20 cursor-pointer">1</button>
              <button className="w-10 h-10 rounded-lg text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer">2</button>
              <button className="w-10 h-10 rounded-lg text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer">3</button>
              <span className="px-2 text-neutral-2">...</span>
              <button className="w-10 h-10 rounded-lg text-neutral-2 font-bold hover:bg-gray-50 cursor-pointer">12</button>
            </div>
            <button className="flex items-center gap-2 p-2 px-6 rounded-lg border border-gray-100 text-neutral-2 hover:text-white hover:bg-primary hover:border-primary transition-all font-bold text-sm cursor-pointer shadow-sm">
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
