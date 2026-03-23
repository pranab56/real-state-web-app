'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Discover the Pinnacle of Luxury Living',
    subtitle: 'Join an exclusive community of property enthusiasts and professionals navigating the world’s most prestigious estates.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=1600&fit=crop'
  },
  {
    title: 'Modern Architecture and Elegant Design',
    subtitle: 'Explore the finest designs from top-tier architects and discover your next dream home.',
    image: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=1200&h=1600&fit=crop'
  },
  {
    title: 'Premium Property Dashboard',
    subtitle: 'All your real estate management tools in one integrated and intuitive platform.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&h=1600&fit=crop'
  }
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M20 50L50 25L80 50" stroke="#F1913D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 45L70 45L30 85L70 85" stroke="#F1913D" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M45 55L55 65L85 35" stroke="#2B9724" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-[#F1913D]">Zila</span>
          <span className="text-xl font-bold text-white">Homes</span>
        </div>
        <span className="text-[6px] text-white/70 uppercase tracking-widest font-semibold -mt-1">
          Verified • Trusted • Connected
        </span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white font-sans">

      {/* Left Pan: Slider */}
      <div className="relative hidden lg:block h-screen">
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

        {/* Logo at Top Left */}
        <div className="absolute top-8 left-8 z-20">
          <Logo />
        </div>

        {/* Custom Styles for Swiper Pagination */}
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

      {/* Right Pan: Login Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 h-screen overflow-y-auto">
        <div className="w-full max-w-xl space-y-12">

          <div className="flex justify-end">
            <Button variant="outline" className="rounded-full px-8 bg-[#2C2E33] text-white hover:bg-black border-none h-11">
              Login
            </Button>
          </div>

          <div className="space-y-10 border border-gray-100 rounded-xl p-8 lg:p-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-neutral-1">Welcome back!</h2>
              <p className="text-neutral-2 font-medium">Sign in to access your premium property dashboard</p>
            </div>

            <form className="space-y-7">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-neutral-1 font-bold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email Address here..."
                  className="h-12 bg-[#F2F2F2] border-none focus:border-none focus:ring-0 border-none  focus:outline-none rounded-lg px-6 text-neutral-1 placeholder:text-neutral-2 font-medium"
                />
              </div>

              <div className="space-y-3 relative">
                <Label htmlFor="password" title="Forget Password?" className="text-neutral-1 font-bold flex justify-between w-full">
                  Password
                  <Link href="#" className="text-xs text-neutral-2 hover:text-primary">Forget Password?</Link>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password here..."
                    className="h-12 bg-[#F2F2F2] border-none rounded-xl px-6 pr-12 text-neutral-1 placeholder:text-neutral-2 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-2 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-neutral-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <Label htmlFor="remember" className="text-sm text-neutral-2 font-medium cursor-pointer">Remember Me</Label>
              </div>

              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg flex items-center justify-center gap-2 transition-all active:scale-95 group">
                Login
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-gray-100 flex-1" />
                <span className="text-xs text-neutral-2 font-medium uppercase tracking-widest whitespace-nowrap">Instant Login</span>
                <div className="h-px bg-gray-100 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <Button variant="outline" className="h-14 border-gray-100 rounded-lg font-bold flex items-center gap-3 hover:bg-gray-50">
                  <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" />
                  Continue With Google
                </Button>
                <Button variant="outline" className="h-14 border-gray-100 rounded-lg font-bold flex items-center gap-3 hover:bg-gray-50">
                  <Image src="https://www.svgrepo.com/show/475647/facebook-color.svg" width={20} height={20} alt="Facebook" />
                  Continue With Facebook
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-neutral-2 font-medium">
                  Don't have any account? <Link href="/register" className="text-primary hover:underline font-bold">Register Now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
