'use client';

import { useGetDisclaimersQuery } from '@/features/disclaimers/disclaimersApi';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

export default function PrivacyPage() {
  const { t } = useTranslation('common');
  const { data, isLoading } = useGetDisclaimersQuery('privacy_policy');
  const policy = data?.data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#FAF6F2] py-16 md:py-24 text-center mt-8 md:mt-12">
        <div className="container mx-auto px-4 md:px-6 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Link href="/" className="text-primary hover:underline">{t('privacy.breadcrumb_company')}</Link>
            <ChevronRight size={14} className="text-neutral-2" />
            <span className="text-neutral-2">{t('privacy.breadcrumb_privacy')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-1">{t('privacy.title')}</h1>
          <p className="text-neutral-2 text-sm md:text-base font-medium max-w-lg mx-auto opacity-70">
            {t('privacy.subtitle')}
          </p>
          {policy?.updatedAt && (
            <p className="text-xs text-neutral-2 opacity-60 font-medium">
              Last updated: {formatDate(policy.updatedAt)}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl py-16 md:py-24">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {!isLoading && !policy && (
          <p className="text-neutral-2 text-center font-medium">Content not available.</p>
        )}

        {!isLoading && policy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-base md:prose-lg max-w-none"
          >
            <p className="text-neutral-2 leading-relaxed text-sm lg:text-base font-medium opacity-80 whitespace-pre-line">
              {policy.content}
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
