'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const stats = [
  { label: 'Occupancy Rate', value: '84.2%', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
  { label: 'Average Daily Rate (ADR)', value: 'ETB250,00', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
  { label: 'Service Requests', value: '12', icon: CalendarCheck, iconColor: '#2B9724', iconBg: '#2B9724' },
];

const bookings = [
  { id: 1, name: 'Eleanor Jones', roomType: 'Deluxe Suite', date: 'Oct 12, 2025', status: 'Confirmed', amount: 'ETB250,00', type: 'Confirmed', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=150&fit=crop' },
  { id: 2, name: 'Marcus Lee', roomType: 'Standard Room', date: 'Oct 12, 2025', status: 'Pending', amount: 'ETB180,00', type: 'Pending', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=150&fit=crop' },
  { id: 3, name: 'Sophia Hall', roomType: 'Superior Room', date: 'Oct 12, 2025', status: 'Confirmed', amount: 'ETB300,00', type: 'Confirmed', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=150&fit=crop' },
  { id: 4, name: 'James Carter', roomType: 'Family Suite', date: 'Oct 11, 2025', status: 'Checked In', amount: 'ETB420,00', type: 'Checked In', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=150&fit=crop' },
  { id: 5, name: 'Olivia Brown', roomType: 'Penthouse', date: 'Oct 10, 2025', status: 'Cancelled', amount: 'ETB650,00', type: 'Cancelled', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=150&fit=crop' },
  { id: 6, name: 'David Kim', roomType: 'Deluxe Suite', date: 'Oct 09, 2025', status: 'Pending', amount: 'ETB250,00', type: 'Pending', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=150&fit=crop' },
];

const revenueData = [
  { month: 'JAN', value: 20 },
  { month: 'FEB', value: 45 },
  { month: 'MAR', value: 35 },
  { month: 'APR', value: 55 },
  { month: 'MAY', value: 90 },
  { month: 'JUN', value: 130 },
  { month: 'JUL', value: 110 },
  { month: 'AUG', value: 145 },
  { month: 'SEP', value: 120 },
  { month: 'OCT', value: 75 },
  { month: 'NOV', value: 110 },
  { month: 'DEC', value: 85 },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-[#2B9724]/10 text-[#2B9724]';
    case 'Pending':
      return 'bg-[#F1913D]/10 text-[#F1913D]';
    case 'Checked In':
      return 'bg-gray-100 text-[#2C2E33]';
    case 'Cancelled':
      return 'bg-[#DC3545]/10 text-[#DC3545]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function HotelPartnerDashboardPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [growthFilter, setGrowthFilter] = useState('monthly');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredBookings = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.type === activeTab);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length && filteredBookings.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map(b => b.id));
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedIds.length === filteredBookings.length && filteredBookings.length > 0;

  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg p-5 flex flex-col justify-center border border-[#F2F2F2] shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-sm bg-green-50 border flex items-center justify-center mb-6"
                style={{ borderColor: `${stat.iconBg}30` }}
              >
                <Icon className="text-[#2B9724]" size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[#6C757D] text-[14px] font-medium mb-1">{stat.label}</p>
              <h3 className="text-[28px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg p-7 border border-[#F2F2F2] shadow-sm">
        <h2 className="text-[20px] font-bold text-[#2C2E33] mb-6">Recent Bookings</h2>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-[#F2F2F2] mb-6">
          {['All', 'Confirmed', 'Pending', 'Checked In', 'Cancelled'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedIds([]); }}
                className={`font-semibold text-[15px] pb-4 relative transition-colors cursor-pointer ${isActive ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'}`}
              >
                {tab}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1913D] rounded-t-full pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-[#F9F9F9]">
                <th className="px-5 py-4 w-10 text-center rounded-l-xl font-medium text-[#6C757D]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                  />
                </th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Guest Name</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Room Type</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Date</th>
                <th className="px-5 py-4 font-medium text-[#6C757D]">Status</th>
                <th className="px-5 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-4" />
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#6C757D]">No bookings found.</td>
                </tr>
              )}
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-center">
                    <Checkbox
                      checked={selectedIds.includes(b.id)}
                      onCheckedChange={() => handleToggleRow(b.id)}
                      className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[44px] h-[44px] rounded-xl overflow-hidden relative flex-shrink-0">
                        <Image src={b.image} alt={b.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-[#2C2E33] text-[15px]">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#2C2E33] font-semibold text-[14px]">{b.roomType}</td>
                  <td className="px-5 py-4 text-[#2C2E33] font-semibold text-[14px]">{b.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${getStatusStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-[#2C2E33] text-[15px]">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg p-7 border border-[#F2F2F2] shadow-sm">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-[20px] font-bold text-[#2C2E33]">Revenue Trend</h2>
            <p className="text-[#6C757D] text-[13px] font-medium mt-0.5">
              Asset value appreciation over the last 12 months
            </p>
          </div>
          <Select value={growthFilter} onValueChange={(v) => { if (v) setGrowthFilter(v) }}>
            <SelectTrigger className="w-[124px] border border-[#E5E7EB] rounded-sm px-4 h-12 py-5 text-[14px] font-semibold text-[#2C2E33] bg-white outline-none focus:ring-1 focus:ring-[#F1913D] cursor-pointer shadow-none">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
              <SelectItem value="monthly" className="font-semibold text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] tracking-wide rounded-none cursor-pointer py-2.5">Monthly</SelectItem>
              <SelectItem value="weekly" className="font-semibold text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] tracking-wide rounded-none cursor-pointer py-2.5">Weekly</SelectItem>
              <SelectItem value="yearly" className="font-semibold text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] tracking-wide rounded-none cursor-pointer py-2.5">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <p className="text-[13px] text-[#6C757D] font-medium">Revenue Balance</p>
          <p className="text-[22px] font-bold text-[#F1913D]">ETB250,00</p>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="hotelRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F1913D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F1913D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F2F2F2" strokeDasharray="0" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#A1A1A1', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              padding={{ left: 16, right: 16 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#2C2E33',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                padding: '8px 14px',
              }}
              cursor={{ stroke: '#F1913D', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F1913D"
              strokeWidth={2.5}
              fill="url(#hotelRevenueGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#F1913D', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
