'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotEmailMutation, useResendOtpMutation, useResendPasswordMutation, useVerifyOtpMutation } from '@/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as z from 'zod';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Discover the Pinnacle of Luxury Living',
    subtitle: "Join an exclusive community of property enthusiasts and professionals navigating the world's most prestigious estates.",
    image: '/images/auth/image1.png'
  },
  {
    title: 'Modern Architecture and Elegant Design',
    subtitle: 'Explore the finest designs from top-tier architects and discover your next dream home.',
    image: '/images/auth/image2.png'
  },
  {
    title: 'Premium Property Dashboard',
    subtitle: 'All your real estate management tools in one integrated and intuitive platform.',
    image: '/images/auth/image3.png'
  },
  {
    title: 'Premium Property Dashboard',
    subtitle: 'All your real estate management tools in one integrated and intuitive platform.',
    image: '/images/auth/image4.png'
  }
];

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/icons/logo.png" alt="Logo" width={1000} height={1000} className='w-full h-10' />
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const [forgotEmail, { isLoading: isSendingOtp }] = useForgotEmailMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResendPasswordMutation();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

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

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      await forgotEmail({ email: data.email }).unwrap();
      setSubmittedEmail(data.email);
      toast.success('OTP sent! Please check your email.');
      setStep(2);
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const onVerifyOtp = async () => {
    if (otp.some(d => d === '')) {
      setOtpError('Please enter the full 6-digit code');
      return;
    }
    try {
      const result = await verifyOtp({ email: submittedEmail, oneTimeCode: parseInt(otp.join(''), 10) }).unwrap();
      setResetToken(result.data);
      toast.success('OTP verified!');
      setStep(3);
    } catch (err) {
      const error = err as { data?: { message?: string } };
      const msg = error?.data?.message || 'Invalid OTP. Please try again.';
      setOtpError(msg);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email: submittedEmail }).unwrap();
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      toast.success('A new code has been sent to your email.');
      otpRefs.current[0]?.focus();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to resend code.');
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      await resetPassword({
        token: resetToken,
        data: { newPassword: data.password, confirmPassword: data.confirmPassword },
      }).unwrap();
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden bg-white font-sans text-neutral-1">

      {/* Left Pan: Slider */}
      <div className="relative hidden lg:block h-screen sticky top-0">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet login-bullet' }}
          className="h-full w-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative h-full w-full">
              <Image
                src={slide.image}
                alt="Architecture"
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-24 left-12 right-12 text-white space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  key={`title-${idx}`}
                  className="text-5xl font-medium leading-tight max-w-lg"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={`subtitle-${idx}`}
                  className="text-lg text-white/80 max-w-md font-medium"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-8 left-8 z-20">
          <Logo />
        </div>

        <style jsx global>{`
          .login-bullet {
            width: 30px !important;
            height: 4px !important;
            border-radius: 2px !important;
            background: rgba(255,255,255,0.4) !important;
            opacity: 1 !important;
            margin: 0 4px !important;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: white !important;
            width: 40px !important;
          }
          .swiper-pagination {
            bottom: 40px !important;
            left: 48px !important;
            text-align: left !important;
          }
        `}</style>
      </div>

      {/* Right Pan: Content */}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen overflow-y-auto bg-[#FAF9F6] lg:bg-white">
        <div className="w-full max-w-xl py-8">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-48">
              <Logo />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 lg:space-y-10 border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 bg-white shadow-xl shadow-black/[0.02]"
              >
                <div className="text-center space-y-3 lg:space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-1">Reset Password</h2>
                  <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed px-2 sm:px-0">
                    Enter your email address and we&apos;ll send you a one-time code to reset your password.
                  </p>
                </div>

                <form className="space-y-6 sm:space-y-8" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                  <div className="space-y-2 lg:space-y-3">
                    <Label className="text-neutral-1 font-medium text-sm lg:text-base">Email Address</Label>
                    <Input
                      placeholder="Enter your email address"
                      {...emailForm.register('email')}
                      className={`h-11 sm:h-14 bg-[#F2F2F2] border-none rounded-lg sm:rounded-xl px-4 sm:px-6 font-medium text-sm sm:text-base ${emailForm.formState.errors.email ? 'ring-2 ring-red-500' : ''}`}
                    />
                    {emailForm.formState.errors.email && (
                      <p className="text-red-500 text-xs font-medium mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{emailForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full h-11 sm:h-14 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg sm:rounded-xl text-base sm:text-lg flex items-center justify-center gap-2 group transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSendingOtp ? <Loader2 size={20} className="animate-spin" /> : (
                      <>
                        Send OTP
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-2 sm:pt-4">
                    <Link href="/login" className="text-sm sm:text-base text-neutral-1 font-extrabold hover:text-primary transition-colors underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary">
                      Back to Login
                    </Link>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 lg:space-y-10 border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 bg-white shadow-xl shadow-black/[0.02]"
              >
                <div className="text-center space-y-3 lg:space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-1">Verify Account</h2>
                  <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed px-2 sm:px-0">
                    Enter the 6-digit code sent to <span className="font-medium text-neutral-1">{submittedEmail}</span>
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
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
                    <p className="text-red-500 text-[10px] sm:text-xs font-medium text-center animate-pulse">{otpError}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                  <span className="text-neutral-2">Didn&apos;t receive the code?</span>
                  <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-neutral-1 hover:text-primary cursor-pointer transition-colors hover:underline disabled:opacity-50 flex items-center gap-1"
                  >
                    {isResending && <Loader2 size={14} className="animate-spin" />}
                    Resend Code
                  </button>
                </div>

                <Button
                  onClick={onVerifyOtp}
                  disabled={isVerifyingOtp}
                  className="w-full h-11 sm:h-14 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg sm:rounded-xl text-base sm:text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isVerifyingOtp ? <Loader2 size={20} className="animate-spin" /> : (
                    <>
                      Verify & Continue
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button onClick={() => setStep(1)} className="text-neutral-2 cursor-pointer font-medium hover:text-primary transition-colors text-xs sm:text-sm">Cancel and Restart</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="new-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 lg:space-y-10 border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 bg-white shadow-xl shadow-black/[0.02]"
              >
                <div className="text-center space-y-3 lg:space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-1">New Password</h2>
                  <p className="text-sm sm:text-base text-neutral-2 font-medium leading-relaxed px-2 sm:px-0">
                    Please enter a secure password you haven&apos;t used before.
                  </p>
                </div>

                <form className="space-y-6 sm:space-y-8" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                  <div className="space-y-2 sm:space-y-3 relative">
                    <Label className="text-neutral-1 font-medium text-sm sm:text-base">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New password"
                        {...passwordForm.register('password')}
                        className={`h-11 sm:h-14 bg-[#F2F2F2] border-none rounded-lg sm:rounded-xl px-4 sm:px-6 pr-12 font-medium text-sm sm:text-base ${passwordForm.formState.errors.password ? 'ring-2 ring-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-2"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.password && (
                      <p className="text-red-500 text-xs font-medium mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{passwordForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3 relative">
                    <Label className="text-neutral-1 font-medium text-sm sm:text-base">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        {...passwordForm.register('confirmPassword')}
                        className={`h-11 sm:h-14 bg-[#F2F2F2] border-none rounded-lg sm:rounded-xl px-4 sm:px-6 pr-12 font-medium text-sm sm:text-base ${passwordForm.formState.errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-2"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-xs font-medium mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isResetting}
                    className="w-full h-11 sm:h-14 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg sm:rounded-xl text-base sm:text-lg flex items-center cursor-pointer justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isResetting ? <Loader2 size={20} className="animate-spin" /> : (
                      <>
                        Update Password
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-2">
                    <Link href="/login" className="text-sm sm:text-base text-neutral-1 font-extrabold hover:text-primary transition-colors underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary">
                      Return to Login
                    </Link>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
