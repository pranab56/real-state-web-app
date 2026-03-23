'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PolicySection = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-neutral-1">Privacy & Policy</h2>
    <p className="text-neutral-2 leading-relaxed text-sm lg:text-base font-medium opacity-80">
      Lorem ipsum dolor sit amet consectetur. Tortor pellentesque penatibus eu amet pretium neque. Tempor sem sit
      commodo erat elit vitae. Pellentesque pharetra nullam eu tincidunt risus. Habitant ultricies quam neque a. Tellus at odio
      dictumst tincidunt lobortis et. Mollis parturient diam amet libero nisl et quis semper. Duis cursus tempus consequat
      tincidunt. Tincidunt aliquam eu cursus fermentum senectus pulvinar. Elementum a quisque donec eu viverra at tellus
      dignissim. Ullamcorper fringilla leo natoque a bibendum fermentum id fringilla sed. Et sed sollicitudin tortor rhoncus
      porttitor purus.
    </p>
  </motion.div>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#FAF6F2] py-24 text-center mt-12">
        <div className="container mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Link href="/" className="text-primary hover:underline">Company</Link>
            <ChevronRight size={14} className="text-neutral-2" />
            <span className="text-neutral-2">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-1">Privacy & Policy</h1>
          <p className="text-neutral-2 text-sm md:text-base font-medium max-w-lg mx-auto opacity-70">
            View our policy & privacy page will help you more...
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-5xl py-24 space-y-16">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <PolicySection key={i} index={i} />
        ))}
      </section>
    </div>
  );
}
