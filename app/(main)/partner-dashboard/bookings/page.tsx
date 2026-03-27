'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const bookings = [
  {
    id: 1,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Hotels',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 2,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Cancelled',
    amount: 'ETB250,00',
    type: 'Transportation',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 3,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 4,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Transportation',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 5,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Hotels',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 6,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Cancelled',
    amount: 'ETB250,00',
    type: 'Transportation',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 7,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Hotels',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 8,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
    type: 'Transportation',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 9,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Cancelled',
    amount: 'ETB250,00',
    type: 'Hotels',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=150&auto=format&fit=crop',
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-[#F2F2F2] text-[#6C757D]';
    case 'Cancelled':
      return 'bg-[#DC3545]/10 text-[#DC3545]';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function PartnerDashboardBookings() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [dateIn, setDateIn] = useState<Date>();
  const [dateOut, setDateOut] = useState<Date>();

  const filteredBookings = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.type === activeTab);

  const toggleRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredBookings.length && filteredBookings.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredBookings.map(b => b.id));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-100 shadow-sm ">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-[24px] font-bold text-[#2C2E33]">Recent Bookings</h1>
        <Dialog>
          <DialogTrigger render={
            <button className="flex items-center justify-center cursor-pointer gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 transition-colors text-white font-semibold py-2.5 px-6 rounded-sm   shadow-sm">
              <Plus size={18} strokeWidth={2.5} /> Add New Booking
            </button>
          } />
          <DialogContent className="sm:max-w-[600px] bg-white border border-gray-100 shadow-xl rounded-sm p-6 lg:p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[22px] font-bold text-[#2C2E33]">Add New Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Guest Name */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Guest Name</label>
                  <Input placeholder="e.g. John Doe" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>
                {/* Property / Hotel */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Property / Hotel</label>
                  <Input placeholder="e.g. The Ritz-Carlton" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>
                {/* Room Type */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Room Type</label>
                  <Select>
                    <SelectTrigger className="w-full bg-[#F9F9F9] py-6 border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D] shadow-none">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-sm border border-[#F2F2F2] shadow-sm">
                      <SelectItem className="cursor-pointer font-medium" value="superior">Superior Room</SelectItem>
                      <SelectItem className="cursor-pointer font-medium" value="deluxe">Deluxe Suite</SelectItem>
                      <SelectItem className="cursor-pointer font-medium" value="standard">Standard Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Guests Count */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Guests</label>
                  <Input placeholder="e.g. 2 Adults, 1 Child" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>
                {/* Check-in */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Check-In</label>
                  <Popover>
                    <PopoverTrigger render={
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-[#F9F9F9] border-[#F2F2F2] h-[52px] rounded-sm px-4 text-[14px] font-normal text-left justify-start hover:bg-gray-100/50 hover:text-[#2C2E33] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D]",
                          !dateIn && "text-[#6C757D]"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateIn ? format(dateIn, "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent className="w-auto p-0 z-[100] bg-white border border-[#F2F2F2] shadow-sm rounded-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={dateIn}
                        onSelect={setDateIn}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Check-out */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Check-Out</label>
                  <Popover>
                    <PopoverTrigger render={
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-[#F9F9F9] border-[#F2F2F2] h-[52px] rounded-sm px-4 text-[14px] font-normal text-left justify-start hover:bg-gray-100/50 hover:text-[#2C2E33] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D]",
                          !dateOut && "text-[#6C757D]"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOut ? format(dateOut, "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent className="w-auto p-0 z-[100] bg-white border border-[#F2F2F2] shadow-sm rounded-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={dateOut}
                        onSelect={setDateOut}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Amount</label>
                  <Input placeholder="e.g. ETB250,00" className="w-full bg-[#F9F9F9] border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] focus-visible:ring-1 focus-visible:ring-[#F1913D]" />
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#2C2E33]">Status</label>
                  <Select>
                    <SelectTrigger className="w-full bg-[#F9F9F9] py-6 border-[#F2F2F2] rounded-sm h-[52px] px-4 text-[14px] text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D] shadow-none">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-sm border border-[#F2F2F2] shadow-sm">
                      <SelectItem className="cursor-pointer font-medium" value="completed">Completed</SelectItem>
                      <SelectItem className="cursor-pointer font-medium" value="pending">Pending</SelectItem>
                      <SelectItem className="cursor-pointer font-medium" value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 mt-8 bg-white border-t border-[#F2F2F2] px-1 -mx-2 pb-0 justify-end">
                <DialogClose render={
                  <button className="bg-white border border-[#D1D1D1] hover:bg-gray-50 text-[#2C2E33] text-[15px] font-bold py-3 px-8 rounded-sm transition-colors cursor-pointer">
                    Cancel
                  </button>
                } />
                <DialogClose render={
                  <button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white text-[15px] font-bold py-3 px-8 rounded-sm transition-colors shadow-sm cursor-pointer">
                    Save Booking
                  </button>
                } />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-6 border-b border-[#F2F2F2]">
        {['All', 'Hotels', 'Transportation'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-semibold text-[15px] pb-4 relative transition-colors cursor-pointer ${isActive ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'
                }`}
            >
              {tab}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1913D] rounded-t-full pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Table block */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9]">
              <th className="px-6 py-4 w-12 text-center rounded-l-xl font-medium text-[#6C757D]">
                <Checkbox
                  checked={selectedRows.length === filteredBookings.length && filteredBookings.length > 0}
                  onCheckedChange={toggleAllRows}
                  className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:text-white rounded-[4px]"
                />
              </th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Room Type</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Guest</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Date</th>
              <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
              <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-4"></tr>
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6C757D]">No bookings match your filters.</td>
              </tr>
            )}
            {filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0"
              >
                <td className="px-6 py-5 text-center">
                  <Checkbox
                    checked={selectedRows.includes(booking.id)}
                    onCheckedChange={() => toggleRow(booking.id)}
                    className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:text-white rounded-[4px]"
                  />
                </td>

                {/* Room Type (Image + Info) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-[50px] h-[50px] flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative">
                      <Image
                        src={booking.image}
                        alt={booking.hotelName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[#2C2E33] text-[15px]">{booking.hotelName}</span>
                      <span className="text-[#6C757D] text-[13px]">{booking.roomName}</span>
                    </div>
                  </div>
                </td>

                {/* Guests */}
                <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                  {booking.guests}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">
                  {booking.date}
                </td>

                {/* Status Pill */}
                <td className="px-6 py-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 font-bold text-[#2C2E33] text-[15px]">
                  {booking.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Area: Pagination & Showing Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 pb-2">
        <p className="text-[#6C757D] text-[15px]">
          Showing <span className="font-bold text-[#2C2E33]">1-9 of 240</span> entries
        </p>

        <div className="flex items-center gap-2">
          <button className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft size={16} strokeWidth={2.5} /> Previous
          </button>

          <button className="w-10 h-10 flex cursor-pointer items-center justify-center bg-[#F1913D] text-white font-bold rounded-lg shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex cursor-pointer items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            2
          </button>
          <button className="w-10 h-10 flex cursor-pointer items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            3
          </button>

          <div className="w-10 h-10 flex cursor-pointer items-center justify-center bg-white border border-gray-100 text-[#6C757D] font-bold rounded-lg shadow-sm">
            ...
          </div>

          <button className="w-10 h-10 cursor-pointer flex items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            12
          </button>

          <button className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Next <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

    </div>
  );
}