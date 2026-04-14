import { useState, useEffect } from 'react';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  code: string;
  price: string;
  description: string;
  image: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      if (data.success) {
        // Map MongoDB _id to id for consistency
        const mappedProducts = data.data.map((product: Product) => ({
          ...product,
          id: product._id || product.id,
        }));
        setProducts(mappedProducts);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
