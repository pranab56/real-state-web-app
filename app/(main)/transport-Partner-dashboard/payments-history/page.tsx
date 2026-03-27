'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarCheck, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { label: 'Total Revenue', value: 'ETB250,00' },
  { label: 'Available for Payout', value: 'ETB350,00' },
  { label: 'Pending Clearance', value: 'ETB350,00' },
];

const transactionData = [
  { rawId: 1, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 2, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Processing', amount: 'ETB250,00' },
  { rawId: 3, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 4, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 5, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 6, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 7, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 8, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { rawId: 9, id: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
];

export default function PaymentsHistoryPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(transactionData.map((t) => t.rawId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (rawId: number) => {
    setSelectedIds((prev) =>
      prev.includes(rawId) ? prev.filter((id) => id !== rawId) : [...prev, rawId]
    );
  };

  const isAllSelected = selectedIds.length === transactionData.length && transactionData.length > 0;

  return (
    <div className="space-y-6 bg-transparent">
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
        <h2 className="text-[20px] font-bold text-[#2C2E33] mb-6">Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB]">
                <th className="py-4 pl-4 pr-2 w-10 text-center rounded-l-[10px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    className="rounded border-gray-300 data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                  />
                </th>
                <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Transaction ID</th>
                <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Method</th>
                <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Date</th>
                <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D]">Status</th>
                <th className="py-4 px-4 text-[14px] font-semibold text-[#6C757D] rounded-r-[10px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((item) => (
                <tr key={item.rawId} className="border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 pl-4 pr-2 text-center">
                    <Checkbox
                      checked={selectedIds.includes(item.rawId)}
                      onCheckedChange={() => handleToggleRow(item.rawId)}
                      className="rounded border-gray-300 data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D]"
                    />
                  </td>
                  <td className="py-5 px-4 text-[14px] font-bold text-[#2C2E33]">{item.id}</td>
                  <td className="py-5 px-4 text-[14px] font-semibold text-[#2C2E33]">{item.method}</td>
                  <td className="py-5 px-4 text-[14px] font-semibold text-[#2C2E33]">{item.date}</td>
                  <td className="py-5 px-4">
                    <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${item.status === 'Completed' ? 'bg-[#2B9724]/10 text-[#2B9724]' : 'bg-[#FFF4ED] text-[#F1913D]'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-[14px] font-bold text-[#2C2E33]">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-4">
            <div className="text-[14px] text-[#6C757D] font-medium mb-4 md:mb-0">
              Showing <span className="font-bold text-[#2C2E33]">1-9</span> of <span className="font-bold text-[#2C2E33]">240</span> enteries
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] cursor-pointer text-[#4B5563] text-sm font-semibold rounded-sm shadow-none hover:bg-gray-50 bg-white">
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button variant="default" className="h-9 w-9 p-0 bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 shadow-none text-white flex items-center justify-center text-sm font-semibold rounded-sm">
                1
              </Button>
              <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center cursor-pointer justify-center text-sm font-semibold rounded-sm">
                2
              </Button>
              <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center cursor-pointer justify-center text-sm font-semibold rounded-sm">
                3
              </Button>
              <div className="h-9 w-9 flex items-center justify-center text-[#9CA3AF]">
                <MoreHorizontal className="w-4 h-4" />
              </div>
              <Button variant="outline" className="h-9 w-9 p-0 cursor-pointer border-[#F2F2F2] text-[#4B5563] bg-white hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-sm">
                12
              </Button>
              <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] cursor-pointer text-[#4B5563] text-sm font-semibold rounded-sm shadow-none hover:bg-gray-50 bg-white">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
