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

export default function AddRoomPage() {
  const router = useRouter();

  return (
    <div className="max-w-[700px] mx-auto bg-white rounded-[20px] p-8 border border-[#F2F2F2] shadow-sm my-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-[#2C2E33] mb-1">Create Room Listing</h1>
          <p className="text-[14px] text-[#2C2E33]">Set up a new room configuration for guests to book.</p>
        </div>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#6C757D] hover:bg-gray-200 transition-colors shrink-0 outline-none"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      <form className="space-y-6">

        {/* Room Name */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Room Name</label>
          <input
            type="text"
            placeholder="e.g. Presidential Ocean Suite"
            className="w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Room Type & Base Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Room Type</label>
            <Select defaultValue="hotel">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="hotel" className="font-medium cursor-pointer">Hotel</SelectItem>
                <SelectItem value="suite" className="font-medium cursor-pointer">Suite</SelectItem>
                <SelectItem value="apartment" className="font-medium cursor-pointer">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Base Price (Per Night)</label>
            <Select defaultValue="etb42">
              <SelectTrigger className="w-full h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select price" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#F2F2F2] shadow-xl">
                <SelectItem value="etb42" className="font-medium cursor-pointer">ETB42</SelectItem>
                <SelectItem value="etb50" className="font-medium cursor-pointer">ETB50</SelectItem>
                <SelectItem value="etb100" className="font-medium cursor-pointer">ETB100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Description</label>
          <textarea
            rows={5}
            placeholder="Describe the room features, view, and unique selling points..."
            className="w-full bg-[#F5F5F5] rounded-[10px] p-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none resize-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Upload Image */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Upload Image</label>
          <div className="w-full bg-[#F5F5F5] rounded-[10px] py-14 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border border-transparent hover:border-[#D1D1D1]">
            <div className="w-16 h-16 bg-[#FFF4ED] rounded-2xl flex items-center justify-center mb-3">
              <CloudUpload className="text-[#F1913D]" size={32} strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-medium text-[#2C2E33]">Main Image</p>
          </div>
        </div>

        {/* Amenities & Features */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Amenities & Features</label>
          <div className="w-full border border-gray-100 rounded-[10px] p-4 flex flex-wrap gap-3 min-h-[60px] items-center text-[#2C2E33]">
            {['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Room Service'].map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 bg-[#F5F5F5] rounded-md px-3 py-2 text-[13px] font-medium"
              >
                {amenity}
                <X size={14} className="cursor-pointer text-[#6C757D] hover:text-[#2C2E33]" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-10">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-[140px] h-12 bg-[#F5F5F5] hover:bg-gray-200 text-[#2C2E33] font-bold rounded-[10px] transition-colors shadow-none border-none outline-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[240px] h-12 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-[10px] transition-colors shadow-sm outline-none"
          >
            Add to Hotel Property
          </Button>
        </div>

      </form>
    </div>
  );
}