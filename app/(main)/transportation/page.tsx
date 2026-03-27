'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import Image from 'next/image';

const FormLabel = ({ children, optional }: { children: React.ReactNode, optional?: boolean }) => (
  <label className="text-sm font-semibold text-neutral-1 flex gap-1 mb-2">
    {children}
    {optional && <span className="text-neutral-2 font-medium opacity-60">(Optional)</span>}
  </label>
);

export default function TransportationPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] flex items-center justify-center text-center px-4 md:px-6">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&h=800&fit=crop"
          alt="Road Background"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative max-w-4xl space-y-3 md:space-y-4 pt-10 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Book Airport Pickup or <br className="hidden md:block"/> Private Transport
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-white/80 font-medium max-w-2xl mx-auto px-4"
          >
            Reliable airport pickup, drop-off, and private transportation services across Ethiopia.
          </motion.p>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="container mx-auto px-4 md:px-6 mt-[-30px] md:-mt-12 pb-16 md:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/5 p-6 md:p-8 lg:p-12 border border-white"
        >
          <form className="space-y-6 md:space-y-8">
            {/* Requester Name */}
            <div className="space-y-2">
              <FormLabel>Requester's Full Name</FormLabel>
              <Input
                placeholder="Hermela Araya"
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Service Type & Drop-off */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>Service Type</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full p-6 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder="Airport Pickup" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm ">
                    <SelectItem className="rounded-none py-2 " value="pickup">Airport Pickup</SelectItem>
                    <SelectItem className="rounded-none py-2 " value="dropoff">Airport Drop-off</SelectItem>
                    <SelectItem className="rounded-none py-2 " value="private">Private Hire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel>Drop-off Location</FormLabel>
                <Input
                  placeholder="Enter destination address or hotel"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Pickup Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>Pickup Date</FormLabel>
                <Input
                  type="date"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
              <div className="space-y-2">
                <FormLabel>Pickup Time</FormLabel>
                <Input
                  type="time"
                  placeholder="10:30 AM"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>Number of Passengers</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 py-6 w-full  bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder="4" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <SelectItem key={i} className="rounded-none px-4 py-2" value={i.toString()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel>Number of Luggage</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full py-6  bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder="1-2 bags" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    <SelectItem className="rounded-none px-4 py-2" value="0">No luggage</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="1-2">1-2 bags</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="3-4">3-4 bags</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="5+">5+ bags</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vehicle Type & Flight Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>Vehicle Type</FormLabel>
                <Select>
                  <SelectTrigger className="h-12 w-full py-6 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium">
                    <SelectValue placeholder="Sedan (1-3 passengers)" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    <SelectItem className="rounded-none px-4 py-2" value="sedan">Sedan (1-3 passengers)</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="suv">SUV (4-5 passengers)</SelectItem>
                    <SelectItem className="rounded-none px-4 py-2" value="van">Van (6-8 passengers)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <FormLabel optional>Flight Number</FormLabel>
                <Input
                  placeholder="e.g. ET 500"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 pt-4">
              <FormLabel>Contact Information</FormLabel>
              <Input
                placeholder="Hermela Araya"
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <FormLabel>Phone Number <span className="text-[10px] text-neutral-2 font-medium opacity-60 ml-1">(WhatsApp Preferred)</span></FormLabel>
                <Input
                  placeholder="+251 9xx xxx xxxx"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
              <div className="space-y-2">
                <FormLabel optional>Email Address</FormLabel>
                <Input
                  placeholder="Enter your email address"
                  className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
                />
              </div>
            </div>

            {/* Passenger Name (Optional) */}
            <div className="space-y-2">
              <FormLabel optional>Passenger Name <span className="text-[10px] text-neutral-2 font-medium opacity-60 ml-1">- if different from requester</span></FormLabel>
              <Input
                placeholder="e.g. Name of person being picked up"
                className="h-12 bg-[#F6F6F6] border-none rounded-sm px-6 text-neutral-1 font-medium"
              />
            </div>

            {/* Confirm Button */}
            <div className="pt-8 space-y-6 text-center">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg transition-transform active:scale-[0.98]">
                Confirm Booking
              </Button>
              <p className="text-sm text-neutral-2 font-medium opacity-70">
                Price includes tax and gratuity. Free cancellation up to 24h before.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
