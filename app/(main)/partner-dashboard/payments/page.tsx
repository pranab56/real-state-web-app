'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { label: 'Current Balance', value: 'ETB250,00' },
  { label: 'Last Payment', value: 'ETB350,00' },
];

const transactions = [
  {
    id: '#EE-99021',
    propertyTitle: 'Monthly Rent - Skyview Terrace',
    propertySubtitle: 'Unit 14B • Maintenance Incl.',
    date: 'Oct 12, 2025',
    status: 'Paid',
    amount: 'ETB250,00',
    type: 'Hotels',
  },
  {
    id: '#EE-99022',
    propertyTitle: 'Transportation Fee - Airport Transfer',
    propertySubtitle: 'Ride #4502',
    date: 'Oct 11, 2025',
    status: 'Pending',
    amount: 'ETB120,00',
    type: 'Transportation',
  },
  {
    id: '#EE-99023',
    propertyTitle: 'Booking - The Plaza',
    propertySubtitle: 'Room 302',
    date: 'Oct 10, 2025',
    status: 'Failed',
    amount: 'ETB300,00',
    type: 'Hotels',
  },
  {
    id: '#EE-99024',
    propertyTitle: 'Shuttle Service - City Center',
    propertySubtitle: 'Ride #4510',
    date: 'Oct 09, 2025',
    status: 'Paid',
    amount: 'ETB80,00',
    type: 'Transportation',
  },
  {
    id: '#EE-99025',
    propertyTitle: 'Monthly Rent - Oceanview',
    propertySubtitle: 'Unit 2A',
    date: 'Oct 08, 2025',
    status: 'Paid',
    amount: 'ETB400,00',
    type: 'Hotels',
  },
  {
    id: '#EE-99026',
    propertyTitle: 'Luxury Transport - Resort',
    propertySubtitle: 'Ride #4600',
    date: 'Oct 07, 2025',
    status: 'Paid',
    amount: 'ETB150,00',
    type: 'Transportation',
  },
  {
    id: '#EE-99027',
    propertyTitle: 'Booking - Mountain Lodge',
    propertySubtitle: 'Cabin 5',
    date: 'Oct 06, 2025',
    status: 'Pending',
    amount: 'ETB200,00',
    type: 'Hotels',
  },
  {
    id: '#EE-99028',
    propertyTitle: 'Airport Shuttle - North',
    propertySubtitle: 'Ride #4611',
    date: 'Oct 05, 2025',
    status: 'Failed',
    amount: 'ETB90,00',
    type: 'Transportation',
  },
];

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
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredTransactions = activeTab === 'All'
    ? transactions
    : transactions.filter(tx => tx.type === activeTab);

  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTransactions.map(tx => tx.id));
    }
  };

  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg flex flex-col justify-center border border-[#F2F2F2] shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-lg border border-[#2B9724]/20 bg-[#2B9724]/10 flex items-center justify-center mb-6">
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
      <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-100 shadow-sm">

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#2C2E33]">Transaction History</h1>
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
                    checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0}
                    onCheckedChange={toggleAllRows}
                    className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:text-white rounded-[4px]"
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
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#6C757D]">No transactions found.</td>
                </tr>
              )}
              {filteredTransactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0"
                >
                  <td className="px-6 py-5 text-center">
                    <Checkbox
                      checked={selectedRows.includes(tx.id)}
                      onCheckedChange={() => toggleRow(tx.id)}
                      className="border-[#D1D1D1] data-[state=checked]:bg-[#F1913D] data-[state=checked]:text-white rounded-[4px]"
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
            <button className="flex items-center gap-2 cursor-pointer px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[14px] rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
              <ChevronLeft size={16} strokeWidth={2.5} /> Previous
            </button>

            <button className="w-10 h-10 flex items-center cursor-pointer justify-center bg-[#F1913D] text-white font-bold rounded-sm shadow-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center cursor-pointer justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
              2
            </button>
            <button className="w-10 h-10 flex items-center cursor-pointer justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
              3
            </button>

            <div className="w-10 h-10 flex items-center cursor-pointer justify-center bg-white border border-gray-100 text-[#6C757D] font-bold rounded-sm shadow-sm">
              ...
            </div>

            <button className="w-10 h-10 flex items-center cursor-pointer justify-center bg-white border border-gray-100 text-[#2C2E33] font-bold rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
              12
            </button>

            <button className="flex items-center gap-2 cursor-pointer px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[14px] rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
              Next <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}