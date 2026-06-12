'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUpMutation } from '@/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Eye, EyeOff, Hotel, Loader2, Plane, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as z from 'zod';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Unlock Premium Property Access',
    subtitle: 'Join our exclusive community of homeowners and investors. Get early access to off-market listings and personalized estate matching.',
    image: '/images/auth/image1.png'
  },
  {
    title: 'Join the Elite Network',
    subtitle: 'Showcase your luxury properties to a global audience of high-net-worth individuals.',
    image: '/images/auth/image2.png'
  },
  {
    title: 'Modern Architecture and Elegant Design',
    subtitle: 'Explore the finest designs from top-tier architects and discover your next dream home.',
    image: '/images/auth/image3.png'
  },
  {
    title: 'Premium Property Dashboard',
    subtitle: 'All your real estate management tools in one integrated and intuitive platform.',
    image: '/images/auth/image4.png'
  }
];

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  terms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

type AccountType = 'customer' | 'hotel' | 'transit' | null;

const ACCOUNT_ROLE: Record<string, string> = {
  customer: 'customer',
  hotel: 'host',
  transit: 'driver',
};

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/icons/logo.png" alt="Logo" width={1000} height={1000} className='w-full h-10' />
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();

  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
    setStep(2);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        role: ACCOUNT_ROLE[accountType!],
        email: data.email,
        password: data.password,
      }).unwrap();
      toast.success('Account created! Please verify your email.');
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden bg-white font-sans">

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
                  className="text-5xl font-bold leading-tight max-w-lg"
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

      {/* Right Pan */}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen overflow-y-auto bg-[#FAF9F6] lg:bg-white">
        <div className="w-full max-w-xl py-8">

          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-48"><Logo /></div>
          </div>

          <AnimatePresence mode="wait">

            {/* Step 1: Choose account type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white lg:border-none border border-gray-100 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-0 space-y-8 lg:space-y-12 shadow-xl shadow-black/5 lg:shadow-none"
              >
                <div className="text-center space-y-3 lg:space-y-4">
                  <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                      <Image src="/icons/document.png" alt="Type" width={100} height={100} className="object-contain" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-1">Choose Account Type</h2>
                  <p className="text-sm sm:text-base text-neutral-2 font-medium px-4">How do you want to start your journey?</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    { id: 'customer', title: 'Customer', desc: 'Book luxury stays, private islands, and curated high-end experiences worldwide.', icon: User },
                    { id: 'hotel', title: 'Hotel Partner', desc: 'Partner your 5-star hotel with us to reach global luxury travelers.', icon: Hotel },
                    { id: 'transit', title: 'Transit Partner', desc: 'Provide premium private aviation, yacht, and chauffeur services.', icon: Plane },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleAccountTypeSelect(type.id as AccountType)}
                      className="w-full group flex items-center gap-4 sm:gap-6 p-2 pr-4 rounded-xl cursor-pointer border border-gray-100 hover:border-primary hover:bg-primary/[0.02] transition-all text-left relative overflow-hidden active:scale-98"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <type.icon size={24} className="text-neutral-2 group-hover:text-primary transition-colors sm:hidden" />
                        <type.icon size={32} className="text-neutral-2 group-hover:text-primary transition-colors hidden sm:block" />
                      </div>
                      <div className="flex-1 space-y-0.5 sm:space-y-1">
                        <h4 className="text-lg sm:text-xl font-bold text-neutral-1">{type.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-2 font-medium leading-relaxed line-clamp-2">{type.desc}</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                        <ArrowRight size={16} className="sm:hidden" />
                        <ArrowRight size={20} className="hidden sm:block" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 sm:pt-8 text-center">
                  <p className="text-sm sm:text-base text-neutral-2 font-medium">
                    Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Login</Link>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Registration form (same for all roles) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 lg:space-y-10"
              >
                <div className="space-y-2 lg:space-y-4 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-1">Create Account</h2>
                  <p className="text-sm sm:text-base text-neutral-2 font-medium px-4 lg:px-0">
                    Fill in your details to get started.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-black/[0.02]">
                  <form className="space-y-5 lg:space-y-7" onSubmit={handleSubmit(onSubmit)}>

                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 lg:space-y-3">
                        <Label className="text-neutral-1 font-bold text-sm lg:text-base">First Name</Label>
                        <Input
                          placeholder="Enter first name"
                          {...register('firstName')}
                          className={`h-11 lg:h-12 bg-[#F2F2F2] border-none rounded-lg px-4 lg:px-6 font-medium text-sm lg:text-base ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2 lg:space-y-3">
                        <Label className="text-neutral-1 font-bold text-sm lg:text-base">Last Name</Label>
                        <Input
                          placeholder="Enter last name"
                          {...register('lastName')}
                          className={`h-11 lg:h-12 bg-[#F2F2F2] border-none rounded-lg px-4 lg:px-6 font-medium text-sm lg:text-base ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 lg:space-y-3">
                      <Label className="text-neutral-1 font-bold text-sm lg:text-base">Email Address</Label>
                      <Input
                        placeholder="Enter your email"
                        {...register('email')}
                        className={`h-11 lg:h-12 bg-[#F2F2F2] border-none rounded-lg px-4 lg:px-6 font-medium text-sm lg:text-base ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Password + Confirm Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 lg:space-y-3 relative">
                        <Label className="text-neutral-1 font-bold text-sm">Password</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('password')}
                            className={`h-11 lg:h-12 bg-[#F2F2F2] border-none rounded-lg px-4 lg:px-6 pr-12 font-medium text-sm lg:text-base ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-2">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.password.message}</p>
                        )}
                      </div>
                      <div className="space-y-2 lg:space-y-3 relative">
                        <Label className="text-neutral-1 font-bold text-sm">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
                            className={`h-11 lg:h-12 bg-[#F2F2F2] border-none rounded-lg px-4 lg:px-6 pr-12 font-medium text-sm lg:text-base ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
                          />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-2">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Controller
                          name="terms"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id="terms"
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              className="border-neutral-2 data-[state=checked]:bg-primary size-4 sm:size-5"
                            />
                          )}
                        />
                        <Label htmlFor="terms" className="text-[10px] sm:text-xs text-neutral-2 font-medium leading-tight">
                          I agree to the <Link href="#" className="text-primary hover:underline">Terms and Conditions</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                        </Label>
                      </div>
                      {errors.terms && (
                        <p className="text-red-500 text-[10px] font-bold ml-1">{errors.terms.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 lg:h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-base lg:text-lg flex items-center cursor-pointer justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                        <>
                          Create Account
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-6 sm:pt-8 border-t border-gray-50 mt-6 sm:mt-8">
                    <p className="text-sm sm:text-base text-neutral-2 font-medium">
                      Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Login</Link>
                    </p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button
                    type="button"
                    onClick={() => { setStep(1); setAccountType(null); }}
                    variant="ghost"
                    className="flex items-center gap-2 text-neutral-2 font-bold hover:text-primary hover:bg-primary/5 px-4 sm:px-6 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gray-100 border-none text-xs sm:text-sm"
                  >
                    <ChevronLeft size={18} className="sm:hidden" />
                    <ChevronLeft size={20} className="hidden sm:block" />
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
