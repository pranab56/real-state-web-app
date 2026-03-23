'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Home, Map, MessageSquare, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '/properties', icon: Map },
    { name: 'Agents', href: '/agents', icon: User },
    { name: 'About', href: '/about', icon: Home },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-black/10 backdrop-blur-md pt-4' : 'bg-transparent pt-8'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/70 px-6 py-3 backdrop-blur-xl border border-white/20 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-black text-white font-bold">Z</div>
          <span className="text-xl font-bold tracking-tight text-black">Zila Homes</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer text-zinc-600 hover:text-black">
            <Search size={20} />
          </motion.div>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </motion.header>
  );
}
