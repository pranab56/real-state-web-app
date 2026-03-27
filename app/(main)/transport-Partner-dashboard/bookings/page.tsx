'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const stats = [
  { label: 'Total Bookings Today', value: '42' },
  { label: 'Active Drivers', value: '12' },
  { label: 'Total Booking this Year', value: '780' },
];

const transportBookings = [
  { id: 1, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Confirmed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 2, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 3, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Completed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 4, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Confirmed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 5, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 6, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 7, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 8, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 9, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-[#2B9724]/10 text-[#2B9724]';
    case 'Pending':
      return 'bg-[#F1913D]/10 text-[#F1913D]';
    case 'Completed':
      return 'bg-[#F2F2F2] text-[#6C757D]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function TransportBookingsPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(transportBookings.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedIds.length === transportBookings.length && transportBookings.length > 0;

  return (
    <div className="space-y-6 bg-transparent pb-10">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3"
          >
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[#2B9724] border border-[#2B9724]/20 bg-[#2B9724]/10"
            >
              <CalendarCheck size={24} strokeWidth={1.5} />
            </div>
            <p className="text-[#6C757D] text-[15px] font-medium">{stat.label}</p>
            <h3 className="text-[32px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-[20px] p-7 border border-[#F2F2F2] shadow-sm">
        <h2 className="text-[20px] font-bold text-[#2C2E33] mb-6">Recent Bookings</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-transparent border-b border-[#F2F2F2] w-full justify-start rounded-none h-auto p-0 mb-6 gap-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#2C2E33] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              All Bookings
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#2C2E33] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              Scheduled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 outline-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium whitespace-nowrap border-collapse">
                <thead>
                  <tr className="border-b border-[#F2F2F2]">
                    <th className="py-4 pl-2 pr-4 w-10 text-center text-[14px] font-semibold text-[#6C757D]">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                        className="rounded border-gray-300 data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                      />
                    </th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Gust Name</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Ride Type</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Date</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Assigned Driver</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Vehicle</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Status</th>
                    <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transportBookings.map((b) => (
                    <tr key={b.id} className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 pl-2 pr-4 text-center">
                        <Checkbox
                          checked={selectedIds.includes(b.id)}
                          onCheckedChange={() => handleToggleRow(b.id)}
                          className="rounded border-gray-300 data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                        />
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-lg overflow-hidden relative flex-shrink-0 bg-gray-100">
                            <Image src={b.image} alt={b.name} fill className="object-cover" />
                          </div>
                          <span className="font-bold text-[#2C2E33] text-[14px]">{b.name}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-[#2C2E33] font-semibold text-[14px]">{b.rideType}</td>
                      <td className="py-5 px-4 text-[#2C2E33] font-semibold text-[14px]">{b.date}</td>
                      <td className={`py-5 px-4 font-semibold text-[14px] ${b.driver === 'Unassigned' ? 'text-[#9CA3AF]' : 'text-[#2C2E33]'}`}>
                        {b.driver}
                      </td>
                      <td className="py-5 px-4">
                        <span className="text-[#2C2E33] font-semibold text-[14px] block max-w-[100px] whitespace-normal leading-tight">
                          {b.vehicle}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${getStatusStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-5 px-4 font-bold text-[#2C2E33] text-[14px]">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t border-[#F2F2F2]">
                <div className="text-[14px] text-[#6C757D] font-medium mb-4 md:mb-0">
                  Showing <span className="font-bold text-[#2C2E33]">1-9</span> of <span className="font-bold text-[#2C2E33]">240</span> enteries
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-sm cursor-pointer shadow-none hover:bg-gray-50 bg-white">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </Button>
                  <Button variant="default" className="h-9 w-9 p-0 bg-[#F1913D] hover:bg-[#F1913D]/90 shadow-none text-white flex items-center justify-center text-sm font-semibold rounded-sm cursor-pointer">
                    1
                  </Button>
                  <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-sm cursor-pointer">
                    2
                  </Button>
                  <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-sm cursor-pointer">
                    3
                  </Button>
                  <div className="h-9 w-9 flex items-center justify-center text-[#9CA3AF]">
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                  <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-sm cursor-pointer">
                    12
                  </Button>
                  <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-sm cursor-pointer shadow-none hover:bg-gray-50 bg-white">
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-0 outline-none">
            <div className="py-12 text-center text-[#6C757D] font-medium">
              Scheduled bookings content
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
