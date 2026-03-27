'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

const inputStyle = "h-[46px] bg-[#F4F5F7] border-0 rounded-[8px] text-[#2C2E33] text-[15px] px-4 focus-visible:ring-1 focus-visible:ring-[#F1913D] shadow-none font-medium transition-all";

export default function TransportProfilePage() {
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
    <div className="space-y-6 bg-transparent">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Box 1: Personal Information */}
      <div className="bg-white rounded-[20px] p-7 md:p-8 border border-[#F2F2F2] shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <div className="w-[120px] h-[120px] rounded-[16px] overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
              <Image
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full transition-transform group-hover:scale-110"
                width={120}
                height={120}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="w-8 h-8 bg-[#2C2E33] rounded-full flex items-center justify-center text-white absolute -bottom-[6px] -right-[6px] shadow-md border-2 border-white pointer-events-none">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start pt-2 space-y-1.5">
            <h2 className="text-[20px] font-bold text-[#2C2E33]">Personal Information</h2>
            <p className="text-[#6C757D] font-medium text-[14px]">
              Customer ID: #MT-8821 . Joined Jan 2023
            </p>
            <Button
              onClick={handleImageClick}
              variant="outline"
              className="mt-[18px] h-[38px] px-5 border-[#F2F2F2] rounded-lg text-[14px] font-bold text-[#2C2E33] shadow-none hover:bg-gray-50 cursor-pointer"
            >
              Update Profile Photo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 pt-2">
          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">First Name</Label>
            <Input defaultValue="Rasel" className={inputStyle} />
          </div>
          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">Last Name</Label>
            <Input defaultValue="Parvez" className={inputStyle} />
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <Label className="text-[14px] font-bold text-[#2C2E33]">Email Address</Label>
          <Input defaultValue="rasel@example.com" className={inputStyle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-6">
          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">Phone Number</Label>
            <Input defaultValue="01721879586" className={inputStyle} />
          </div>
          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">Designation</Label>
            <Input defaultValue="General Manager" className={inputStyle} />
          </div>
        </div>
      </div>

      {/* Box 2: Company Details */}
      <div className="bg-white rounded-[20px] p-7 md:p-8 border border-[#F2F2F2] shadow-sm">
        <div className="border-b border-[#F2F2F2] pb-5 mb-7">
          <h2 className="text-[20px] font-bold text-[#2C2E33]">Company Details</h2>
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">Registered Business Name</Label>
            <Input defaultValue="Thompson Freight & Logistics LLC" className={inputStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            <div className="space-y-3">
              <Label className="text-[14px] font-bold text-[#2C2E33]">Business Registration Number</Label>
              <Input defaultValue="REG-4455667788" className={inputStyle} />
            </div>
            <div className="space-y-3">
              <Label className="text-[14px] font-bold text-[#2C2E33]">Tax Identification Number (TIN)</Label>
              <Input defaultValue="TAX-TX-8877" className={inputStyle} />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[14px] font-bold text-[#2C2E33]">Business Address</Label>
            <Textarea
              defaultValue="1200 Commerce St, Suite 400, Austin, TX 78701, USA"
              className="h-[120px] resize-none bg-[#F4F5F7] border-0 rounded-[8px] text-[#2C2E33] text-[15px] p-4 focus-visible:ring-1 focus-visible:ring-[#F1913D] shadow-none font-medium transition-all"
            />
          </div>
        </div>
      </div>

      {/* Box 3: Action Buttons */}
      <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] flex justify-center sm:justify-end gap-4 shadow-sm">
        <Button variant="outline" className="h-[50px] px-10 bg-[#F4F5F7] hover:bg-gray-200 border-0 text-[#2C2E33] font-bold text-[15px] rounded-lg shadow-none flex-1 sm:flex-none cursor-pointer">
          Cancel
        </Button>
        <Button className="h-[50px] px-10 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold text-[15px] rounded-lg shadow-none flex-1 sm:flex-none cursor-pointer transition-transform active:scale-95">
          Save Changes
        </Button>
      </div>

    </div>
  );
}
