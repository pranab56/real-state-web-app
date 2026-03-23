'use client';

import { motion } from 'framer-motion';
import { Globe2, ShieldCheck, Users } from 'lucide-react';

const benefits = [
  {
    title: 'Secure Transactions',
    description: 'End-to-end encryption and bank-grade security protocols for all your legal documents and private data.',
    icon: <ShieldCheck className="w-16 h-16 text-primary" />
  },
  {
    title: 'Verified Partners',
    description: 'Direct access to our hand-vetted network of top-tier legal professionals and qualified solicitors.',
    icon: <Users className="w-16 h-16 text-primary" />
  },
  {
    title: 'Remote Management',
    description: 'Complete control over your international assets from anywhere in the world without the need for travel.',
    icon: <Globe2 className="w-16 h-16 text-primary" />
  }
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-[#FFF9F2]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-1"
          >
            Why Choose Zila Legal?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-2 max-w-2xl mx-auto font-medium"
          >
            Secure and reliable legal services tailored for the global diaspora, ensuring your investments are protected across borders.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-6 group cursor-default"
            >
              <div className="mb-2 group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-neutral-1 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-neutral-2 leading-relaxed font-medium">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
