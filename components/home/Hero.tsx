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
  Search,
  X
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation('common');
  const [activeMainTab, setActiveMainTab] = useState(t('hero.real_estate'));
  const [activeSubTab, setActiveSubTab] = useState(t('hero.houses'));
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mainTabs = [t('hero.real_estate'), t('hero.hotels'), t('hero.guesthouses'), t('hero.transportation'), t('hero.legal')];
  const amenities = [t('hero.amenities'), t('hero.amenities')]; // Scalable later
  return (
    <section>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full pt-20 md:pt-32 pb-12 md:pb-20 flex items-center overflow-hidden bg-[#1E2024]">
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

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full text-center relative z-20">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto space-y-4 md:space-y-6"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.1] px-2" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
            <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0 opacity-80 md:opacity-100">
              {t('hero.subtitle')}
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 pt-2 md:pt-4 px-2">
              <div className="flex items-center gap-2 md:gap-3 group cursor-pointer bg-white/5 md:bg-transparent p-1.5 md:p-0 rounded border border-white/10 md:border-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-white/10 backdrop-blur-md p-2.5 md:p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Image src="/icons/hero/phone.png" alt="Phone" width={32} height={32} className='w-full h-full object-contain' />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm md:text-lg">7070</span>
              </div>

              <div className="w-px h-6 bg-white/30 hidden md:block" />

              <div className="flex items-center gap-2 md:gap-3 group cursor-pointer bg-white/5 md:bg-transparent p-1.5 md:p-0 rounded border border-white/10 md:border-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm p-2 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Image src="/icons/hero/whats.png" alt="WhatsApp" width={48} height={48} className='w-full h-full object-contain' />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm md:text-lg">WhatsApp</span>
              </div>

              <div className="w-px h-6 bg-white/30 hidden md:block" />

              <div className="flex items-center  gap-2 md:gap-3 group cursor-pointer bg-white/5 md:bg-transparent p-1.5 md:p-0 rounded border border-white/10 md:border-none">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm p-2.5 md:p-3 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Image src="/icons/hero/email.png" alt="Email" width={32} height={32} className='w-full h-full object-contain' />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm md:text-lg truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">support@zilahomes.com</span>
              </div>
            </div>
          </motion.div>

          {/* Search Component Container */}
          <div className="mt-10 md:mt-16 max-w-6xl mx-auto px-1 sm:px-0">
            {/* Top Tabs Wrapper */}
            <div className="relative group/tabs w-full md:w-fit mx-auto">
              <div className="flex items-center justify-center">
                <div
                  className="flex flex-nowrap overflow-x-auto md:flex-wrap items-center md:justify-center bg-[#1E2024]/60 backdrop-blur-md rounded-t-xl border-x border-t border-white/20 w-full md:w-fit mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10"
                >
                  {mainTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMainTab(tab)}
                      className={cn(
                        "px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 text-[12px] sm:text-[13px] md:text-sm font-bold cursor-pointer transition-all whitespace-nowrap outline-none",
                        activeMainTab === tab
                          ? "bg-[#F1913D] text-white shadow-xl"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Scroll Indicator - Arrow */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none md:hidden animate-pulse">
                <div className="bg-[#F1913D] p-1 rounded-full shadow-lg">
                  <motion.svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </motion.svg>
                </div>
              </div>
            </div>

            {/* Search Panel */}
            <motion.div
              layout
              className="bg-white rounded-b-xl md:rounded-b-2xl md:rounded-tr-2xl shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8"
            >
              {/* Sub Tabs */}
              <div className="flex gap-4 sm:gap-6 mb-6 md:mb-8 border-b border-gray-100 overflow-x-auto pb-px [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {['Houses', 'Commercial'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={cn(
                      "pb-2 text-[13px] sm:text-sm font-bold transition-all relative cursor-pointer whitespace-nowrap",
                      activeSubTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Input Row */}
              <div className="flex flex-col xl:flex-row gap-3 md:gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {/* Search Input */}
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors z-10" size={18} />
                    <input
                      type="text"
                      placeholder={t('hero.search')}
                      className="w-full h-11 md:h-12 pl-11 pr-4 bg-[#F2F2F2] border-none rounded-[4px] text-gray-800 placeholder:text-gray-600 text-[13px] md:text-sm font-medium focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  {/* Dropdowns */}
                  <div className="relative">
                    <Select defaultValue="buy">
                      <SelectTrigger className="w-full h-11 md:h-12 px-4 py-6 bg-[#F2F2F2] border-none rounded-[4px] text-gray-800 font-medium focus:outline-none cursor-pointer text-[13px] md:text-sm">
                        <SelectValue placeholder="Buy Houses" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded-lg">
                        <SelectItem className="rounded" value="buy">Buy Houses</SelectItem>
                        <SelectItem className="rounded" value="rent">Rent Houses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full h-11 md:h-12 py-6 px-4 bg-[#F2F2F2] border-none rounded-[4px] text-gray-800 font-medium focus:outline-none cursor-pointer text-[13px] md:text-sm">
                        <SelectValue placeholder="Property Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded-lg">
                        <SelectItem className="rounded" value="all">Property Types</SelectItem>
                        <SelectItem className="rounded" value="villa">Villa</SelectItem>
                        <SelectItem className="rounded" value="apartment">Apartment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Select defaultValue="ethiopia">
                      <SelectTrigger className="w-full h-11 md:h-12 px-4 py-6 bg-[#F2F2F2] border-none rounded-[4px] text-gray-800 font-medium focus:outline-none cursor-pointer text-[13px] md:text-sm">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-none shadow-xl rounded-lg">
                        <SelectItem className="rounded" value="ethiopia">Addis Ababa</SelectItem>
                        <SelectItem className="rounded" value="dire-dawa">Dire Dawa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={cn(
                      "h-11 md:h-12 w-11 md:w-auto md:px-6 rounded-[4px] flex items-center justify-center cursor-pointer transition-all shrink-0",
                      showAdvanced ? "bg-red-500 text-white" : "bg-[#2B9724] text-white hover:bg-[#2B9724]/90"
                    )}
                  >
                    {showAdvanced ? <X size={20} /> : <span className="font-bold hidden md:inline text-sm">{t('hero.advanced')}</span>}
                    {!showAdvanced && <span className="md:hidden">
                      <div className="w-4 h-0.5 bg-white mb-0.5" />
                      <div className="w-4 h-0.5 bg-white mb-0.5" />
                      <div className="w-4 h-0.5 bg-white" />
                    </span>}
                  </button>
                  <Button className="h-11 md:h-12 px-4 cursor-pointer sm:px-6 md:px-8 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white rounded-[4px] flex items-center justify-center gap-2 shadow-xl transition-all flex-1 border-none">
                    <span className="font-bold text-[13px] md:text-base">{t('hero.search')}</span>
                    <Search size={18} className="md:size-[20px]" />
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
                    <div className="pt-6 md:pt-8 space-y-6 md:space-y-8">
                      {/* Sliders Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex justify-between items-center text-[12px] md:text-sm font-bold">
                            <span className="text-gray-800">{t('hero.price_range')}</span>
                            <span className="text-primary uppercase tracking-wider">ETB100 to ETB650,000</span>
                          </div>
                          <Slider defaultValue={[25, 75]} max={100} step={1} className="w-full" />
                        </div>
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex justify-between items-center text-[12px] md:text-sm font-bold">
                            <span className="text-gray-800">{t('hero.size_range')}</span>
                            <span className="text-primary uppercase tracking-wider">500 SqFt to 1,500 SqFt</span>
                          </div>
                          <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
                        </div>
                      </div>

                      {/* Selects Row */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                          { label: t('hero.rooms'), count: '2' },
                          { label: t('hero.bathrooms'), count: '2' },
                          { label: t('hero.bedrooms'), count: '2' },
                          { label: t('hero.type'), count: 'Apartment' }
                        ].map((item) => (
                          <div key={item.label} className="space-y-1 md:space-y-2">
                            <Label className="text-xs md:text-sm font-bold text-gray-800">{item.label}</Label>
                            <Select defaultValue="default">
                              <SelectTrigger className="w-full h-11 md:h-12 px-3 md:px-4 bg-[#F2F2F2] border-none outline-none focus:outline-none rounded-[4px] py-5 md:py-6 text-gray-800 font-medium focus:ring-1 focus:ring-primary/20 cursor-pointer text-[12px] md:text-sm">
                                <SelectValue placeholder={item.count} />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-none shadow-xl rounded-lg">
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
                      <div className="space-y-3 md:space-y-4">
                        <Label className="text-xs md:text-sm font-medium text-gray-800 uppercase tracking-widest">Amenities:</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
                          {amenities.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 md:p-3 bg-[#F2F2F2] rounded-[4px] cursor-pointer hover:bg-gray-200 transition-colors">
                              <Checkbox id={`amenity-${index}`} className="w-4 h-4 sm:w-5 sm:h-5 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                              <Label htmlFor={`amenity-${index}`} className="text-[12px] md:text-sm font-medium text-gray-700 cursor-pointer">{item}</Label>
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