'use client';

import { motion } from 'framer-motion';
import { Building2, Home as HomeIcon, Search } from 'lucide-react';
import Link from 'next/link';

export default function HelpSection() {
  const services = [
    {
      title: 'Buy a Home',
      description: "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
      icon: <Building2 className="w-16 h-16 text-primary" />,
      btnText: 'Learn More',
      href: '/properties'
    },
    {
      title: 'Rent a Home',
      description: "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
      icon: <HomeIcon className="w-16 h-16 text-primary" />,
      btnText: 'Learn More',
      href: '/properties'
    },
    {
      title: 'Sell a Home',
      description: "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
      icon: <Search className="w-16 h-16 text-primary" />,
      btnText: 'Learn More',
      href: '/register'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4 px-4">
          <motion.h2

            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-medium text-neutral-1"
          >
            How Can We Help You?
          </motion.h2>
          <motion.p

            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-neutral-2 max-w-2xl mx-auto"
          >
            Thousands of luxury home enthusiasts just like you visit our website.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 container mx-auto">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="block">
              <motion.div

                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4 md:gap-6 group cursor-pointer h-full"
              >
                <div className="mb-2 shrink-0">
                  <div className="scale-75 md:scale-100">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-2 leading-relaxed text-xs md:text-sm">
                  {service.description}
                </p>
                <span className="mt-2 md:mt-4 bg-[#F2F2F2] group-hover:bg-primary group-hover:text-white text-neutral-1 font-medium px-8 md:px-10 h-11 md:h-12 rounded flex items-center justify-center transition-all">
                  {service.btnText}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
