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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-4xl font-bold text-neutral-1 leading-tight">
                Buying Property From <br /> Abroad?
              </h2>
              <p className="text-base text-neutral-2 font-medium max-w-lg">
                Zila Legal helps diaspora buyers complete property transactions securely through Power of Attorney and verified legal partners.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <Check className="text-white" size={14} strokeWidth={4} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-1">{feature.title}</h3>
                    <p className="text-neutral-2 text-sm md:text-base leading-relaxed">
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
            className="relative"
          >
            <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&h=1000&fit=crop"
                alt="Modern Interior"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-15 left-1/2 w-full -translate-x-1/2 w-full flex flex-col md:flex-row gap-4 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex-1 bg-white p-4 w-full rounded-xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-2 uppercase tracking-widest">Status</p>
                  <p className="text-sm font-bold text-neutral-1">Legally Verified</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex-1 bg-white p-4 w-full rounded-xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-2 uppercase tracking-widest">Document</p>
                  <p className="text-sm font-bold text-neutral-1">POA Certified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
