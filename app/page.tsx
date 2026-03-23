'use client';

import { PropertyCard } from '@/components/property/property-card';
import { Navbar } from '@/components/shared/navbar';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { gsap } from '@/lib/gsap-utils';
import { ArrowRight, MapPin, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const mockProperties = [
  {
    id: '1',
    title: 'Modern Minimalist Villa',
    price: '$1,250,000',
    location: 'Beverly Hills, CA',
    beds: 4,
    baths: 3,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    status: 'For Sale' as const,
  },
  {
    id: '2',
    title: 'Skyline Penthouse',
    price: '$5,500/mo',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    area: 1500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    status: 'For Rent' as const,
  },
  {
    id: '3',
    title: 'Coastal Retreat',
    price: '$2,100,000',
    location: 'Malibu, CA',
    beds: 5,
    baths: 4,
    area: 4500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    status: 'For Sale' as const,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      headlineRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    )
      .fromTo(
        '.hero-stagger',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.8'
      );
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[700px] w-full overflow-hidden flex items-center pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>

        <SectionWrapper animate={false} className="z-20 w-full">
          <div className="max-w-3xl space-y-8">
            <h1
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              FIND YOUR <br />
              <span className="text-white/60">DREAM</span> HOME
            </h1>

            <p className="hero-stagger text-lg md:text-xl text-white/80 max-w-xl font-medium">
              Experience the future of real estate with Zila Homes. Premium listings, transparent deals, and modern living spaces tailored for you.
            </p>

            {/* Search Bar */}
            <div className="hero-stagger flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/20 shadow-2xl">
              <div className="flex-1 flex items-center gap-4 px-6 py-2">
                <MapPin className="text-white" size={20} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Location</span>
                  <input
                    type="text"
                    placeholder="Search city, neighborhood..."
                    className="bg-transparent border-none text-white focus:ring-0 placeholder-white/40 text-sm font-medium p-0"
                  />
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20" />
              <div className="flex-1 flex items-center gap-4 px-6 py-2">
                <SlidersHorizontal className="text-white" size={20} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Property Type</span>
                  <select className="bg-transparent border-none text-white focus:ring-0 text-sm font-medium p-0 appearance-none cursor-pointer">
                    <option className="text-black">All Types</option>
                    <option className="text-black">Villa</option>
                    <option className="text-black">Apartment</option>
                  </select>
                </div>
              </div>
              <Button size="lg" className="h-full px-12 rounded-3xl bg-white text-black hover:bg-zinc-200">
                Search
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Featured Properties */}
      <SectionWrapper id="featured" className="bg-zinc-50/50">
        <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">Featured Properties</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              EXCEPTIONAL <br />
              RESIDENCES.
            </h2>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            View All Properties <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-white text-black font-bold">Z</div>
                <span className="text-2xl font-black tracking-tighter">Zila Homes</span>
              </div>
              <p className="text-zinc-500 max-w-sm text-lg font-medium leading-relaxed">
                We're redefining the real estate experience with modern technology and premium service.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Company</h4>
              <ul className="space-y-4 text-zinc-500">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/agents" className="hover:text-white transition-colors">Our Agents</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Support</h4>
              <ul className="space-y-4 text-zinc-500">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm">
            <p>© 2026 Zila Homes. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Instagram</span>
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}