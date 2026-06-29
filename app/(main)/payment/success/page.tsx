'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Home, ReceiptText } from 'lucide-react';
import Link from 'next/link';

export default function Page() {


  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF6F2] px-4 py-16 mt-8 md:mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md w-full p-8 md:p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} className="text-green-600" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-medium text-neutral-1">Payment Successful</h1>
        <p className="text-neutral-2 text-sm font-medium mt-2 max-w-sm mx-auto opacity-80">
          Thank you! Your payment has been received and your booking is now confirmed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/partner-dashboard/bookings"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
          >
            <ReceiptText size={16} /> View My Bookings
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 text-neutral-1 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
