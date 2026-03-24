'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Image from 'next/image';

const bookings = [
  {
    id: 1,
    hotelName: 'The Ritz-Carlton',
    roomName: 'Superior Room',
    guests: '2 Adults, 0 Children',
    date: 'Oct 12, 2025',
    status: 'Completed',
    amount: 'ETB250,00',
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
  return (
    <div className="bg-white rounded-[20px] p-6 lg:p-8 border border-gray-100 shadow-sm ">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-[24px] font-bold text-[#2C2E33]">Recent Bookings</h1>
        <button className="flex items-center justify-center gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 transition-colors text-white font-semibold py-2.5 px-6 rounded-[12px] shadow-sm">
          <Plus size={18} strokeWidth={2.5} /> Add New Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-6 border-b border-[#F2F2F2]">
        {['All', 'Hotels', 'Transportation'].map((tab, idx) => (
          <button
            key={tab}
            className={`font-semibold text-[15px] pb-4 relative transition-colors ${idx === 0 ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'
              }`}
          >
            {tab}
            {idx === 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F1913D] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Table block */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-[#F9F9F9]">
              <th className="px-6 py-4 w-12 text-center rounded-l-xl font-medium text-[#6C757D]">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D1D1D1] text-[#F1913D] focus:ring-[#F1913D]/20 accent-[#F1913D]"
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
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0"
              >
                <td className="px-6 py-5 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#D1D1D1] text-[#F1913D] focus:ring-[#F1913D]/20 accent-[#F1913D]"
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
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft size={16} strokeWidth={2.5} /> Previous
          </button>

          <button className="w-10 h-10 flex items-center justify-center bg-[#F1913D] text-white font-bold rounded-lg shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            3
          </button>

          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-[#6C757D] font-bold rounded-lg shadow-sm">
            ...
          </div>

          <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            12
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Next <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

    </div>
  );
}