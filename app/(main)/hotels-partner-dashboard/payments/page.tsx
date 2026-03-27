'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { useState } from 'react';

const stats = [
  {
    label: 'Total Revenue',
    value: 'ETB250,00',
    icon: ClipboardList,
    color: '#2B9724',
  },
  {
    label: 'Available for Payout',
    value: 'ETB350,00',
    icon: ClipboardList,
    color: '#2B9724',
  },
  {
    label: 'Pending Clearance',
    value: 'ETB350,00',
    icon: ClipboardList,
    color: '#2B9724',
  },
];

const transactions = [
  { id: 1, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 2, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Processing', amount: 'ETB250,00' },
  { id: 3, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 4, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 5, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 6, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 7, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 8, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
  { id: 9, transId: '#EE-99021', method: 'Bank Transfer (**** 4422)', date: 'Oct 12, 2025', status: 'Completed', amount: 'ETB250,00' },
];

const statusStyles = {
  Completed: 'bg-[#E1F1E1] text-[#2B9724] hover:bg-[#E1F1E1]',
  Processing: 'bg-[#FFF3E6] text-[#F1913D] hover:bg-[#FFF3E6]',
};

export default function PaymentsPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(transactions.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev: number[]) => [...prev, id]);
    } else {
      setSelectedIds((prev: number[]) => prev.filter((item: number) => item !== id));
    }
  };

  const isAllSelected = selectedIds.length === transactions.length && transactions.length > 0;

  return (
    <div className="space-y-6 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl border border-[#F2F2F2] shadow-sm flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-[#E1F1E1] flex items-center justify-center">
              <stat.icon size={24} style={{ color: stat.color }} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <p className="text-[#6C757D] text-[16px] font-medium leading-none">{stat.label}</p>
              <h3 className="text-[32px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transaction History Section */}
      <div className="bg-white rounded-xl border border-[#F2F2F2] shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-[24px] font-bold text-[#2C2E33]">Transaction History</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-y border-[#F2F2F2]">
                  <th className="px-6 py-4 text-left w-12">
                    <Checkbox
                      className="rounded border-[#6C757D] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D] cursor-pointer"
                      checked={isAllSelected}
                      onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[14px] font-bold text-[#6C757D] uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-[#F2F2F2] hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <Checkbox
                        className="rounded border-[#6C757D] data-[state=checked]:bg-[#F1913D] data-[state=checked]:border-[#F1913D] cursor-pointer"
                        checked={selectedIds.includes(transaction.id)}
                        onCheckedChange={(checked) => handleSelectItem(transaction.id, checked === true)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-[#2C2E33]">{transaction.transId}</span>
                    </td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#2C2E33]">{transaction.method}</td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#2C2E33]">{transaction.date}</td>
                    <td className="px-6 py-5">
                      <Badge className={`rounded-full px-4 py-1 text-[12px] font-bold border-none shadow-none ${statusStyles[transaction.status as keyof typeof statusStyles]}`}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-[14px] font-bold text-[#2C2E33]">{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F2F2F2]">
            <p className="text-[14px] text-[#6C757D]">
              Showing <span className="font-bold text-[#2C2E33]">1-9 of 240</span> entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-10 px-4 gap-2 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 rounded-sm cursor-pointer font-medium text-[14px]"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button className="w-10 h-10 p-0 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-sm cursor-pointer shadow-sm">1</Button>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">2</Button>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">3</Button>
                <span className="px-1 text-[#6C757D]">...</span>
                <Button variant="outline" className="w-10 h-10 p-0 text-[#6C757D] border-[#F2F2F2] hover:bg-gray-50 font-bold rounded-sm cursor-pointer">12</Button>
              </div>
              <Button
                variant="outline"
                className="h-10 px-4 gap-2 text-[#2C2E33] border-[#F2F2F2] hover:bg-gray-50 rounded-sm cursor-pointer font-medium text-[14px]"
              >
                Next
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}