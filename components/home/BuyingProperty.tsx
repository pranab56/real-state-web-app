'use client';

import { motion } from 'framer-motion';
import { Check, FileText, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: 'Power of Attorney Services',
    description: 'Authorize a trusted representative to buy, sell, or manage property and business matters on your behalf.'
  },
  {
    title: 'Legal Verification',
    description: 'Ensure property ownership, title deeds, and documentation are legally verified.'
  },
  {
    title: 'Document Assistance',
    description: 'Get help preparing POA documents, legal paperwork, and registration support.'
  }
];

export default function BuyingProperty() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-1 leading-tight">
                Buying Property From <br className="hidden md:block" /> Abroad?
              </h2>
              <p className="text-sm md:text-base text-neutral-2 font-medium max-w-lg mx-auto lg:mx-0">
                Zila Legal helps diaspora buyers complete property transactions securely through Power of Attorney and verified legal partners.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 text-left max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <Check className="text-white" size={14} strokeWidth={4} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-1">{feature.title}</h3>
                    <p className="text-neutral-2 text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-8 sm:mt-10 lg:mt-0"
          >
            <div className="relative h-[320px] sm:h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&h=1000&fit=crop"
                alt="Modern Interior"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-full flex flex-row gap-2 sm:gap-3 md:gap-4 px-0 md:px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex-1 bg-white p-2.5 sm:p-3 md:p-4 rounded-xl shadow-xl border border-gray-100 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck size={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[8px] md:text-[10px] font-bold text-neutral-2 uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-[10px] sm:text-[12px] md:text-sm font-bold text-neutral-1 leading-tight">Verified</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex-1 bg-white p-2.5 sm:p-3 md:p-4 rounded-xl shadow-xl border border-gray-100 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary shrink-0">
                  <FileText size={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[8px] md:text-[10px] font-bold text-neutral-2 uppercase tracking-widest leading-none mb-1">Doc</p>
                  <p className="text-[10px] sm:text-[12px] md:text-sm font-bold text-neutral-1 leading-tight">POA Certified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
