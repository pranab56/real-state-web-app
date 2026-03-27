'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const travelCards = [
  {
    title: 'Hotels',
    description: 'Browse hotels and private houses that offer comfort, convenience, and great locations.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&fit=crop'
  },
  {
    title: 'Guesthouses',
    description: 'Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&h=400&fit=crop'
  },
  {
    title: 'Airport Pickup, Dropoff and City Rides.',
    description: 'Book reliable airport transportation for easy arrival and departure.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&h=400&fit=crop'
  }
];

const howItWorks = [
  {
    title: 'Search Listings',
    description: 'Browse houses, commercial properties, hotels, guesthouses, and transportation options across Ethiopia with advanced filtering.',
    icon: <Building2 className="w-12 h-12 text-primary" />
  },
  {
    title: 'Verified Properties',
    description: 'Every listing is visited by our team. Photographs, legal agreements, and documentation are rigorously reviewed and kept secure.',
    icon: <Search className="w-12 h-12 text-primary" />
  },
  {
    title: 'Secure Transactions',
    description: 'Buying and selling processes are managed via ZilaHomes protocols to ensure a fully protected and trusted financial experience.',
    icon: <ShieldCheck className="w-12 h-12 text-primary" />
  },
  {
    title: 'Connect & Complete',
    description: 'Directly contact verified providers and finalize your booking or purchase with full confidence and professional support.',
    icon: <CheckCircle2 className="w-12 h-12 text-primary" />
  }
];

export default function TravelPlanSection() {
  return (
    <div className="bg-white">
      {/* 1. Plan Your Stay & Travel Section */}
      <section className="bg-[#2C2E33] py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold px-4"
            >
              Plan Your Stay & Travel in Ethiopia
            </motion.h2>
            <p className="max-w-xl mx-auto text-neutral-2 text-sm md:text-lg font-medium px-4">
              Discover comfortable guesthouses, hotels, and reliable transportation services to make your trip smooth and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {travelCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#2C2E33] border border-white/10 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col items-center text-center p-0"
              >
                <div className="relative w-full h-48 md:h-52 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <div className="p-6 md:p-8 space-y-3 md:space-y-4 flex flex-col items-center">
                  <h3 className="text-lg md:text-xl font-bold line-clamp-2 min-h-0 md:min-h-[3.5rem] flex items-center">
                    {card.title}
                  </h3>
                  <p className="text-neutral-2 text-xs md:text-sm leading-relaxed mb-2 md:mb-4">
                    {card.description}
                  </p>
                  <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-11 md:h-12 px-8 md:px-10 rounded-xl transition-all w-full text-sm">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Ready to Experience Banner */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#FFF9F2] rounded-3xl md:rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row relative min-h-0 md:min-h-[450px]"
          >
            <div className="lg:w-2/3 p-8 md:p-12 lg:p-20 space-y-6 md:space-y-8 z-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-1 leading-tight">
                Ready to experience <br className="hidden md:block" /> Ethiopia?
              </h2>
              <p className="text-neutral-2 text-sm md:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
                Book your complete travel package with EliteEstates today. We handle everything so you can focus on the journey.
              </p>
              <Button className="bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold h-12 md:h-14 px-10 md:px-12 rounded-xl text-base md:text-lg shadow-xl shadow-primary/20 w-full md:w-auto">
                Book now
              </Button>
            </div>

            <div className="relative w-full lg:w-1/3 h-[250px] md:h-[350px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt="Professional Man"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. How Zilahomes Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="space-y-2 md:space-y-4 mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-neutral-1"
            >
              How Zilahomes Works
            </motion.h2>
            <p className="max-w-2xl mx-auto text-neutral-2 text-sm md:text-lg font-medium">
              Discover verified properties and services through our seamless, secure, and transparent ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center gap-4 md:gap-6 group"
              >
                <div className="p-3 md:p-4 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <div className="scale-75 md:scale-100">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-1">
                  {item.title}
                </h3>
                <p className="text-neutral-2 text-xs md:text-sm leading-relaxed font-semibold">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
