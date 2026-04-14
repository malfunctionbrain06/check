'use client';

import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/ui/spinner';

export function ProductsGrid() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner className="text-[#C97BA4]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#C97BA4] text-white rounded-full hover:bg-[#F7A8B8] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block mb-6">
          <div className="text-6xl mb-4">🎁</div>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-4">
          Coming Soon
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          We&apos;re currently curating our collection of beautiful handcrafted beaded jewelry and crochet accessories. Check back soon to explore our whimsical creations!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          id={product._id || product.id || ''}
          name={product.name}
          code={product.code}
          price={product.price}
          description={product.description}
          image={product.image}
        />
      ))}
    </div>
  );
}
