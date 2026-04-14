'use client';

import { useEffect, useState } from 'react';
import { Trash2, Package } from 'lucide-react';
import { IProduct } from '@/lib/models/Product';

interface AdminProductsListProps {
  refreshTrigger: number;
}

export function AdminProductsList({ refreshTrigger }: AdminProductsListProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/products');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to delete product');
        setDeletingId(null);
        return;
      }

      // Refresh the list
      await fetchProducts();
      setDeletingId(null);
    } catch (err) {
      alert('Network error. Please try again.');
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8D5D0] p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-[#C97BA4] to-[#F7A8B8] rounded-lg flex items-center justify-center">
          <Package className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-serif font-semibold text-neutral-900">
          Products ({products.length})
        </h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-12 text-center">
          <p className="text-neutral-500">Loading products...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 text-neutral-400" size={48} />
          <p className="text-neutral-500">No products yet. Add your first product above!</p>
        </div>
      )}

      {/* Products Table */}
      {!loading && products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8D5D0]">
                <th className="text-left py-4 px-4 font-semibold text-neutral-900">Name</th>
                <th className="text-left py-4 px-4 font-semibold text-neutral-900">Code</th>
                <th className="text-left py-4 px-4 font-semibold text-neutral-900">Price</th>
                <th className="text-left py-4 px-4 font-semibold text-neutral-900">Category</th>
                <th className="text-left py-4 px-4 font-semibold text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-[#E8D5D0] hover:bg-[#FBF7F4] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-neutral-900">{product.name}</p>
                        <p className="text-xs text-neutral-500 max-w-xs truncate">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <code className="bg-[#FBF7F4] px-3 py-1 rounded text-sm font-mono text-neutral-700">
                      {product.code}
                    </code>
                  </td>
                  <td className="py-4 px-4 font-medium text-neutral-900">{product.price}</td>
                  <td className="py-4 px-4 text-neutral-600">
                    {product.category || '-'}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteProduct(String(product._id))}
                      disabled={deletingId === String(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
