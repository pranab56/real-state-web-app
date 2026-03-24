'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Eye,
  Globe,
  Home,
  Key,
  Lock,
  Tag,
  Target,
  UserCheck
} from 'lucide-react';
import Image from 'next/image';

const InfoCard = ({ icon: Icon, title, description, dark = false, hasButton = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-10 rounded-2xl flex flex-col items-center text-center space-y-6 ${dark ? 'bg-white shadow-sm' : 'bg-[#F7F7F7]'}`}
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={32} />
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-neutral-1">{title}</h3>
      <p className="text-sm text-neutral-2 leading-relaxed font-medium">{description}</p>
    </div>
    {hasButton && (
      <Button className="bg-[#2D2E32] hover:bg-[#1E1F22] text-white font-bold h-11 px-8 rounded-lg">
        Learn More
      </Button>
    )}
  </motion.div>
);

const ServiceStep = ({ title, description }: { title: string, description: string }) => (
  <div className="p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-colors space-y-4">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-4xl font-black text-neutral-1 leading-tight tracking-tight uppercase">
              About ZilaHomes - Helping <br /> You Find Trusted Properties <br /> and Services Across Ethiopia
            </h1>
            <p className="text-lg text-neutral-2 max-w-xl font-medium leading-relaxed">
              Simplifying your search for excellence in the Ethiopian real estate market. We bridge the gap between dream homes and reality.
            </p>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90 cursor-pointer text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all">
              Explore Listings
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop"
              alt="Modern House"
              width={1200}
              height={800}
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-6 py-24 space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-1 text-center tracking-tight">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <InfoCard
            icon={Target}
            title="Our Mission"
            description="To simplify property discovery through transparency and innovation. We aim to empower every Ethiopian to find, secure, and settle into their ideal space with absolute confidence."
          />
          <InfoCard
            icon={Eye}
            title="Our Vision"
            description="To become Ethiopia's most trusted platform for real estate and hospitality. We envision a seamless ecosystem where luxury, affordability, and legal security coexist."
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-[#1E2024] py-24">
        <div className="container mx-auto px-6 space-y-16">
          <h2 className="text-4xl font-bold text-white text-center tracking-tight">What We Do</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ServiceStep
              title="Properties"
              description="Residential and commercial listings across major Ethiopian cities."
            />
            <ServiceStep
              title="Hotels"
              description="Curated selection of hotels and guest houses for your comfort."
            />
            <ServiceStep
              title="Transportation"
              description="Reliable car rentals and shuttle services for easy transit."
            />
            <ServiceStep
              title="Legal Support"
              description="Expert legal guidance to ensure safe and compliant transactions."
            />
          </motion.div>
        </div>
      </section>

      {/* How Can We Help You? Section */}
      <section className="container mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-1 tracking-tight">How Can We Help You?</h2>
          <p className="text-neutral-2 font-medium italic">Thousands of luxury home enthusiasts just like you visit our website.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={Home}
            title="Buy a Home"
            description="Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else."
            hasButton
          />
          <InfoCard
            icon={Key}
            title="Rent a Home"
            description="Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else."
            hasButton
          />
          <InfoCard
            icon={Tag}
            title="Sell a Home"
            description="Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else."
            hasButton
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-orange-50/20 py-24">
        <div className="container mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto font-medium">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-1 tracking-tight">Why Choose Zila Legal?</h2>
            <p className="text-neutral-2">Secure and reliable legal services tailored for the global diaspora, ensuring your investments are protected across borders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl flex flex-col items-center text-center space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-1">Secure Transactions</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">End-to-end encryption and bank-grade security protocols for all your legal documents and private data.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-2xl flex flex-col items-center text-center space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-1">Verified Partners</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">Direct access to our hand-vetted network of top-tier legal professionals and qualified solicitors.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl flex flex-col items-center text-center space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-1">Remote Management</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">Complete control over your international assets from anywhere in the world without the need for travel.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
