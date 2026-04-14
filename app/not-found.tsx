import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Home, Search } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you&apos;re looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C97BA4] to-[#F7A8B8] mb-4">
              404
            </div>
            <div className="relative h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7A8B8] to-[#C97BA4] rounded-full opacity-20 animate-pulse" />
              <Search size={64} className="text-[#C97BA4] relative" />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist yet. Let&apos;s get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#C97BA4] text-white font-semibold rounded-full hover:bg-[#F7A8B8] hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Home size={20} />
              Go Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#C97BA4] font-semibold rounded-full border-2 border-[#E8D5D0] hover:border-[#C97BA4] hover:bg-[#FBF7F4] transition-all duration-200"
            >
              View Products
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-white border border-[#E8D5D0] rounded-xl p-8">
            <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/"
                className="text-[#C97BA4] hover:text-[#F7A8B8] font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-[#C97BA4] hover:text-[#F7A8B8] font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-[#C97BA4] hover:text-[#F7A8B8] font-medium transition-colors"
              >
                Products
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
