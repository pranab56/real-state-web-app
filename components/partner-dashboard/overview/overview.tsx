'use client';

import { CalendarCheck, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: 'JAN', value: 100 },
  { name: 'FEB', value: 300 },
  { name: 'MAR', value: 200 },
  { name: 'APR', value: 120 },
  { name: 'MAY', value: 80 },
  { name: 'JUN', value: 450 },
  { name: 'JUL', value: 380 },
  { name: 'AUG', value: 360 },
  { name: 'SEP', value: 650 },
  { name: 'OCT', value: 50 },
  { name: 'NOV', value: 450 },
  { name: 'DEC', value: 80 },
];

export function Overview() {
  const stats = [
    { label: 'Total Bookings', value: '12' },
    { label: 'Saved Properties', value: '48' },
    { label: 'Active Offers', value: '3' },
  ];

  const recentActivity = [
    {
      id: 1,
      property: 'Oceanfront Villa',
      date: 'Oct 12, 2025',
      status: 'Confirmed',
      amount: 'ETB250,00',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 2,
      property: 'Mountain Retreat',
      date: 'Oct 12, 2025',
      status: 'Pending',
      amount: 'ETB250,00',
      image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d837e?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 3,
      property: 'Urban Penthouse',
      date: 'Oct 12, 2025',
      status: 'Completed',
      amount: 'ETB250,00',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 4,
      property: 'Oceanfront Villa',
      date: 'Oct 12, 2025',
      status: 'Confirmed',
      amount: 'ETB250,00',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: 5,
      property: 'Urban Penthouse',
      date: 'Oct 12, 2025',
      status: 'Completed',
      amount: 'ETB250,00',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=150&auto=format&fit=crop',
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-[#2B9724]/10 text-[#2B9724]';
      case 'Pending':
        return 'bg-[#F1913D]/10 text-[#F1913D]';
      case 'Completed':
        return 'bg-[#2C2E33]/10 text-[#2C2E33]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl flex flex-col justify-center border border-[#F2F2F2] shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-lg border border-[#2B9724]/20 flex items-center justify-center mb-6">
              <CalendarCheck className="text-[#2B9724]" size={24} strokeWidth={1.5} />
            </div>
            <p className="text-[#6C757D] text-[15px] font-medium mb-1">
              {stat.label}
            </p>
            <h3 className="text-[28px] font-bold text-[#2C2E33] leading-none">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-[#F2F2F2] shadow-sm">
        <h2 className="text-[22px] font-bold text-[#2C2E33] mb-6">
          Recent Activity
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b-2 border-transparent mb-6">
          {['All', 'Properties', 'Hotels', 'Transportation'].map((tab, idx) => (
            <button
              key={tab}
              className={`pb-3 text-[15px] font-semibold transition-colors relative ${idx === 0
                  ? 'text-[#2C2E33]'
                  : 'text-[#6C757D] hover:text-[#2C2E33]'
                }`}
            >
              {tab}
              {idx === 0 && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-[#2C2E33] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse pb-4">
            <thead>
              <tr className="bg-[#F9F9F9] rounded-lg">
                <th className="px-6 py-4 w-12 text-center rounded-l-lg font-medium text-[#6C757D]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#D1D1D1] text-[#F1913D] focus:ring-[#F1913D]/20 accent-[#F1913D]"
                  />
                </th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Property</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Date</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
                <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-lg">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent before:content-[''] before:block before:h-4">
              {recentActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0"
                >
                  <td className="px-6 py-5 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#D1D1D1] text-[#F1913D] focus:ring-[#F1913D]/20 accent-[#F1913D]"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden relative">
                        <Image
                          src={activity.image}
                          alt={activity.property}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-[#2C2E33]">
                        {activity.property}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[#6C757D] font-medium">
                    {activity.date}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${getStatusStyle(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-[#2C2E33]">
                    {activity.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >

      {/* Portfolio Growth */}
      < div className="bg-white p-6 rounded-2xl border border-[#F2F2F2] shadow-sm relative overflow-hidden" >
        <div className="flex justify-between items-start mb-8 z-10 relative">
          <div>
            <h2 className="text-[22px] font-bold text-[#2C2E33]">
              Portfolio Growth
            </h2>
            <p className="text-[15px] text-[#6C757D] mt-1 font-medium">
              Asset value appreciation over the last 12 months
            </p>
          </div>
          <div>
            <button className="flex items-center gap-2 bg-[#F9F9F9] border border-[#F2F2F2] text-[#6C757D] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
              Monthly <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Area Chart Using Recharts */}
        <div className="h-[300px] w-full mt-4 z-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F1913D" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#F1913D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A1A1A1', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontWeight: 'bold',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#F1913D"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{
                  r: 6,
                  fill: '#FFFFFF',
                  stroke: '#F1913D',
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div >
    </div >
  );
}
