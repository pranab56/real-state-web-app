'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import {
  FileText,
  Globe,
  Lock,
  Search,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import Image from 'next/image';

const FeatureCard = ({ icon: Icon, title, description, light = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-10 rounded-2xl flex flex-col items-center text-center space-y-4 ${light ? 'bg-white shadow-sm' : 'bg-[#F7F7F7]'}`}
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold text-neutral-1">{title}</h3>
    <p className="text-sm text-neutral-2 leading-relaxed">{description}</p>
  </motion.div>
);

const ProcessStep = ({ title, description }: { title: string, description: string }) => (
  <div className="p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-colors space-y-4">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function POAPage() {
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
            <h1 className="text-4xl md:text-5xl font-black text-neutral-1 uppercase leading-tight tracking-tight">
              Legal & Power of <br /> Attorney (POA) Services
            </h1>
            <p className="text-lg text-neutral-2 max-w-xl font-medium leading-relaxed">
              Secure Property Transactions in Ethiopia. We represent buyers abroad to ensure safe, legal, and transparent investments through professional Power of Attorney management.
            </p>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all">
              Request Legal Assistance
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&h=800&fit=crop"
              alt="Legal Background"
              width={1200}
              height={800}
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Use ZilaHomes POA? Section */}
      <section className="container mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto font-medium">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-1 tracking-tight italic">Why Use ZilaHomes POA?</h2>
          <p className="text-neutral-2">We bridge the gap between your location abroad and the Ethiopian property market with ironclad legal protection.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Search}
            title="Verify Ownership"
            description="Rigorous checks of land titles, historical records, and official registry to prevent fraud and disputes."
          />
          <FeatureCard
            icon={FileText}
            title="Manage Agreements"
            description="Expert handling of sales and purchase contracts, ensuring terms are favorable and legally binding in Ethiopia."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Protect Investment"
            description="Ensuring your funds are held securely and property rights are transferred only when all conditions are met."
          />
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="bg-[#1E2024] py-24">
        <div className="container mx-auto px-6 space-y-16">
          <div className="text-center font-bold italic">
            <h2 className="text-4xl text-white tracking-tight">Our 4-Step Secure Process</h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ProcessStep
              title="Property Selection"
              description="Choose from our verified listings or bring your own property for assessment."
            />
            <ProcessStep
              title="Legal Verification"
              description="Our legal team conducts a full title search and due diligence at the sub-city land registry."
            />
            <ProcessStep
              title="POA Authorization"
              description="Authorize ZilaHomes as your legal representative through the Ethiopian Embassy or Ministry of Foreign Affairs."
            />
            <ProcessStep
              title="Secure Transaction"
              description="Finalize the purchase, manage payments via escrow, and receive the title deed in your name."
            />
          </motion.div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100 flex flex-col lg:row-reverse items-stretch lg:flex-row-reverse">
          <div className="lg:w-1/2 relative min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2959663?q=80&w=1200&h=1200&fit=crop"
              alt="Consultation"
              fill
              className="object-cover brightness-[0.9]"
            />
          </div>
          <div className="lg:w-1/2 p-10 lg:p-16 space-y-8 bg-white">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-neutral-1">Request a Legal Consultation</h2>
              <p className="text-neutral-2 font-medium">Speak with our legal experts to understand how we can represent your interests in Ethiopia.</p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-1 ml-1">Full Name</label>
                <Input placeholder="John Doe" className="h-12 bg-[#F6F6F6] border-none rounded-lg px-6 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-1 ml-1">Email Address</label>
                <Input placeholder="john@example.com" className="h-12 bg-[#F6F6F6] border-none rounded-lg px-6 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-1 ml-1">Phone Number</label>
                <Input placeholder="+1 (234) 567-8900" className="h-12 bg-[#F6F6F6] border-none rounded-lg px-6 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-1 ml-1">Message</label>
                <Textarea placeholder="Tell us about your property interests..." className="min-h-[120px] bg-[#F6F6F6] border-none rounded-lg p-6 font-medium resize-none" />
              </div>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-transform active:scale-[0.98]">
                Request Consultation
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Zila Legal? Section */}
      <section className="bg-orange-50/20 py-24">
        <div className="container mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto font-medium">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-1 tracking-tight">Why Choose Zila Legal?</h2>
            <p className="text-neutral-2">Secure and reliable legal services tailored for the global diaspora, ensuring your investments are protected across borders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              light
              icon={Lock}
              title="Secure Transactions"
              description="End-to-end encryption and bank-grade security protocols for all your legal documents and private data."
            />
            <FeatureCard
              light
              icon={UserCheck}
              title="Verified Partners"
              description="Direct access to our hand-vetted network of top-tier legal professionals and qualified solicitors."
            />
            <FeatureCard
              light
              icon={Globe}
              title="Remote Management"
              description="Complete control over your international assets from anywhere in the world without the need for travel."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
