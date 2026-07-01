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
import Link from 'next/link';

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  dark?: boolean;
  hasButton?: boolean;
  href?: string;
}

const InfoCard = ({ icon: Icon, title, description, dark = false, hasButton = false, href }: InfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 md:p-10 rounded-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 ${dark ? 'bg-white shadow-sm' : 'bg-[#F7F7F7]'}`}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={32} />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-neutral-1">{title}</h3>
        <p className="text-sm text-neutral-2 leading-relaxed font-medium">{description}</p>
      </div>
      {hasButton && href && (
        <Link href={href}>
          <Button className="bg-[#2D2E32] hover:bg-[#1E1F22] text-white font-medium h-11 px-8 rounded-lg cursor-pointer transition-colors">
            Learn More
          </Button>
        </Link>
      )}
    </motion.div>
  );
};

const ServiceStep = ({ title, description }: { title: string, description: string }) => (
  <div className="p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-colors space-y-3 md:space-y-4">
    <h3 className="text-base md:text-lg font-medium text-white">{title}</h3>
    <p className="text-xs md:text-sm text-white/50 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <h1
              className="text-xl md:text-4xl font-black text-neutral-1 leading-tight tracking-tight uppercase"
              dangerouslySetInnerHTML={{ __html: 'About ZilaHomes - Helping <br class="hidden md:block" /> You Find Trusted Properties <br class="hidden md:block" /> and Services Across Ethiopia' }}
            />
            <p className="sm:text-lg text-sm text-neutral-2 max-w-xl font-medium leading-relaxed">
              Simplifying your search for excellence in the Ethiopian real estate market. We bridge the gap between dream homes and reality.
            </p>
            <Button className="h-10 md:h-12 px-6 md:px-8 bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium rounded-lg shadow-lg shadow-primary/20 transition-all">
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
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-10 md:space-y-16">
        <h2 className="text-2xl md:text-4xl font-medium text-neutral-1 text-center tracking-tight">Our Mission &amp; Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <InfoCard
            icon={Target}
            title="Our Mission"
            description="To simplify property discovery through transparency and innovation, making premium real estate accessible to everyone in Ethiopia."
          />
          <InfoCard
            icon={Eye}
            title="Our Vision"
            description="To become Ethiopia's most trusted platform for real estate, hospitality, and legal services, empowering buyers, sellers, and investors."
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-[#1E2024] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-10 md:space-y-16">
          <h2 className="text-2xl md:text-4xl font-medium text-white text-center tracking-tight">What We Do</h2>
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
              title="Property Listings"
              description="Browse verified residential and commercial properties for sale or rent across Ethiopia's top cities."
            />
            <ServiceStep
              title="Hotels & Hospitality"
              description="Discover and book hotels and guesthouses with confidence through our curated listings."
            />
            <ServiceStep
              title="Transportation"
              description="Book premium airport pickup, drop-off, and private transportation services with ease."
            />
            <ServiceStep
              title="Legal & POA Services"
              description="Navigate property transactions confidently with our Power of Attorney and legal assistance services."
            />
          </motion.div>
        </div>
      </section>

      {/* How Can We Help You? Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-10 md:space-y-16">
        <div className="text-center space-y-3 md:space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-medium text-neutral-1 tracking-tight">How Can We Help You?</h2>
          <p className="text-neutral-2 font-medium italic">Whether you&apos;re buying, renting, or selling — we&apos;ve got you covered.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={Home}
            title="Buy a Home"
            description="Find your dream home from our extensive list of verified properties across Ethiopia's major cities."
            hasButton
            href="/properties"
          />
          <InfoCard
            icon={Key}
            title="Rent a Home"
            description="Explore affordable rental properties with flexible terms and verified listings for a hassle-free experience."
            hasButton
            href="/properties"
          />
          <InfoCard
            icon={Tag}
            title="Sell a Home"
            description="List your property with us and reach thousands of potential buyers and renters across Ethiopia."
            hasButton
            href="/register"
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-orange-50/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-10 md:space-y-16">
          <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto font-medium">
            <h2 className="text-2xl md:text-4xl font-medium text-neutral-1 tracking-tight">Why Choose Zila Legal?</h2>
            <p className="text-neutral-2">We provide unmatched trust and transparency in every transaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-10 rounded-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-medium text-neutral-1">Secure Transactions</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">Every transaction on our platform is backed by legal verification and secure payment processes.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 md:p-10 rounded-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-medium text-neutral-1">Verified Partners</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">All our agents and property partners are thoroughly vetted to ensure you work with trusted professionals.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 md:p-10 rounded-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-medium text-neutral-1">Remote Management</h3>
              <p className="text-sm text-neutral-2 leading-relaxed font-medium">Manage your property investments from anywhere in the world with our digital-first platform and POA services.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
