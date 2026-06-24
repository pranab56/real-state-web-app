'use client';

import { Button } from '@/components/ui/button';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/features/auth/authApi';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, MailCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/icons/logo.png" alt="Logo" width={1000} height={1000} className="w-full h-10" />
    </Link>
  );
}

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const router = useRouter();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    if (otp.some(d => d === '')) {
      setOtpError('Please enter the full 6-digit code');
      return;
    }
    try {
      await verifyOtp({ email, oneTimeCode: parseInt(otp.join(''), 10) }).unwrap();
      toast.success('Email verified successfully!');
      router.push('/login');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      const msg = error?.data?.message || 'Invalid code. Please try again.';
      setOtpError(msg);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      toast.success('A new code has been sent to your email.');
      otpRefs.current[0]?.focus();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#FAF9F6] font-sans">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-48">
            <Logo />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-black/[0.02] space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <MailCheck size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-1">Verify Your Email</h2>
            <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed">
              We&apos;ve sent a 6-digit verification code to
            </p>
            {email && (
              <p className="text-sm font-medium text-neutral-1 break-all">{email}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { otpRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-full aspect-square text-center text-xl sm:text-3xl font-black text-neutral-1 bg-[#F2F2F2] border-none rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none ${otpError ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-xs font-medium text-center animate-pulse">{otpError}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
            <span className="text-neutral-2">Didn&apos;t receive the code?</span>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-neutral-1 hover:text-primary transition-colors cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isResending && <Loader2 size={14} className="animate-spin" />}
              Resend Code
            </button>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full h-11 sm:h-14 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg sm:rounded-xl text-base sm:text-lg flex items-center justify-center cursor-pointer gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Verify Email
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-neutral-2 font-medium hover:text-primary transition-colors">
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
