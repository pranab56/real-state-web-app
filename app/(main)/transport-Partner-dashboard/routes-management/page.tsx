'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarCheck, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { label: 'Active Routes', value: '42' },
  { label: 'Estimated Monthly Revenue', value: 'ETB350,00' },
  { label: 'Total Routes', value: '57' },
];

const routesData = Array(5).fill({
  title: 'Financial Overview',
  description: 'Track your earnings and payout status',
  distance: '18.4 km',
  time: '28 min',
  price: '$35.00',
  status: 'Confirmed'
});

const SvgRouteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

export default function RoutesManagementPage() {
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);

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
      <div className="bg-white rounded-[20px] border border-[#F2F2F2] shadow-sm">
        <div className="p-6 border-b border-[#F2F2F2] flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-[#2C2E33]">Vehicles List</h2>

          <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
            <DialogTrigger render={<Button className="bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-semibold h-11 px-6 rounded-lg shadow-none" />}>
              <div className="flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Add New Vehicle
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-[20px] border-0 shadow-xl [&>button]:hidden">
              <div className="p-6 border-b border-[#F2F2F2] flex justify-between items-start">
                <div>
                  <DialogTitle className="text-[20px] font-bold text-[#2C2E33]">Create New Route</DialogTitle>
                  <p className="text-[14px] text-[#6C757D] font-medium mt-1.5">
                    Configure parameters for a new premium transport service.
                  </p>
                </div>
                <DialogClose className="rounded-full w-8 h-8 flex items-center justify-center bg-[#F9FAFB] hover:bg-gray-100 text-[#6C757D] transition-colors flex-shrink-0">
                  <X className="w-4 h-4" />
                </DialogClose>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2.5">
                  <Label className="text-[14px] font-semibold text-[#2C2E33]">Route Name</Label>
                  <Input placeholder="e.g., Downtown Express - North" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <Label className="text-[14px] font-semibold text-[#2C2E33]">Start Point</Label>
                    <Input placeholder="Station A or Address" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[14px] font-semibold text-[#2C2E33]">End Point</Label>
                    <Input placeholder="Station B or Address" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <div className="space-y-2.5">
                    <Label className="text-[14px] font-semibold text-[#2C2E33]">Distance (km)</Label>
                    <Input placeholder="0.0" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[14px] font-semibold text-[#2C2E33]">Est. Time (min)</Label>
                    <Input placeholder="45" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[14px] font-semibold text-[#2C2E33]">Base Price (ETB)</Label>
                    <Input placeholder="12.50" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-[14px] shadow-none text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[14px] font-semibold text-[#2C2E33]">Schedule & Frequency</Label>
                  <div className="flex gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const isActive = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri'].includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${isActive
                            ? 'bg-[#F1913D] text-white hover:bg-[#F1913D]/90'
                            : 'bg-[#F9FAFB] text-[#9CA3AF] hover:bg-gray-100'
                            }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 flex justify-center sm:justify-end gap-3 border-t border-[#F2F2F2] bg-white">
                <Button
                  variant="outline"
                  className="h-11 px-8 bg-[#F9FAFB] cursor-pointer hover:bg-gray-100 border-0 text-[#2C2E33] font-semibold text-[15px] rounded-lg shadow-none flex-1 sm:flex-none"
                  onClick={() => setIsAddRouteOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="h-11 px-6 bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-semibold text-[15px] rounded-lg shadow-none flex-1 sm:flex-none">
                  Add New Route
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table rows */}
        <div className="flex flex-col">
          {routesData.map((route, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center p-6 border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors gap-6 md:gap-0">
              {/* Info Section */}
              <div className="flex items-center gap-4 w-full md:w-[38%]">
                <div className="w-[48px] h-[48px] rounded-full bg-[#FFF4ED] flex items-center justify-center text-[#F1913D] flex-shrink-0">
                  <SvgRouteIcon />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#2C2E33]">{route.title}</h3>
                  <p className="text-[13px] text-[#6C757D] font-medium mt-0.5">{route.description}</p>
                </div>
              </div>

              {/* Stats Sections */}
              <div className="flex-1 flex items-center justify-between md:px-4">
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#2C2E33] mb-1">Distance</span>
                  <span className="text-[14px] text-[#6C757D] font-medium">{route.distance}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[15px] font-bold text-[#2C2E33] mb-1">Avg. Time</span>
                  <span className="text-[14px] text-[#6C757D] font-medium">{route.time}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[15px] font-bold text-[#2C2E33] mb-1">Base Price</span>
                  <span className="text-[14px] text-[#6C757D] font-medium">{route.price}</span>
                </div>
                <div className="flex flex-col items-start min-w-[100px]">
                  <span className="text-[15px] font-bold text-[#2C2E33] mb-2 pl-1">Status</span>
                  <span className="inline-flex px-3.5 py-1 bg-[#2B9724]/10 text-[#2B9724] text-[12px] font-bold rounded-full items-center justify-center whitespace-nowrap">
                    {route.status}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="w-auto md:w-[80px] flex justify-end">
                <button className="w-[42px] h-[42px] bg-[#FEF2F2] text-[#EF4444] rounded-lg flex items-center justify-center hover:bg-[#FEE2E2] transition-colors flex-shrink-0">
                  <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
