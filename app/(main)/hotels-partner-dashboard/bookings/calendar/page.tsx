'use client';

import { Button } from '@/components/ui/button';
import {
  addDays,
  eachDayOfInterval,
  format,
  isToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const rooms = [
  { no: '101', type: 'Standard Queen' },
  { no: '102', type: 'Standard Queen' },
  { no: '103', type: 'Standard Queen' },
  { no: '104', type: 'Standard Queen' },
  { no: '105', type: 'Standard Queen' },
  { no: '106', type: 'Standard Queen' },
];

export default function BookingCalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
  const [view, setView] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  // Calculate the Start of the current week (Sunday)
  const startDate = startOfWeek(viewDate, { weekStartsOn: 0 });
  const endDate = addDays(startDate, 6);

  // Generate the 7 days for the current week
  const weekDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrev = () => {
    setViewDate(subDays(viewDate, 7));
  };

  const handleNext = () => {
    setViewDate(addDays(viewDate, 7));
  };

  const handleToday = () => {
    setViewDate(new Date());
  };

  return (
    <div className="bg-white rounded-lg border border-[#F2F2F2] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#F2F2F2]">
        <div className="flex items-center gap-6">
          <Button
            onClick={handleToday}
            variant="outline"
            className="h-10 px-6 bg-[#FFF3E6] border-none text-[#2C2E33] font-semibold hover:bg-[#FFF3E6]/80 rounded-lg cursor-pointer"
          >
            Today
          </Button>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="text-[#6C757D] hover:text-[#2C2E33] transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="text-[#6C757D] hover:text-[#2C2E33] transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <h2 className="text-[20px] font-bold text-[#2C2E33]">
            {format(startDate, 'MMMM yyyy')}
          </h2>
        </div>

        <div className="flex items-center bg-[#F5F5F5] p-1 rounded-xl">
          {['Daily', 'Weekly', 'Monthly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-6 py-2 text-[14px] font-bold rounded-lg transition-all cursor-pointer ${view === v
                  ? 'bg-[#F1913D] text-white shadow-sm shadow-[#F1913D]/20'
                  : 'text-[#6C757D] hover:text-[#2C2E33]'
                }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-6 text-left border-r border-b border-[#F2F2F2] min-w-[180px]">
                <span className="text-[16px] font-bold text-[#6C757D]">Room / Date</span>
              </th>
              {weekDays.map((date, i) => (
                <th
                  key={i}
                  className={`p-4 text-center border-r border-b border-[#F2F2F2] min-w-[100px] ${isToday(date) ? 'bg-[#F1913D]/5' : ''
                    }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-[#6C757D] uppercase tracking-wider">
                      {format(date, 'eee')}
                    </span>
                    <span
                      className={`text-[16px] font-bold ${isToday(date) ? 'text-[#F1913D]' : 'text-[#2C2E33]'
                        }`}
                    >
                      {format(date, 'dd')}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <React.Fragment key={room.no}>
                <tr className="h-20">
                  <td className="p-6 border-r border-b border-[#F2F2F2]">
                    <div className="space-y-1">
                      <p className="text-[16px] font-bold text-[#F1913D]">Room No {room.no}</p>
                      <p className="text-[12px] font-medium text-[#6C757D]">{room.type}</p>
                    </div>
                  </td>
                  {weekDays.map((date, index) => (
                    <td
                      key={index}
                      className={`border-r border-b border-[#F2F2F2] ${isToday(date) ? 'bg-[#F1913D]/[0.02]' : ''
                        }`}
                    ></td>
                  ))}
                </tr>
                {/* Secondary dashed row per the image */}
                <tr className="h-10">
                  <td className="border-r border-b border-[#F2F2F2] bg-gray-50/10"></td>
                  {weekDays.map((date, index) => (
                    <td
                      key={index}
                      className={`border-r border-b border-dashed border-[#F2F2F2] ${isToday(date) ? 'bg-[#F1913D]/[0.02]' : ''
                        }`}
                    ></td>
                  ))}
                </tr>
                <tr className="h-10">
                  <td className="border-r border-b border-[#F2F2F2] bg-gray-50/10"></td>
                  {weekDays.map((date, index) => (
                    <td
                      key={index}
                      className={`border-r border-b border-[#F2F2F2] ${isToday(date) ? 'bg-[#F1913D]/[0.02]' : ''
                        }`}
                    ></td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
