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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const stats = [
  { label: 'Total Revenue', value: 'ETB250,00' },
  { label: 'Total Bookings', value: '1,240' },
  { label: 'Fleet Status', value: '42' },
  { label: 'Active Drivers', value: '38' },
];

const transportBookings = [
  { id: 1, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Confirmed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 2, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 3, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Completed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 4, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Michael Ross', vehicle: 'Mercedes S-Class', status: 'Confirmed', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
  { id: 5, name: 'Eleanor Jones', rideType: 'Airport Transfer', date: 'Oct 12, 2025', driver: 'Unassigned', vehicle: 'Mercedes S-Class', status: 'Pending', amount: 'ETB250,00', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop' },
];

const chartData = [
  { month: 'JAN', value: 30 },
  { month: 'FEB', value: 80 },
  { month: 'MAR', value: 70 },
  { month: 'APR', value: 50 },
  { month: 'MAY', value: 40 },
  { month: 'JUN', value: 120 },
  { month: 'JUL', value: 100 },
  { month: 'AUG', value: 95 },
  { month: 'SEP', value: 150 },
  { month: 'OCT', value: 20 },
  { month: 'NOV', value: 130 },
  { month: 'DEC', value: 35 },
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

export default function TransportPartnerDashboardPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[16px] p-6 flex flex-col justify-start border-none shadow-sm shadow-gray-200/50"
          >
            <div
              className="w-10 h-10 rounded-[8px] flex items-center justify-center mb-4 text-[#2B9724] border border-[#2B9724]/20 bg-[#2B9724]/10"
            >
              <CalendarCheck size={20} strokeWidth={2} />
            </div>
            <p className="text-[#6C757D] text-[14px] font-medium mb-1.5">{stat.label}</p>
            <h3 className="text-[24px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-[16px] p-7 border-none shadow-sm shadow-gray-200/50">
        <h2 className="text-[18px] font-bold text-[#2C2E33] mb-6">Recent Bookings</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium whitespace-nowrap border-collapse">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                <th className="py-4 pl-2 pr-4 w-10 text-center text-[14px] font-semibold text-[#6C757D]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    className="border-[#D1D1D1] rounded-[4px] data-[state=checked]:bg-[#2B9724] data-[state=checked]:border-[#2B9724]"
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
                      className="border-[#D1D1D1] rounded-[4px] data-[state=checked]:bg-[#2B9724] data-[state=checked]:border-[#2B9724]"
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
                  <td className={`py-5 px-4 font-semibold text-[14px] ${b.driver === 'Unassigned' ? 'text-[#A1A1A1]' : 'text-[#2C2E33]'}`}>
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
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-[16px] p-7 border-none shadow-sm shadow-gray-200/50">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-[18px] font-bold text-[#2C2E33]">Monthly Booking Trends</h2>
            <p className="text-[#6C757D] text-[14px] font-medium mt-1">
              Total bookings per day across all luxury categories
            </p>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[110px] py-5 bg-[#F9F9F9] border-none rounded-[8px] px-3 h-10 text-[14px] font-semibold text-[#6C757D] outline-none shadow-none">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="rounded-[8px] border-[#F2F2F2] shadow-xl">
              <SelectItem value="monthly" className="font-medium text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] cursor-pointer">Monthly</SelectItem>
              <SelectItem value="weekly" className="font-medium text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] cursor-pointer">Weekly</SelectItem>
              <SelectItem value="yearly" className="font-medium text-[14px] text-[#6C757D] focus:bg-[#FFF4ED] focus:text-[#F1913D] cursor-pointer">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F1913D" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F1913D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: '#A1A1A1', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#2C2E33',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                padding: '8px 12px',
              }}
              cursor={{ stroke: '#F1913D', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F1913D"
              strokeWidth={3}
              fill="url(#trendsGradient)"
              dot={false}
              activeDot={{ r: 6, fill: '#F1913D', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
