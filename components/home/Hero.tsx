'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Search,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [activeMainTab, setActiveMainTab] = useState('Real Estate');
  const [activeSubTab, setActiveSubTab] = useState('Houses');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mainTabs = ['Real Estate', 'Hotels', 'Guesthouses', 'Transportation', 'POA/Legal'];
  const amenities = ['Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor', 'Floor'];
  return (
    <section>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full pt-32 pb-20 flex items-center overflow-hidden bg-[#1E2024]">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 w-full text-center relative z-20">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Find Verified Homes, Hotels & <br /> Transportation in Ethiopia.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              We are a real estate agency that will help you find the best residence you dream of, let's discuss for your dream house?
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#F1913D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-white fill-white" />
                </div>
                <span className="text-white font-bold text-lg">7070</span>
              </div>
              <div className="w-px h-6 bg-white/30 hidden md:block" />
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#2B9724] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xs uppercase">WA</span>
                </div>
                <span className="text-white font-bold text-lg">WhatsApp</span>
              </div>
              <div className="w-px h-6 bg-white/30 hidden md:block" />
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#F1913D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-white fill-white" />
                </div>
                <span className="text-white font-bold text-lg">support@zilahomes.com</span>
              </div>
            </div>
          </motion.div>

          {/* Search Component Container */}
          <div className="mt-16 max-w-6xl mx-auto">
            {/* Top Tabs */}
            <div className="flex flex-wrap items-center justify-center bg-white/10 backdrop-blur-md rounded-t-xl overflow-hidden border-x border-t border-white/20 w-fit mx-auto">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMainTab(tab)}
                  className={cn(
                    "px-8 py-4 text-sm font-bold cursor-pointer transition-all whitespace-nowrap",
                    activeMainTab === tab
                      ? "bg-[#F1913D] text-white shadow-xl"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Panel */}
            <motion.div
              layout
              className="bg-white rounded-xl  shadow-2xl overflow-hidden p-6 md:p-8"
            >
              {/* Sub Tabs */}
              <div className="flex gap-6 mb-8 border-b border-gray-100">
                {['Houses', 'Commercial'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={cn(
                      "pb-2 text-sm font-bold transition-all relative cursor-pointer",
                      activeSubTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Input Row */}
              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search Input */}
                  <div className="relative group">
                    <Search className="absolute left-4 top-6 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors z-10" size={20} />
                    <input
                      type="text"
                      placeholder="Search Now"
                      className="w-full h-12 pl-12 pr-4 bg-[#F2F2F2] border-none rounded-sm text-gray-800 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Dropdowns */}
                  <div className="relative">
                    <Select defaultValue="buy">
                      <SelectTrigger className="w-full h-12 px-4 bg-[#F2F2F2] border-none rounded-sm py-6 text-gray-800 font-medium focus:outline-none cursor-pointer text-base">
                        <SelectValue placeholder="Buy Houses" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded">
                        <SelectItem className="rounded" value="buy">Buy Houses</SelectItem>
                        <SelectItem className="rounded" value="rent">Rent Houses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full h-12 px-4 bg-[#F2F2F2] border-none rounded-sm py-6 text-gray-800 font-medium focus:outline-none cursor-pointer text-base">
                        <SelectValue placeholder="Property Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded">
                        <SelectItem className="rounded" value="all">Property Types</SelectItem>
                        <SelectItem className="rounded" value="villa">Villa</SelectItem>
                        <SelectItem className="rounded" value="apartment">Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Select defaultValue="ethiopia">
                      <SelectTrigger className="w-full h-12 px-4 bg-[#F2F2F2] border-none rounded-sm py-6 text-gray-800 font-medium focus:outline-none cursor-pointer text-base">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded">
                        <SelectItem className="rounded" value="ethiopia">Addis Ababa</SelectItem>
                        <SelectItem className="rounded" value="dire-dawa">Dire Dawa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={cn(
                      "h-12 px-6 rounded flex items-center justify-center cursor-pointer transition-all",
                      showAdvanced ? "bg-red-500 text-white" : "bg-[#2B9724] text-white hover:bg-[#2B9724]/90"
                    )}
                  >
                    {showAdvanced ? <X size={24} /> : <span className="font-bold">Advanced</span>}
                  </button>
                  <Button className="h-12 px-8 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white rounded flex items-center gap-3 shadow-xl transition-all flex-1 md:flex-none">
                    <span className="font-bold">Search Now</span>
                    <Search size={22} />
                  </Button>
                </div>
              </div>

              {/* Advanced Controls Content */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 space-y-8">
                      {/* Sliders Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-gray-800">Price Range from</span>
                            <span className="text-primary uppercase tracking-wider">ETB100 to ETB650,000</span>
                          </div>
                          <Slider defaultValue={[25, 75]} max={100} step={1} className="w-full" />
                        </div>
                        <div className="space-y-6">
                          <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-gray-800">Size Range from</span>
                            <span className="text-primary uppercase tracking-wider">500 SqFt to 1,500 SqFt</span>
                          </div>
                          <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
                        </div>
                      </div>

                      {/* Selects Row */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: 'Rooms', count: '2' },
                          { label: 'Bathrooms', count: '2' },
                          { label: 'Bedrooms', count: '2' },
                          { label: 'Type', count: 'Apartment' }
                        ].map((item) => (
                          <div key={item.label} className="space-y-2">
                            <Label className="text-sm font-bold text-gray-800">{item.label}</Label>
                            <Select defaultValue="default">
                              <SelectTrigger className="w-full h-12 px-4 bg-[#F2F2F2] border-none outline-none focus:outline-none rounded py-6 text-gray-800 font-medium focus:ring-2 focus:ring-primary/20 cursor-pointer">
                                <SelectValue placeholder={item.count} />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-none shadow-xl rounded">
                                <SelectItem className="rounded" value="default">{item.count}</SelectItem>
                                <SelectItem className="rounded" value="1">1</SelectItem>
                                <SelectItem className="rounded" value="2">2</SelectItem>
                                <SelectItem className="rounded" value="3">3+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>

                      {/* Amenities */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium text-gray-800 uppercase tracking-widest">Amenities:</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {amenities.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-[#F2F2F2] rounded cursor-pointer hover:bg-gray-200 transition-colors">
                              <Checkbox id={`amenity-${index}`} className="w-5 h-5 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                              <Label htmlFor={`amenity-${index}`} className="text-sm font-medium text-gray-700 cursor-pointer">{item}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}