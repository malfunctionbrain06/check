import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { FloatingParticles } from '@/components/FloatingParticles';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Gulabi Guiltz - Handcrafted Crochet & Beaded Accessories',
  description: 'Discover whimsical handcrafted beaded jewelry and crochet accessories made with love and creativity.',
};

export default function Home() {
  const collections = [
    {
      name: 'Beaded Jewelry',
      description: 'Intricate beaded designs with stunning details and unique patterns',
      accent: 'from-pink-300 to-pink-500',
    },
    {
      name: 'Crochet Accessories',
      description: 'Soft and cozy handcrafted crochet pieces with whimsical charm',
      accent: 'from-purple-300 to-pink-400',
    },
    {
      name: 'Custom Collections',
      description: 'Personalized handmade accessories tailored to your style',
      accent: 'from-rose-300 to-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <Navigation />

      {/* Hero Section with 3D Background */}
      <section className="relative overflow-hidden py-16 md:py-40">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F4] via-[#F5ECEB] to-[#E8D5D0] opacity-60" />
        
        {/* Glassmorphism Blurred Shapes */}
        <div className="absolute top-10 right-5 w-64 h-64 bg-[#F7A8B8] rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#C97BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        {/* Floating Particles */}
        <FloatingParticles />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedLogo />

            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8D5D0] text-[#C97BA4] rounded-full text-xs font-semibold uppercase tracking-wide">
                <Sparkles size={14} />
                Handmade in India
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif text-neutral-900 mb-4 text-balance">
              Gulabi <span className="italic text-[#F7A8B8]">Guiltz</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-700 mb-4 italic max-w-2xl mx-auto text-balance">
              "Handcrafted stories, worn softly"
            </p>

            <p className="text-base md:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto text-balance">
              Discover whimsical handcrafted beaded jewelry and crochet accessories that bring joy and creativity to your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#C97BA4] text-white font-semibold rounded-full hover:bg-[#F7A8B8] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles size={18} />
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#C97BA4] font-semibold rounded-full border-2 border-[#E8D5D0] hover:border-[#C97BA4] hover:bg-[#FBF7F4] transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Section - Dynamic */}
      <section className="py-20 bg-white border-t border-[#E8D5D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-900 mb-4 text-balance">
              Featured Product
            </h2>
            <p className="text-lg text-neutral-600">
              Discover our latest handcrafted creation
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-center text-neutral-500 py-8">
              Products loading...
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-[#FBF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-neutral-900 mb-4 text-balance">
              Our Collections
            </h2>
            <p className="text-lg text-neutral-600">
              Explore our curated selection of handcrafted accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.name}
                className="group relative overflow-hidden rounded-2xl bg-white border border-[#E8D5D0] hover:border-[#C97BA4] hover:shadow-lg transition-all duration-300"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${collection.accent} opacity-8 group-hover:opacity-12 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-8 flex flex-col h-64 justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-3">
                      {collection.name}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {collection.description}
                    </p>
                  </div>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-[#C97BA4] font-semibold group/link text-sm"
                  >
                    View Collection
                    <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#C97BA4] to-[#F7A8B8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Ready to add some whimsy to your life?</h2>
          <p className="text-lg text-white/95 mb-8">
            Browse our complete collection of handmade beaded jewelry and crochet accessories
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-white text-[#C97BA4] font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
