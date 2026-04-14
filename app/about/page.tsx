import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Heart, Zap, Award } from 'lucide-react';

export const metadata = {
  title: 'About Gulabi Guiltz - Our Story',
  description: 'Learn about our passion for handcrafted crochet and beaded accessories.',
};

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description: 'Every piece is created with love and attention to detail, ensuring quality and uniqueness.',
    },
    {
      icon: Zap,
      title: 'Creative Expression',
      description: 'We celebrate individuality and whimsical designs that bring joy to everyday life.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Using premium materials and techniques to create accessories that last and delight.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-[#FBF7F4]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-neutral-900 mb-6 text-balance">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8">
            Gulabi Guiltz was born from a passion for handcrafted beauty and whimsical creativity. We create exquisite beaded jewelry and crochet accessories that bring joy to those who wear them. Every piece tells a unique story of artisanal craftsmanship and dedication to quality.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-[#FBF7F4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-6">
                Beaded Jewelry & Crochet
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Our journey began with a passion for creating beautiful beaded jewelry and whimsical crochet pieces. Each accessory is handmade with meticulous attention to detail, combining vibrant colors, unique patterns, and premium quality materials.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                We believe that handcrafted items carry special magic—they tell stories, connect maker to wearer, and celebrate the beauty of artisanal creation. Nothing has been achieved yet, but we&apos;re excited to share our creative vision with you.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#F7A8B8] to-[#C97BA4] rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-white font-semibold">Handcrafted with passion</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-[#C97BA4] to-[#F7A8B8] rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-white font-semibold">Creative designs</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-6">
                Our Craft
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We specialize in handcrafted beaded jewelry with intricate designs and soft crochet accessories that bring comfort and joy. Every stitch and bead is placed with care, creating unique pieces that express individuality.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Our team is dedicated to bringing creative visions to life through quality craftsmanship. We&apos;re just beginning our journey, and we&apos;d love to have you join us as we grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white border-t border-[#E8D5D0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600">
              What drives us to create beautiful things
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#FBF7F4] border border-[#E8D5D0] rounded-xl p-8 hover:border-[#C97BA4] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C97BA4] to-[#F7A8B8] rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#C97BA4] to-[#F7A8B8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/95 mb-8">
            Explore our collection of handcrafted beaded jewelry and crochet accessories created with love.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-3 bg-white text-[#C97BA4] font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Explore Products
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
