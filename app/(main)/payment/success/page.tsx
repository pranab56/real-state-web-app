'use client';

import { RootState } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, ReceiptText, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Page() {
  const user = useSelector((state: RootState) => state.auth?.user);

  const profileRoute = user?.role === 'host' ? '/hotels-partner-dashboard/profile' : '/partner-dashboard/profile';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF6F2] px-4 py-16 mt-8 md:mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg w-full p-8 md:p-10"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-green-600" strokeWidth={1.5} />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-medium text-neutral-1">Payment Successful</h1>
          <p className="text-neutral-2 text-sm font-normal mt-2 max-w-sm mx-auto opacity-80">
            Thank you! Your payment has been received. <br />Your booking request is now waiting for host/hotel manager acceptance. We will notify you soon.
          </p>
        </div>

        {/* KYC Verification Section */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xs font-normal text-amber-900 mb-2">
                To help build a safer and more trusted community, we encourage you to complete a quick identity verification. Verified guests enjoy a smoother booking experience, and it helps us maintain a secure platform for everyone.
              </h3>
              {/* <p className="text-xs text-amber-700 opacity-90">
                Your privacy matters. Your identity documents are encrypted, used only to verify your identity, and are never shared directly with the property owner or host.
              </p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={profileRoute}
            className="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors w-full"
          >
            <User size={16} /> Verify Identity (KYC)
          </Link>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/partner-dashboard/bookings"
              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 text-neutral-1 hover:bg-gray-50 text-sm font-medium transition-colors"
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
        </div>
      </motion.div>
    </div>
  );
}
