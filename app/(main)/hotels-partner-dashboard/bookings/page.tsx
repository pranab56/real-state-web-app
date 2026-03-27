'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const stats = [
  {
    label: 'Total Reservations',
    value: '1,284',
    icon: Calendar,
    color: '#2B9724',
  },
  {
    label: 'Confirmed Today',
    value: '42',
    icon: Calendar,
    color: '#2B9724',
  },
  {
    label: 'Pending Approvals',
    value: '15',
    icon: Calendar,
    color: '#2B9724',
  },
];

const bookings = [
  {
    id: 1,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Confirmed',
    amount: 'ETB250,00',
  },
  {
    id: 2,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Pending',
    amount: 'ETB250,00',
  },
  {
    id: 3,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Confirmed',
    amount: 'ETB250,00',
  },
  {
    id: 4,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Checked In',
    amount: 'ETB250,00',
  },
  {
    id: 5,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Confirmed',
    amount: 'ETB250,00',
  },
  {
    id: 6,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Pending',
    amount: 'ETB250,00',
  },
  {
    id: 7,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Confirmed',
    amount: 'ETB250,00',
  },
  {
    id: 8,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Checked In',
    amount: 'ETB250,00',
  },
  {
    id: 9,
    guest: {
      name: 'Eleanor Jones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
    },
    roomType: 'Deluxe Suite',
    date: 'Oct 12, 2025',
    status: 'Confirmed',
    amount: 'ETB250,00',
  },
];

const statusStyles = {
  Confirmed: 'bg-[#E1F1E1] text-[#2B9724] hover:bg-[#E1F1E1]',
  Pending: 'bg-[#FFF3E6] text-[#F1913D] hover:bg-[#FFF3E6]',
  'Checked In': 'bg-[#F2F2F2] text-[#6C757D] hover:bg-[#F2F2F2]',
};

export default function BookingsPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(bookings.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev: number[]) => [...prev, id]);
    } else {
      setSelectedIds((prev: number[]) => prev.filter((item: number) => item !== id));
    }
  };

  const isAllSelected = selectedIds.length === bookings.length && bookings.length > 0;

  return (
    <div className="space-y-6 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl border border-[#F2F2F2] shadow-sm flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-[#E1F1E1] flex items-center justify-center">
              <stat.icon size={24} style={{ color: stat.color }} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <p className="text-[#6C757D] text-[16px] font-medium leading-none">{stat.label}</p>
              <h3 className="text-[32px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bookings Section */}
      <div className="bg-white rounded-xl border border-[#F2F2F2] shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-[24px] font-bold text-[#2C2E33]">Recent Bookings</h2>

          <Tabs defaultValue="all" className="w-4/12">
            <TabsList variant="line" className="w-full justify-start border-none h-auto p-0 gap-8">
              <TabsTrigger
                value="all"
                className="px-0 py-2 text-[16px] cursor-pointer font-semibold data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-10"
              >
                All Reservations
              </TabsTrigger>
              <TabsTrigger
                value="confirmed"
                className="px-0 py-2 text-[16px] font-semibold cursor-pointer data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-10"
              >
                Confirmed
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="px-0 py-2 text-[16px] font-semibold cursor-pointer data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-10"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="checked-in"
                className="px-0 py-2 text-[16px] font-semibold cursor-pointer data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-10"
              >
                Checked In
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-y border-[#F2F2F2]">
                  <th className="px-6 py-4 text-left w-12">
                    <Checkbox
                      className="rounded border-[#6C757D] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D] cursor-pointer"
                      checked={isAllSelected}
                      onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Guest Name</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Room Type</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} className="border-b border-[#F2F2F2] hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <Checkbox
                        className="rounded border-[#6C757D] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D] cursor-pointer"
                        checked={selectedIds.includes(booking.id)}
                        onCheckedChange={(checked) => handleSelectItem(booking.id, checked === true)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={booking.guest.image}
                            alt={booking.guest.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-bold text-[#2C2E33] whitespace-nowrap">{booking.guest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#2C2E33]">{booking.roomType}</td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#2C2E33]">{booking.date}</td>
                    <td className="px-6 py-5">
                      <Badge className={`rounded-full px-4 py-1 text-[12px] font-bold border-none shadow-none ${statusStyles[booking.status as keyof typeof statusStyles]}`}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold text-[#2C2E33]">{booking.amount}</span>
                        {/* <button className="text-[#6C757D] hover:text-[#2C2E33] transition-colors">
                          <MoreHorizontal size={20} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F2F2F2]">
            <p className="text-[14px] text-[#6C757D]">
              Showing <span className="font-bold text-[#2C2E33]">1-9 of 240</span> entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-10 px-4 gap-2 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 rounded-sm cursor-pointer font-medium text-[14px]"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button className="w-10 h-10 p-0 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-sm cursor-pointer shadow-sm">1</Button>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">2</Button>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">3</Button>
                <span className="px-1 text-[#6C757D]">...</span>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">12</Button>
              </div>
              <Button
                variant="outline"
                className="h-10 px-4 gap-2 text-[#2C2E33] border-[#F2F2F2] hover:bg-gray-50 rounded-sm cursor-pointer font-medium text-[14px]"
              >
                Next
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
