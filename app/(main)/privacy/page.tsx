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
          <h1 className="text-3xl md:text-5xl font-medium text-neutral-1">{t('privacy.title')}</h1>
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
      <section className="container mx-auto px-4 md:px-6 max-w-5xl py-10 md:py-16">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {!isLoading && !policy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('privacy.sections', { returnObjects: true }) instanceof Array ?
              (t('privacy.sections', { returnObjects: true }) as Array<{ title: string; content: string }>).map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-xl md:text-2xl font-medium text-neutral-1 mb-4">{section.title}</h2>
                  <p className="text-neutral-2 leading-relaxed text-sm lg:text-base font-medium opacity-80 whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              )) : <p className="text-neutral-2 text-center font-medium">Content not available.</p>}
          </motion.div>
        )}

        {!isLoading && policy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="policy-content"
          >
            <div dangerouslySetInnerHTML={{ __html: policy.content }} />
          </motion.div>
        )}
      </section>

      <style jsx>{`
        .policy-content h1 {
          font-size: 2.25rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.2;
        }
        .policy-content h2 {
          font-size: 1.75rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .policy-content h3 {
          font-size: 1.25rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .policy-content h4 {
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .policy-content p {
          color: #4a4a4a;
          line-height: 1.8;
          font-size: 0.9375rem;
          margin-top: 0;
          margin-bottom: 1.25rem;
        }
        @media (min-width: 1024px) {
          .policy-content p {
            font-size: 1rem;
          }
        }
        .policy-content strong {
          color: #1a1a1a;
          font-weight: 600;
        }
        .policy-content ul {
          color: #4a4a4a;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.8;
          list-style-type: disc;
        }
        .policy-content ol {
          color: #4a4a4a;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.8;
          list-style-type: decimal;
        }
        .policy-content li {
          margin-bottom: 0.5rem;
          color: #4a4a4a;
        }
        .policy-content li p {
          margin-bottom: 0.5rem;
          margin-top: 0;
        }
        .policy-content li ul,
        .policy-content li ol {
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
        }
        .policy-content blockquote {
          border-left: 4px solid #E67E22;
          background: #FAF6F2;
          padding: 0.75rem 1.25rem;
          border-radius: 0.375rem;
          margin: 1.25rem 0;
          color: #4a4a4a;
          line-height: 1.8;
        }
        .policy-content blockquote p {
          margin-bottom: 0;
        }
        .policy-content a {
          color: #E67E22;
          text-decoration: none;
          font-weight: 500;
        }
        .policy-content a:hover {
          text-decoration: underline;
        }
        .policy-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 0.9375rem;
        }
        .policy-content table th {
          background: #FAF6F2;
          font-weight: 600;
          color: #1a1a1a;
          padding: 0.75rem 1rem;
          text-align: left;
          border: 1px solid #e5e5e5;
        }
        .policy-content table td {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e5e5;
          color: #4a4a4a;
        }
        .policy-content table tr:nth-child(even) {
          background: #fafafa;
        }
        .policy-content hr {
          border: none;
          border-top: 1px solid #e5e5e5;
          margin: 2rem 0;
        }
        /* First element should have less top margin */
        .policy-content > *:first-child {
          margin-top: 0;
        }
        /* Last element should have less bottom margin */
        .policy-content > *:last-child {
          margin-bottom: 0;
        }
        /* Image styling */
        .policy-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1.25rem 0;
        }
        /* Code blocks */
        .policy-content pre {
          background: #1a1a1a;
          color: #f5f5f5;
          padding: 1rem 1.25rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 1.25rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .policy-content code {
          background: #f5f5f5;
          color: #1a1a1a;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .policy-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </div>
  );
}