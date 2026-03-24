'use client';

import { ArrowLeftRight, Bath, BedDouble, Bookmark, ChevronLeft, ChevronRight, MapPin, Maximize, Search } from 'lucide-react';
import Image from 'next/image';

const properties = Array(9).fill({
  id: 1,
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  price: 'ETB165.00',
  address: '14691 Stratford Dr, Woodbridge, VA 22193',
  beds: 4,
  baths: 3,
  area: 900,
});

export default function PartnerDashboardHotels() {
  return (
    <div className="space-y-8">

      {/* Top Tabs */}
      <div className="bg-white rounded-[16px] px-8 py-[22px] flex gap-10 shadow-sm border border-gray-100">
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

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={property.image}
                  alt="Property"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Top Left Badges */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <span className="bg-[#2B9724] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    Zila Verified
                  </span>
                  <span className="bg-[#F1913D] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    For Sale
                  </span>
                </div>

                {/* Bottom Right Actions */}
                <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                  <button className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/30">
                    <ArrowLeftRight size={16} strokeWidth={2.5} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/30">
                    <Bookmark size={16} strokeWidth={2.5} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/30">
                    <Search size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="text-[22px] font-bold text-[#2C2E33] mb-2">{property.price}</h3>

              <div className="flex items-start gap-2 text-[#6C757D] mb-5">
                <MapPin size={18} className="text-[#6C757D] flex-shrink-0 mt-0.5" />
                <p className="text-[14px] font-medium leading-tight">{property.address}</p>
              </div>

              <div className="flex items-center justify-between text-[#6C757D] font-medium text-[13px] pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <BedDouble size={18} strokeWidth={1.5} />
                  <span>Beds <span className="font-bold text-[#2C2E33] ml-0.5">{property.beds}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bath size={18} strokeWidth={1.5} />
                  <span>Baths <span className="font-bold text-[#2C2E33] ml-0.5">{property.baths}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize size={16} strokeWidth={1.5} />
                  <span>m² <span className="font-bold text-[#2C2E33] ml-0.5">{property.area}</span></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-8 pb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#6C757D] font-semibold text-[15px] rounded-lg border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
          <ChevronLeft size={16} strokeWidth={2.5} /> Previous
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#F1913D] text-white font-bold rounded-lg shadow-sm">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-[#2C2E33] border border-gray-100 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-[#2C2E33] border border-gray-100 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          3
        </button>
        <div className="w-10 h-10 flex items-center justify-center bg-white text-[#6C757D] font-bold rounded-lg shadow-sm border border-gray-100">
          ...
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white text-[#2C2E33] border border-gray-100 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          12
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#2C2E33] font-semibold text-[15px] rounded-lg border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
          Next <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}