'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Calendar,
  Check,
  Star,
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  {
    label: 'Average Rating',
    value: '4.8',
    icon: Calendar,
    color: '#2B9724',
  },
  {
    label: 'Total Reviews',
    value: '1,240',
    icon: Calendar,
    color: '#2B9724',
  },
  {
    label: 'Response Rate',
    value: '92%',
    icon: Calendar,
    color: '#2B9724',
  },
];

const reviews = [
  {
    id: 1,
    author: "What's nearby?",
    date: 'August 13, 2023',
    rating: 5,
    content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    verified: true,
  },
  {
    id: 2,
    author: "What's nearby?",
    date: 'August 13, 2023',
    rating: 5,
    content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    verified: true,
  },
  {
    id: 3,
    author: "What's nearby?",
    date: 'August 13, 2023',
    rating: 5,
    content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    verified: true,
  },
  {
    id: 4,
    author: "What's nearby?",
    date: 'August 13, 2023',
    rating: 5,
    content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    verified: true,
  },
  {
    id: 5,
    author: "What's nearby?",
    date: 'August 13, 2023',
    rating: 5,
    content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop',
    verified: true,
  },
];

export default function ReviewsPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-xl border border-[#F2F2F2] shadow-sm flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-[#E1F1E1] flex items-center justify-center">
              <stat.icon size={24} style={{ color: stat.color }} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <p className="text-[#6C757D] text-[16px] font-medium leading-none">{stat.label}</p>
              <h3 className="text-[32px] font-bold text-[#2C2E33] leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-lg border border-[#F2F2F2] shadow-sm">
        <Tabs defaultValue="all" className="w-2/12">
          <TabsList variant="line" className="w-full justify-start border-none h-auto p-0 gap-8 pl-6">
            <TabsTrigger
              value="all"
              className="px-0 py-3 text-[16px] font-semibold data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-11 cursor-pointer"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="positive"
              className="px-0 py-3 text-[16px] font-semibold data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-11 cursor-pointer"
            >
              Positive
            </TabsTrigger>
            <TabsTrigger
              value="critical"
              className="px-0 py-3 text-[16px] font-semibold data-[active]:text-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bg-[#F1913D] group-data-[variant=line]/tabs-list:data-[active]:after:bottom-0 rounded-none h-11 cursor-pointer"
            >
              Critical
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Reviews Content */}
      <div className="bg-white rounded-xl border border-[#F2F2F2] shadow-sm overflow-hidden p-8">
        <h2 className="text-[24px] font-bold text-[#2C2E33] mb-10">Recent Review</h2>

        <div className="space-y-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 pb-2 border-b border-[#F2F2F2]/50 last:border-0"
            >
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#F2F2F2]">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-bold text-[#2C2E33]">{review.author}</h3>
                    {review.verified && (
                      <div className="flex items-center justify-center bg-[#2B9724] rounded-sm w-4.5 h-4.5">
                        <Check size={12} strokeWidth={4} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-[14px] text-[#6C757D] font-medium">{review.date}</p>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? 'text-[#F1913D] fill-[#F1913D]' : 'text-gray-200'}
                    />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed text-[#2C2E33] font-medium max-w-5xl">
                  {review.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}