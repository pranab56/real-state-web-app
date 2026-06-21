'use client';

import { Button } from '@/components/ui/button';
import { useCreatePoaMutation } from '@/features/poa/poaApi';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  FileText,
  Globe,
  Lock,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ApiError, RootState } from '@/types';

// ── Shared field height ──
const FIELD_H = 'h-12';

const inputCls = (error?: string) =>
  cn(
    FIELD_H,
    'w-full rounded-lg px-5 text-neutral-1 font-medium text-sm outline-none transition-all border',
    error
      ? 'bg-red-50/20 border-red-400 focus:ring-2 focus:ring-red-200'
      : 'bg-[#F6F6F6] border-transparent focus:ring-2 focus:ring-primary/20'
  );

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs font-medium text-red-500">{msg}</p> : null;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function runValidation(f: {
  name: string; email: string; phone: string; message: string;
}): FormErrors {
  const e: FormErrors = {};
  if (!f.name.trim()) e.name = 'Full name is required';
  if (!f.email.trim()) e.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
  if (!f.phone.trim()) e.phone = 'Phone number is required';
  if (!f.message.trim()) e.message = 'Please describe how we can help you';
  return e;
}

// ── Feature card ──
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  light?: boolean;
}
const FeatureCard = ({ icon: Icon, title, description, light = false }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      'p-6 md:p-10 rounded-2xl flex flex-col items-center text-center space-y-4',
      light ? 'bg-white border border-gray-100' : 'bg-[#F7F7F7]'
    )}
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-medium text-neutral-1">{title}</h3>
    <p className="text-sm text-neutral-2 leading-relaxed">{description}</p>
  </motion.div>
);

// ── Process step ──
const ProcessStep = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 md:p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-colors space-y-3 md:space-y-4">
    <h3 className="text-base md:text-lg font-medium text-white">{title}</h3>
    <p className="text-xs md:text-sm text-white/50 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function POAPage() {
  const { t } = useTranslation('common');
  const [createPoa, { isLoading }] = useCreatePoaMutation();
  const token = useSelector((state: RootState) => state.auth?.token);
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const clearErr = (key: keyof FormErrors) =>
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!token) { router.push('/login'); return; }
    const errs = runValidation({ name, email, phone, message });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await createPoa({
        type: 'poa',
        customer: { name, email, phone },
        message,
      }).unwrap();
      toast.success('Consultation request submitted! We will contact you shortly.');
      setName(''); setEmail(''); setPhone(''); setMessage('');
      setErrors({});
      setErrors({});
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="container mx-auto px-4 md:px-6 pt-24 pb-12 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <h1
              className="text-3xl md:text-4xl font-black text-neutral-1 uppercase leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('poa.title') }}
            />
            <p className="text-sm md:text-lg text-neutral-2 max-w-xl font-medium leading-relaxed">
              {t('poa.subtitle')}
            </p>
            <Button
              onClick={() =>
                document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="h-10 md:h-12 px-6 md:px-8 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all cursor-pointer text-sm md:text-base"
            >
              {t('poa.request_assistance')}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&h=800&fit=crop"
              alt={t('poa.hero_img_alt')}
              width={1200}
              height={800}
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Why Use ZilaHomes POA? ── */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-10 md:space-y-16">
        <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto font-medium">
          <h2 className="text-2xl md:text-4xl font-medium text-neutral-1 tracking-tight">{t('poa.why_title')}</h2>
          <p className="text-neutral-2">{t('poa.why_subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={Search} title={t('poa.features.verify_title')} description={t('poa.features.verify_desc')} />
          <FeatureCard icon={FileText} title={t('poa.features.manage_title')} description={t('poa.features.manage_desc')} />
          <FeatureCard icon={ShieldCheck} title={t('poa.features.protect_title')} description={t('poa.features.protect_desc')} />
        </div>
      </section>

      {/* ── 4-Step Process ── */}
      <section className="bg-[#1E2024] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-10 md:space-y-16">
          <div className="text-center font-medium">
            <h2 className="text-2xl md:text-4xl text-white tracking-tight">{t('poa.process.title')}</h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ProcessStep title={t('poa.process.step1_title')} description={t('poa.process.step1_desc')} />
            <ProcessStep title={t('poa.process.step2_title')} description={t('poa.process.step2_desc')} />
            <ProcessStep title={t('poa.process.step3_title')} description={t('poa.process.step3_desc')} />
            <ProcessStep title={t('poa.process.step4_title')} description={t('poa.process.step4_desc')} />
          </motion.div>
        </div>
      </section>

      {/* ── Consultation Form ── */}
      <section id="consultation-form" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="mx-auto bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse items-stretch">

          {/* Image panel */}
          <div className="lg:w-1/2 relative min-h-[250px] md:min-h-[400px]">
            <Image
              src="/images/company/image1.png"
              alt={t('poa.consultation_img_alt')}
              fill
              className="object-cover brightness-[0.9]"
            />
          </div>

          {/* Form panel */}
          <div className="lg:w-1/2 p-8 md:p-10 lg:p-16 space-y-8 bg-white">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-medium text-neutral-1">{t('poa.consultation.title')}</h2>
              <p className="text-sm text-neutral-2 font-medium leading-relaxed">{t('poa.consultation.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {!token && (
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  <span className="text-amber-600 text-sm font-medium">
                    Please{' '}
                    <Link href="/login" className="underline underline-offset-2 hover:text-amber-700 font-semibold">
                      login
                    </Link>
                    {' '}to request a consultation.
                  </span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-1 mb-1.5">
                  {t('poa.consultation.name')}
                </label>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearErr('name'); }}
                  placeholder={t('poa.consultation.name_placeholder')}
                  disabled={!token}
                  className={cn(inputCls(errors.name), !token && 'opacity-50 cursor-not-allowed')}
                />
                <FieldError msg={errors.name} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-1 mb-1.5">
                  {t('poa.consultation.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErr('email'); }}
                  placeholder={t('poa.consultation.email_placeholder')}
                  disabled={!token}
                  className={cn(inputCls(errors.email), !token && 'opacity-50 cursor-not-allowed')}
                />
                <FieldError msg={errors.email} />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-neutral-1 mb-1.5">
                  {t('poa.consultation.phone')}
                </label>
                <input
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); clearErr('phone'); }}
                  placeholder={t('poa.consultation.phone_placeholder')}
                  disabled={!token}
                  className={cn(inputCls(errors.phone), !token && 'opacity-50 cursor-not-allowed')}
                />
                <FieldError msg={errors.phone} />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-neutral-1 mb-1.5">
                  {t('poa.consultation.message')}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); clearErr('message'); }}
                  placeholder={t('poa.consultation.message_placeholder')}
                  rows={4}
                  disabled={!token}
                  className={cn(
                    'w-full rounded-lg px-5 py-3 text-neutral-1 font-medium text-sm outline-none transition-all resize-none border',
                    errors.message
                      ? 'bg-red-50/20 border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'bg-[#F6F6F6] border-transparent focus:ring-2 focus:ring-primary/20',
                    !token && 'opacity-50 cursor-not-allowed'
                  )}
                />
                <FieldError msg={errors.message} />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  FIELD_H,
                  'w-full bg-primary cursor-pointer hover:bg-primary/90 text-white font-medium rounded-lg transition-transform active:scale-[0.98] disabled:opacity-70 border-none text-sm'
                )}
              >
                {isLoading ? 'Submitting...' : t('poa.consultation.submit')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Why Choose Zila Legal? ── */}
      <section className="bg-orange-50/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 space-y-10 md:space-y-16">
          <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto font-medium">
            <h2 className="text-2xl md:text-4xl font-medium text-neutral-1 tracking-tight">{t('why.title')}</h2>
            <p className="text-neutral-2">{t('why.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard light icon={Lock} title={t('why.benefits.secure_title')} description={t('why.benefits.secure_desc')} />
            <FeatureCard light icon={UserCheck} title={t('why.benefits.partners_title')} description={t('why.benefits.partners_desc')} />
            <FeatureCard light icon={Globe} title={t('why.benefits.remote_title')} description={t('why.benefits.remote_desc')} />
          </div>
        </div>
      </section>

    </div>
  );
}
