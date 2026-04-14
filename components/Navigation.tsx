'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/products', label: 'SHOP' },
    { href: '/about', label: 'ABOUT' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-sm border-b border-[#E8D5D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:shadow-md transition-shadow flex-shrink-0">
              <Image
                src="/gulabi-logo.png"
                alt="Gulabi Guiltz"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="hidden sm:block font-serif text-base font-normal text-neutral-900">Gulabi Guiltz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#C97BA4] hover:text-[#F7A8B8] font-semibold transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-900 hover:text-[#C97BA4] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-[#E8D5D0]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[#C97BA4] hover:bg-[#FBF7F4] transition-colors font-semibold text-sm tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
