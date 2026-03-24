'use client';

import { CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
  { label: 'Current Balance', value: 'ETB250,00' },
  { label: 'Last Payment', value: 'ETB350,00' },
];

const transactions = Array(9).fill({
  id: '#EE-99021',
  propertyTitle: 'Monthly Rent - Skyview Terrace',
  propertySubtitle: 'Unit 14B • Maintenance Incl.',
  date: 'Oct 12, 2025',
  status: 'Paid',
  amount: 'ETB250,00',
});

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-[#2B9724]/10 text-[#2B9724]';
    case 'Pending':
      return 'bg-[#F1913D]/10 text-[#F1913D]';
    case 'Failed':
      return 'bg-[#DC3545]/10 text-[#DC3545]';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function PartnerDashboardPayments() {
  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-[20px] flex flex-col justify-center border border-[#F2F2F2] shadow-sm relative overflow-hidden"
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

      {/* Main Container - Transaction History */}
      <div className="bg-white rounded-[20px] p-6 lg:p-8 border border-gray-100 shadow-sm">

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#2C2E33]">Transaction History</h1>
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
                <th className="px-6 py-4 font-medium text-[#6C757D]">Transaction ID</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Property / Description</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Date</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
                <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-4"></tr>
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0"
                >
                  <td className="px-6 py-5 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#D1D1D1] text-[#F1913D] focus:ring-[#F1913D]/20 accent-[#F1913D]"
                    />
                  </td>

                  {/* Transaction ID */}
                  <td className="px-6 py-5 text-[#2C2E33] font-bold text-[15px]">
                    {tx.id}
                  </td>

                  {/* Property / Description */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[#2C2E33] text-[15px]">{tx.propertyTitle}</span>
                      <span className="text-[#A1A1A1] text-[13px] font-medium leading-tight mt-0.5">{tx.propertySubtitle}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-[#2C2E33] font-semibold text-[14px]">
                    {tx.date}
                  </td>

                  {/* Status Pill */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${getStatusStyle(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5 font-bold text-[#2C2E33] text-[15px]">
                    {tx.amount}
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
    </div>
  );
}