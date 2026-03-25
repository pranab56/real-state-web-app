'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CloudUpload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddHotelPage() {
  const router = useRouter();

  return (
    <div className="max-w-[700px] mx-auto bg-white rounded-[20px] p-8 border border-[#F2F2F2] shadow-sm my-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[24px] font-bold text-[#2C2E33]">Hotel Property Details</h1>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#6C757D] hover:bg-gray-200 transition-colors"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      <form className="space-y-6">

        {/* Hotel Name */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Hotel Name</label>
          <input
            type="text"
            placeholder="e.g. Grand Plaza Resort & Spa"
            className="w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Property Type & Star Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Property Type</label>
            <Select defaultValue="hotel">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="hotel" className="font-medium cursor-pointer">Hotel</SelectItem>
                <SelectItem value="resort" className="font-medium cursor-pointer">Resort</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Star Rating</label>
            <Select defaultValue="5">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="5" className="font-medium cursor-pointer">5</SelectItem>
                <SelectItem value="4" className="font-medium cursor-pointer">4</SelectItem>
                <SelectItem value="3" className="font-medium cursor-pointer">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Description</label>
          <textarea
            rows={5}
            placeholder="Tell guests what makes your hotel unique..."
            className="w-full bg-[#F5F5F5] rounded-[10px] p-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none resize-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Street Address */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Street Address</label>
          <input
            type="text"
            placeholder="123 Luxury Ave, Downtown"
            className="w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* City & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">City</label>
            <Select defaultValue="addis_ababa">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="addis_ababa" className="font-medium cursor-pointer">Addis Ababa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Country</label>
            <Select defaultValue="ethiopia">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="ethiopia" className="font-medium cursor-pointer">Ethiopia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upload Image */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Upload Image</label>
          <div className="w-full bg-[#F5F5F5] rounded-[10px] py-14 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border border-transparent hover:border-[#D1D1D1]">
            <div className="w-16 h-16 bg-[#FFF4ED] rounded-2xl flex items-center justify-center mb-3">
              <CloudUpload className="text-[#F1913D]" size={32} strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-medium text-[#6C757D]">Main Image</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-10">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-[140px] h-12 bg-[#F5F5F5] hover:bg-gray-200 text-[#2C2E33] font-bold rounded-[10px] transition-colors shadow-none border-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[240px] h-12 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-[10px] transition-colors shadow-sm"
          >
            Add to Hotel Property
          </Button>
        </div>

      </form>
    </div>
  );
}