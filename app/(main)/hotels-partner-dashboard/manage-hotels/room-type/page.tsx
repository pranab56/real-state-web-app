'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Bookmark,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  { label: 'Total Types', value: '12', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
  { label: 'Avg. Rate', value: 'ETB250,00', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
  { label: 'Total Capacity', value: '450', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
];

const tabs = ['All Room Types', 'Luxury Suites', 'Standard Rooms', 'Meeting & Event'];

const rooms = [
  {
    id: 1,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 2,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 3,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 4,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 5,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  },
  {
    id: 6,
    name: 'Deluxe King Suite',
    address: '430 Lamar Street, Houston, Texas',
    price: 'ETB42',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&h=600&fit=crop',
    tag: 'For Sale'
  }
];

export default function ManageRoomTypesPage() {
  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-[20px] p-6 flex flex-col justify-center border border-[#F2F2F2] shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-[10px] bg-[#2B9724]/10 flex items-center justify-center mb-6"
              >
                <Icon className="text-[#2B9724]" size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[#6C757D] text-[14px] font-medium mb-1">{stat.label}</p>
              <h3 className="text-[28px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Tabs Row */}
      <div className="bg-white rounded-[20px] px-6 py-2 border border-[#F2F2F2] shadow-sm flex items-center gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab, idx) => {
          const isActive = idx === 0;
          return (
            <button
              key={tab}
              className={`py-4 font-bold text-[14px] whitespace-nowrap transition-colors relative border-b-2 ${isActive ? 'text-[#2C2E33] border-[#F1913D]' : 'text-[#6C757D] border-transparent hover:text-[#2C2E33]'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="group block bg-white rounded-[20px] overflow-hidden border border-[#F2F2F2] shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[16px]">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-[#F1913D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                  {room.tag}
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
                  <h3 className="text-[20px] font-bold text-[#2C2E33] group-hover:text-[#F1913D] transition-colors">{room.name}</h3>
                  <div className="flex items-center gap-2 text-[#6C757D]">
                    <MapPin size={16} className="flex-shrink-0" strokeWidth={2} />
                    <p className="text-[14px] font-medium">{room.address}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-extrabold text-[#2C2E33]">{room.price}</span>
                    <span className="text-[#6C757D] text-[14px] font-medium">/ night</span>
                  </div>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-10 px-6 rounded-lg transition-transform active:scale-95 text-[14px]">
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
          <button className="w-11 h-11 rounded-xl bg-[#F1913D] text-white font-bold shadow-md shadow-[#F1913D]/20 text-[15px]">1</button>
          <button className="w-11 h-11 rounded-xl bg-white text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">2</button>
          <button className="w-11 h-11 rounded-xl bg-white text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">3</button>
          <span className="w-11 h-11 flex items-center justify-center bg-white text-[#6C757D] rounded-xl shadow-sm text-[15px]">...</span>
          <button className="w-11 h-11 rounded-xl bg-white text-[#6C757D] font-bold hover:bg-gray-50 hover:text-[#2C2E33] transition-colors shadow-sm text-[15px]">12</button>
        </div>
        <button className="flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-[#2C2E33] hover:bg-gray-50 shadow-sm transition-colors font-medium text-[14px]">
          Next
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}