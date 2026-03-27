'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CloudUpload, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, type KeyboardEvent } from 'react';

const DEFAULT_AMENITIES = ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Room Service'];

export default function AddRoomPage() {
  const router = useRouter();

  // --- Image upload state ---
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // --- Amenities/tags state ---
  const [tags, setTags] = useState<string[]>(DEFAULT_AMENITIES);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) { setTagInput(''); return; }
    setTags(prev => [...prev, trimmed]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); addTag(); }
    if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      setTags(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="container bg-white rounded-lg p-5 border border-[#F2F2F2] shadow-sm">

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
              <SelectTrigger className="w-full h-12 py-6 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
                <SelectItem value="hotel" className="font-medium rounded-none cursor-pointer">Hotel</SelectItem>
                <SelectItem value="suite" className="font-medium rounded-none cursor-pointer">Suite</SelectItem>
                <SelectItem value="apartment" className="font-medium rounded-none cursor-pointer">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#2C2E33]">Base Price (Per Night)</label>
            <Select defaultValue="etb42">
              <SelectTrigger className="w-full h-12 py-6 bg-[#F5F5F5] rounded-[10px] border-none outline-none ring-0 shadow-none text-[14px] font-medium text-[#2C2E33] focus:ring-1 focus:ring-[#F1913D]">
                <SelectValue placeholder="Select price" />
              </SelectTrigger>
              <SelectContent className="rounded-sm border-[#F2F2F2] shadow-xl">
                <SelectItem value="etb42" className="font-medium rounded-none cursor-pointer">ETB42</SelectItem>
                <SelectItem value="etb50" className="font-medium rounded-none cursor-pointer">ETB50</SelectItem>
                <SelectItem value="etb100" className="font-medium rounded-none cursor-pointer">ETB100</SelectItem>
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
            <p className="text-[14px] font-bold text-[#2C2E33]">Click to upload room images</p>
            <p className="text-[13px] text-[#6C757D] mt-1">PNG, JPG, WEBP up to 10MB each · Multiple allowed</p>
          </div>

          {/* Error */}
          {imageError && <p className="text-red-500 text-[13px] font-medium">{imageError}</p>}

          {/* Preview grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-[10px] overflow-hidden border border-[#F2F2F2] shadow-sm aspect-square bg-gray-100">
                  <Image
                    src={img.preview}
                    alt={`Room image ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeImage(idx); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#2C2E33]/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-[#F1913D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Main</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities & Features (Tag Input) */}
        <div className="space-y-3">
          <label className="text-[14px] font-bold text-[#2C2E33]">Amenities & Features</label>
          <p className="text-[13px] text-[#6C757D] -mt-1">Type an amenity and press Enter or click + to add it.</p>

          {/* Tag container */}
          <div
            onClick={() => document.getElementById('tag-input')?.focus()}
            className="w-full border border-[#F2F2F2] bg-[#F9F9F9] rounded-[10px] p-3 flex flex-wrap gap-2 min-h-[60px] items-start cursor-text focus-within:ring-1 focus-within:ring-[#F1913D] transition-all"
          >
            {tags.map(tag => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-white border border-[#F2F2F2] rounded-md px-3 py-1.5 text-[13px] font-medium text-[#2C2E33] shadow-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-[#6C757D] hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            ))}

            {/* Inline input */}
            <div className="flex items-center gap-2 flex-1 min-w-[160px]">
              <input
                id="tag-input"
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add amenity..."
                className="flex-1 bg-transparent outline-none border-none text-[13px] text-[#2C2E33] placeholder:text-[#A1A1A1] min-w-0"
              />
              {tagInput.trim() && (
                <button
                  type="button"
                  onClick={addTag}
                  className="w-6 h-6 rounded-full bg-[#F1913D] text-white flex items-center justify-center hover:bg-[#F1913D]/90 transition-colors cursor-pointer flex-shrink-0"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-10">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-[140px] h-12 bg-[#F5F5F5] hover:bg-gray-200 text-[#2C2E33] font-bold rounded-[10px] transition-colors shadow-none border-none outline-none cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[240px] h-12 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-[10px] transition-colors shadow-sm outline-none cursor-pointer"
          >
            Add to Hotel Property
          </Button>
        </div>

      </form>
    </div>
  );
}