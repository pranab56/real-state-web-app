'use client';

import { useGetDisclaimersQuery } from '@/features/disclaimers/disclaimersApi';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

const TERMS_SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing and using ZilaHomes, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
  },
  {
    title: 'User Responsibilities',
    content: 'Users are responsible for ensuring the accuracy of the information they provide and for maintaining the confidentiality of their account details.',
  },
  {
    title: 'Intellectual Property',
    content: 'All content on this platform, including text, logos, and images, is the property of ZilaHomes and is protected by copyright laws.',
  },
  {
    title: 'Limitation of Liability',
    content: 'ZilaHomes shall not be liable for any direct, indirect, or incidental damages arising from the use or inability to use our services.',
  },
  {
    title: 'Governing Law',
    content: 'These terms are governed by and construed in accordance with the laws of Ethiopia, without regard to its conflict of law principles.',
  },
  {
    title: 'Contact Information',
    content: 'If you have any questions about these Terms, please contact our legal department at legal@zilahomes.com.',
  },
];

export default function TermsPage() {
  const { data, isLoading } = useGetDisclaimersQuery('terms_of_service');
  const terms = data?.data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#FAF6F2] py-16 md:py-24 text-center mt-8 md:mt-12">
        <div className="container mx-auto px-4 md:px-6 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Link href="/" className="text-primary hover:underline">Company</Link>
            <ChevronRight size={14} className="text-neutral-2" />
            <span className="text-neutral-2">Terms of Service</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-medium text-neutral-1">Terms of Service</h1>
          <p className="text-neutral-2 text-sm md:text-base font-medium max-w-lg mx-auto opacity-70">
            View our terms and conditions to understand our services better.
          </p>
          {terms?.updatedAt && (
            <p className="text-xs text-neutral-2 opacity-60 font-medium">
              Last updated: {formatDate(terms.updatedAt)}
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

        {!isLoading && !terms && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-base md:prose-lg max-w-none"
          >
            {TERMS_SECTIONS.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-xl md:text-2xl font-medium text-neutral-1 mb-4">{section.title}</h2>
                <p className="text-neutral-2 leading-relaxed text-sm lg:text-base font-medium opacity-80 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {!isLoading && terms && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-base md:prose-lg max-w-none prose-headings:text-neutral-1 prose-p:text-neutral-2 prose-p:leading-relaxed prose-p:text-sm prose-p:lg:text-base prose-strong:text-neutral-1 prose-li:text-neutral-2 prose-li:leading-relaxed prose-li:text-sm prose-li:lg:text-base prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:bg-[#FAF6F2] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-md"
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        )}
      </section>
    </div>
  );
}