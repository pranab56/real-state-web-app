'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const reviewsData = [
  {
    id: 1,
    name: "What's nearby?",
    date: 'August 13, 2023',
    category: 'All',
    content:
      "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    date: 'September 02, 2023',
    category: 'Positive',
    content:
      'Absolutely love this platform! Finding the perfect property has never been easier. The filters are intuitive and the customer support team responds quickly.',
    rating: 5,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Michael Torres',
    date: 'October 18, 2023',
    category: 'Negative',
    content:
      'Had some issues with the booking confirmation process. The response time from the support team was slower than expected in this case.',
    rating: 2,
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Amelia Chen',
    date: 'November 05, 2023',
    category: 'Positive',
    content:
      'Great experience from start to finish. The listing photos were accurate, and the check-in process was seamless. Would highly recommend!',
    rating: 4,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'David Kim',
    date: 'December 20, 2023',
    category: 'Negative',
    content:
      'The property looked different in the photos. Management needs to ensure listings match the actual conditions on the ground.',
    rating: 2,
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=150&auto=format&fit=crop',
  },
];

export default function PartnerDashboardReviews() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredReviews = activeTab === 'All'
    ? reviewsData
    : reviewsData.filter(r => r.category === activeTab);

  return (
    <div className="space-y-8">

      {/* Top Tabs */}
      <div className="bg-white rounded-sm px-8 py-[22px] flex gap-10 shadow-sm border border-[#F2F2F2]">
        {['All', 'Positive', 'Negative'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bold text-[16px] relative transition-colors pb-1 cursor-pointer ${isActive ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'
                }`}
            >
              {tab}
              {isActive && (
                <div className="absolute -bottom-[24px] left-0 right-0 h-[3px] bg-[#F1913D]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-sm p-8 shadow-sm border border-gray-100">

        {/* Header Setup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-[24px] font-bold text-[#2C2E33]">Recent Review</h1>

          <Dialog>
            <DialogTrigger className="flex items-center justify-center gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 transition-colors text-white font-semibold py-2.5 px-6 rounded-[10px] shadow-sm cursor-pointer outline-none">
              <Plus size={18} strokeWidth={2.5} /> Write a Review
            </DialogTrigger>

            <DialogContent className="sm:max-w-[650px] p-8 gap-6 border-none rounded-sm shadow-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-[24px] font-bold text-[#2C2E33]">
                  Write a New Review
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-[#2C2E33]">Name</label>
                  <Input
                    placeholder="Enter your name here..."
                    className="bg-[#F5F5F5] border-none h-[50px] rounded-[10px] text-[15px] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-[#2C2E33]">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address here..."
                    className="bg-[#F5F5F5] border-none h-[50px] rounded-[10px] text-[15px] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-bold text-[#2C2E33]">Review From</label>
                <Select>
                  <SelectTrigger className="bg-[#F5F5F5] w-full border-none py-6 h-[50px] rounded-[10px] text-[15px] text-[#A1A1A1] focus:ring-1 focus:ring-[#F1913D]">
                    <SelectValue placeholder="Select review from here..." />
                  </SelectTrigger>
                  <SelectContent className="rounded">
                    <SelectItem value="property" className="py-1 rounded-none">Property Listing</SelectItem>
                    <SelectItem value="agent" className="py-1 rounded-none">Agent Service</SelectItem>
                    <SelectItem value="general" className="py-1 rounded-none">General Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-bold text-[#2C2E33]">Review</label>
                <Textarea
                  placeholder="Write Comments here..."
                  className="bg-[#F5F5F5] border-none min-h-[140px] rounded-[10px] text-[15px] placeholder:text-[#A1A1A1] resize-none focus-visible:ring-1 focus-visible:ring-[#F1913D] p-4"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button className="bg-[#F1913D] cursor-pointer hover:bg-[#F1913D]/90 text-white font-bold text-[16px] py-3.5 px-8 rounded-[10px] shadow-sm transition-colors">
                  Post Comment
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col">
          {filteredReviews.length === 0 && (
            <p className="text-center py-12 text-[#6C757D] font-medium">No reviews found.</p>
          )}
          {filteredReviews.map((review, idx) => (
            <div
              key={idx}
              className="flex gap-6 py-8 border-b border-[#F2F2F2] last:border-0"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-sm border border-gray-100">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[20px] font-bold text-[#2C2E33] leading-tight">
                      {review.name}
                    </h3>
                    {review.verified && (
                      <div className="flex items-center justify-center bg-[#2B9724] rounded-[4px] w-5 h-5">
                        <Check size={14} strokeWidth={3} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[#6C757D] font-medium text-[14px] mt-1">
                    {review.date}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.rating ? 'fill-[#F1913D] text-[#F1913D]' : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>

                <p className="text-[#2C2E33] text-[15px] font-medium leading-relaxed max-w-[90%]">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}