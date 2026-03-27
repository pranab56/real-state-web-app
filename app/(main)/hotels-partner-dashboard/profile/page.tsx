'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&h=200&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />

      {/* Personal Information Section */}
      <div className="bg-white rounded-2xl p-8 border border-[#F2F2F2] shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div
            onClick={triggerFileInput}
            className="relative group cursor-pointer"
          >
            <div className="w-32 h-32 rounded-2xl overflow-hidden border border-gray-100 relative">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black w-8 h-8 rounded-lg flex items-center justify-center text-white border-2 border-white shadow-sm pointer-events-none">
              <Camera size={16} />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <h1 className="text-[24px] font-bold text-[#2C2E33]">Personal Information</h1>
              <p className="text-[14px] text-[#6C757D] font-medium">Customer ID: #MT-8821 . Joined Jan 2023</p>
            </div>
            <Button
              onClick={triggerFileInput}
              variant="outline"
              className="h-10 px-6 border-[#F2F2F2] text-[#2C2E33] font-bold rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Update Profile Photo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">First Name</label>
            <Input
              defaultValue="Rasel"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Last Name</label>
            <Input
              defaultValue="Parvez"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Email Address</label>
            <Input
              defaultValue="rasel@example.com"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Phone Number</label>
            <Input
              defaultValue="01721879586"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Designation</label>
            <Input
              defaultValue="General Manager"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="bg-white rounded-2xl p-8 border border-[#F2F2F2] shadow-sm space-y-8">
        <h2 className="text-[20px] font-bold text-[#2C2E33] border-b border-[#F2F2F2] pb-6">Hotel Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Hotel Name</label>
            <Input
              defaultValue="Grand Plaza Heights"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Address</label>
            <Input
              defaultValue="789 Skyview Dr, Central Business District, Metropolis"
              className="h-14 bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-6"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[16px] font-bold text-[#2C2E33]">Hotel Description</label>
            <Textarea
              defaultValue="Luxurious 5-star establishment featuring 120 suites, rooftop infinity pool, and world-class dining facilities. Located in the heart of the city's financial hub."
              className="min-h-[140px] bg-[#F5F5F5] border-none rounded-xl text-[16px] text-[#2C2E33] focus-visible:ring-1 focus-visible:ring-[#F1913D] p-6 leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl p-6 border border-[#F2F2F2] shadow-sm flex justify-end items-center gap-4">
        <Button variant="outline" className="h-12 px-10 bg-[#F5F5F5] border-none text-[#2C2E33] font-bold rounded-xl hover:bg-gray-100 cursor-pointer">
          Cancel
        </Button>
        <Button className="h-12 px-10 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-xl shadow-md shadow-[#F1913D]/20 cursor-pointer transition-transform active:scale-95">
          Save Changes
        </Button>
      </div>
    </div>
  );
}