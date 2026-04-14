import { useState, useEffect } from 'react';

interface Product {
  _id?: string;
  id?: string;
  name: string;
  code: string;
  price: number;
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
  deleteProduct: (id: string) => Promise<boolean>;
  addProduct: (product: Omit<Product, '_id' | 'id'>) => Promise<boolean>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      if (data.success) {
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

  const addProduct = async (product: Omit<Product, '_id' | 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to add product');
      }

      await fetchProducts();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
    deleteProduct,
    addProduct,
  };
}