'use client';

import { motion } from 'framer-motion';
import { Home, RefreshCcw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('tx_ref') ?? searchParams.get('reference') ?? searchParams.get('transaction_id');

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
          className="w-20 h-20 rounded-full bg-[#DC3545]/10 flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={40} className="text-[#DC3545]" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-medium text-neutral-1">Payment Cancelled</h1>
        <p className="text-neutral-2 text-sm font-medium mt-2 max-w-sm mx-auto opacity-80">
          Your payment was not completed and no amount has been charged. You can try again whenever you&apos;re ready.
        </p>

        {reference && (
          <div className="mt-6 rounded-xl bg-[#FAF6F2] border border-gray-100 px-5 py-4 text-left">
            <div className="flex items-center justify-between text-sm gap-3">
              <span className="text-neutral-2 font-medium shrink-0">Reference</span>
              <span className="text-neutral-1 font-semibold truncate">{reference}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/hotels"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
          >
            <RefreshCcw size={16} /> Try Again
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

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}
