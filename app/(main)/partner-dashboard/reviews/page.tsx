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

const reviewsData = Array(5).fill({
  id: 1,
  name: "What's nearby?",
  date: 'August 13, 2023',
  content:
    "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
  rating: 5,
  verified: true,
  avatar:
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
});

export default function PartnerDashboardReviews() {
  return (
    <div className="space-y-8">

      {/* Top Tabs */}
      <div className="bg-white rounded-[16px] px-8 py-[22px] flex gap-10 shadow-sm border border-[#F2F2F2]">
        {['All', 'Saved Properties', 'Recent Properties'].map((tab, idx) => (
          <button
            key={tab}
            className={`font-bold text-[16px] relative transition-colors pb-1 ${idx === 0 ? 'text-[#2C2E33]' : 'text-[#6C757D] hover:text-[#2C2E33]'
              }`}
          >
            {tab}
            {idx === 0 && (
              <div className="absolute -bottom-[24px] left-0 right-0 h-[3px] bg-[#F1913D]" />
            )}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">

        {/* Header Setup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-[24px] font-bold text-[#2C2E33]">Recent Review</h1>

          <Dialog>
            <DialogTrigger className="flex items-center justify-center gap-2 bg-[#F1913D] hover:bg-[#F1913D]/90 transition-colors text-white font-semibold py-2.5 px-6 rounded-[10px] shadow-sm cursor-pointer outline-none">
              <Plus size={18} strokeWidth={2.5} /> Write a Review
            </DialogTrigger>

            <DialogContent className="sm:max-w-[650px] p-8 gap-6 border-none rounded-[20px] shadow-2xl bg-white">
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
                  <SelectTrigger className="bg-[#F5F5F5] border-none h-[50px] rounded-[10px] text-[15px] text-[#A1A1A1] focus:ring-1 focus:ring-[#F1913D]">
                    <SelectValue placeholder="Select review from here..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px]">
                    <SelectItem value="property">Property Listing</SelectItem>
                    <SelectItem value="agent">Agent Service</SelectItem>
                    <SelectItem value="general">General Experience</SelectItem>
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
                <button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold text-[16px] py-3.5 px-8 rounded-[10px] shadow-sm transition-colors">
                  Post Comment
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col">
          {reviewsData.map((review, idx) => (
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