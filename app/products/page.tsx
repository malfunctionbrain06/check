import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductsGrid } from '@/components/ProductsGrid';

export const metadata = {
  title: 'Products - Gulabi Guiltz',
  description: 'Browse our collection of handcrafted crochet and beaded accessories.',
};

export default function Products() {
  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-[#FBF7F4]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-neutral-900 mb-6 text-balance">
            Our Products
          </h1>
          <p className="text-xl text-neutral-700 leading-relaxed">
            Discover our handcrafted collection of beaded jewelry and crochet accessories
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-[#FBF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsGrid />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#C97BA4] to-[#F7A8B8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Get Notified When Products Launch
          </h2>
          <p className="text-lg text-white/95 mb-8">
            Join our community and be the first to know about new handcrafted accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-[#C97BA4] font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
