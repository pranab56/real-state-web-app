'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react';
import Image from 'next/image';

const hotels = [
  {
    id: 1,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 2,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 3,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 4,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 5,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 6,
    name: 'Grand Palais Royale',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  }
];

export default function ManageHotelsListPage() {
  return (
    <div className="space-y-6">

      {/* Top Filter Bar */}
      <div className="bg-white rounded-lg p-5 flex flex-col md:flex-row items-center gap-4 shadow-sm border border-[#F2F2F2]">

        {/* Search */}
        <div className='w-7/12'>
          <div className="flex-1  bg-[#F5F5F5]  rounded-sm flex items-center px-4 py-3 h-12">
            <Search size={18} className="text-[#6C757D] mr-3" />
            <input
              type="text"
              placeholder="Search Now"
              className="bg-transparent border-none outline-none w-full text-[14px] text-[#2C2E33] placeholder:text-[#6C757D]"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-4 w-5/12">
          <Select defaultValue="all">
            <SelectTrigger className="w-full py-6 bg-[#F5F5F5] border-none outline-none ring-0 shadow-none h-12 rounded-sm text-[14px] font-medium text-[#2C2E33] focus:ring-0 cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
              <SelectItem value="all" className="cursor-pointer rounded-none font-medium">Status: All</SelectItem>
              <SelectItem value="active" className="cursor-pointer rounded-none font-medium">Active</SelectItem>
              <SelectItem value="inactive" className="cursor-pointer rounded-none font-medium">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="location">
            <SelectTrigger className="w-full py-6 bg-[#F5F5F5] border-none outline-none ring-0 shadow-none h-12 rounded-sm text-[14px] font-medium text-[#2C2E33] focus:ring-0 cursor-pointer">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
              <SelectItem value="location" className="cursor-pointer rounded-none font-medium">Location</SelectItem>
              <SelectItem value="houston" className="cursor-pointer rounded-none font-medium">Houston</SelectItem>
              <SelectItem value="dallas" className="cursor-pointer rounded-none font-medium">Dallas</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="sort">
            <SelectTrigger className="w-full py-6 bg-[#F5F5F5] border-none outline-none ring-0 shadow-none h-12 rounded-sm text-[14px] font-medium text-[#2C2E33] focus:ring-0 cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
              <SelectItem value="sort" className="cursor-pointer rounded-none font-medium">Sort By</SelectItem>
              <SelectItem value="newest" className="cursor-pointer rounded-none font-medium">Newest First</SelectItem>
              <SelectItem value="price" className="cursor-pointer font-medium">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="group block bg-white rounded-lg overflow-hidden border border-[#F2F2F2] shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[16px]">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-[#F1913D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                  {hotel.tag}
                </span>
                {/* Quick Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#F1913D] transition-colors shadow-sm">
                    <Bookmark size={18} strokeWidth={2} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#F1913D] transition-colors shadow-sm">
                    <Search size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="space-y-3 mb-4">
                  <h3 className="text-[20px] font-bold text-[#2C2E33] group-hover:text-[#F1913D] transition-colors">{hotel.name}</h3>
                  <div className="flex items-center gap-2 text-[#6C757D]">
                    <MapPin size={16} className="flex-shrink-0" strokeWidth={2} />
                    <p className="text-[14px] font-medium">{hotel.address}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-extrabold text-[#2C2E33]">{hotel.price}</span>
                    <span className="text-[#6C757D] text-[14px] font-medium">/ night</span>
                  </div>
                  <Button className="bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-bold h-10 px-6 rounded-lg transition-transform active:scale-95 text-[14px]">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 pt-6 pb-2">
        <button className="flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-[#6C757D] hover:text-[#2C2E33] hover:bg-gray-50 transition-colors font-medium text-[14px] shadow-sm">
          <ChevronLeft size={18} />
          Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-11 h-11 rounded-sm bg-[#F1913D] cursor-pointer text-white font-bold shadow-md shadow-[#F1913D]/20 text-[15px]">1</button>
          <button className="w-11 h-11 rounded-sm bg-white cursor-pointer text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">2</button>
          <button className="w-11 h-11 rounded-sm bg-white cursor-pointer text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">3</button>
          <span className="w-11 h-11 flex items-center justify-center bg-white text-[#6C757D] rounded-sm shadow-sm text-[15px]">...</span>
          <button className="w-11 h-11 rounded-sm bg-white cursor-pointer text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">12</button>
        </div>
        <button className="flex items-center gap-2 h-11 px-5 rounded-sm cursor-pointer bg-white text-[#2C2E33] hover:bg-gray-50 shadow-sm transition-colors font-medium text-[14px]">
          Next
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}