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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AddHotelPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [imageError, setImageError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const invalid = files.find(f => !f.type.startsWith('image/'));
    if (invalid) { setImageError('Only image files are allowed.'); return; }

    const oversized = files.find(f => f.size > 10 * 1024 * 1024);
    if (oversized) { setImageError('Each image must be under 10MB.'); return; }

    setImageError('');
    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);

    // reset so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <div className="container bg-white rounded-sm p-5 border border-[#F2F2F2] shadow-sm ">
      <form className="space-y-6">
        {/* Hotel Name */}
        <div className="space-y-3">
          <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Hotel Name</label>
          <input
            type="text"
            placeholder="e.g. Grand Plaza Resort & Spa"
            className="w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Property Type & Star Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Property Type</label>
            <Select defaultValue="hotel">
              <SelectTrigger className="w-full h-12 py-6 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded border-[#F2F2F2] shadow-xl">
                <SelectItem value="hotel" className="font-medium rounded-none cursor-pointer">Hotel</SelectItem>
                <SelectItem value="resort" className="font-medium rounded-none cursor-pointer">Resort</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Star Rating</label>
            <Select defaultValue="5">
              <SelectTrigger className="w-full py-6 h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
                <SelectItem value="5" className="font-medium rounded-none cursor-pointer">5 Stars</SelectItem>
                <SelectItem value="4" className="font-medium rounded-none cursor-pointer">4 Stars</SelectItem>
                <SelectItem value="3" className="font-medium rounded-none cursor-pointer">3 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Description</label>
          <textarea
            rows={5}
            placeholder="Tell guests what makes your hotel unique..."
            className="w-full bg-[#F5F5F5] rounded-[10px] p-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none resize-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Street Address */}
        <div className="space-y-3">
          <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Street Address</label>
          <input
            type="text"
            placeholder="123 Luxury Ave, Downtown"
            className="w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* City & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">City</label>
            <Select defaultValue="addis_ababa">
              <SelectTrigger className="w-full py-6 h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
                <SelectItem value="addis_ababa" className="font-medium rounded-none cursor-pointer">Addis Ababa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Country</label>
            <Select defaultValue="ethiopia">
              <SelectTrigger className="w-full py-6 h-12 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
                <SelectItem value="ethiopia" className="font-medium rounded-none cursor-pointer">Ethiopia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upload Image */}
        <div className="space-y-3">
          <label className="text-[14px] mb-1 block font-bold text-[#2C2E33]">Upload Image</label>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#F5F5F5] rounded-[10px] py-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border-2 border-dashed border-[#E5E5E5] hover:border-[#F1913D] group"
          >
            <div className="w-16 h-16 bg-[#FFF4ED] group-hover:bg-[#F1913D]/15 rounded-2xl flex items-center justify-center mb-3 transition-colors">
              <CloudUpload className="text-[#F1913D]" size={32} strokeWidth={1.5} />
            </div>
            <p className="text-[15px] font-bold text-[#2C2E33]">Click to upload images</p>
            <p className="text-[13px] text-[#6C757D] mt-1">PNG, JPG, WEBP up to 10MB each · Multiple allowed</p>
          </div>

          {/* Error */}
          {imageError && (
            <p className="text-red-500 text-[13px] font-medium">{imageError}</p>
          )}

          {/* Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-[10px] overflow-hidden border border-[#F2F2F2] shadow-sm aspect-square bg-gray-100">
                  <Image
                    src={img.preview}
                    alt={`Upload preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#2C2E33]/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  {/* First image badge */}
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-[#F1913D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-10">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-[140px] h-12 bg-[#F5F5F5] hover:bg-gray-200 text-[#2C2E33] font-bold rounded-[10px] transition-colors shadow-none border-none cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[240px] h-12 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-[10px] transition-colors shadow-sm cursor-pointer"
          >
            Add to Hotel Property
          </Button>
        </div>

      </form>
    </div>
  );
}
