'use client';

import { Input } from '@/components/ui/input';
import { Camera, Eye } from 'lucide-react';
import Image from 'next/image';

export default function PartnerDashboardProfile() {
  return (
    <div className="space-y-6 pb-8">

      {/* Container 1: Personal Information */}
      <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2]">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-[100px] h-[100px] rounded-[16px] overflow-hidden bg-gray-200 border border-gray-100 relative shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&auto=format&fit=crop"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2C2E33] text-white flex items-center justify-center border-[3px] border-white shadow-sm hover:bg-[#1E2024] transition-colors">
              <Camera size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-[#2C2E33]">Personal Information</h2>
            <p className="text-[#6C757D] text-[14px] font-medium mt-1 mb-4">
              Customer ID: <span className="text-[#2C2E33] font-semibold">#MT-8821</span> . Joined Jan 2023
            </p>
            <button className="w-fit px-5 py-2.5 rounded-[10px] border border-[#E5E7EB] bg-white text-[#2C2E33] font-bold text-[14px] shadow-sm hover:bg-gray-50 transition-colors">
              Update Profile Photo
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-2">
            <label className="text-[15px] font-bold text-[#2C2E33]">First Name</label>
            <Input
              defaultValue="Rasel"
              className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[15px] font-bold text-[#2C2E33]">Last Name</label>
            <Input
              defaultValue="Parvez"
              className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[15px] font-bold text-[#2C2E33]">Email Address</label>
            <Input
              defaultValue="rasel@example.com"
              type="email"
              className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[15px] font-bold text-[#2C2E33]">Phone Number</label>
            <Input
              defaultValue="01721879586"
              className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[15px] font-bold text-[#2C2E33]">Location</label>
            <Input
              defaultValue="Dhaka, Bangladesh"
              className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4"
            />
          </div>
        </div>
      </div>

      {/* Container 2: Account Address / Passwords */}
      <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2]">
        <h2 className="text-[20px] font-bold text-[#2C2E33] pb-6 border-b border-[#F2F2F2] mb-8">
          Account Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="space-y-2 md:col-span-2 relative">
            <label className="text-[15px] font-bold text-[#2C2E33]">Current Password</label>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your current password here..."
                className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4 pr-12"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors">
                <Eye size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-[15px] font-bold text-[#2C2E33]">New Password</label>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your new password here..."
                className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4 pr-12"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors">
                <Eye size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-[15px] font-bold text-[#2C2E33]">Confirm Password</label>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your confirm password here..."
                className="bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4 pr-12"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors">
                <Eye size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container 3: Actions */}
      <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2] flex items-center justify-end gap-4">
        <button className="px-8 py-3.5 rounded-[10px] bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#2C2E33] font-bold text-[15px] transition-colors">
          Cancel
        </button>
        <button className="px-8 py-3.5 rounded-[10px] bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold text-[15px] shadow-sm transition-colors">
          Save Changes
        </button>
      </div>

    </div>
  );
}