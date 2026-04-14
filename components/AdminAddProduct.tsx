'use client';

import { FormEvent, useState } from 'react';
import { Plus } from 'lucide-react';

interface AdminAddProductProps {
  onProductAdded: () => void;
}

export function AdminAddProduct({ onProductAdded }: AdminAddProductProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add product');
        setLoading(false);
        return;
      }

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        code: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });

      // Refresh product list after 1 second
      setTimeout(() => {
        onProductAdded();
      }, 1000);

      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8D5D0] p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-[#C97BA4] to-[#F7A8B8] rounded-lg flex items-center justify-center">
          <Plus className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-serif font-semibold text-neutral-900">
          Add New Product
        </h2>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
              Product Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Mint Butterfly Clip"
              maxLength={100}
              className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
              required
              disabled={loading}
            />
          </div>

          {/* Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-neutral-900 mb-2">
              Product Code *
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="e.g., GG-001"
              maxLength={50}
              className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
              required
              disabled={loading}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-neutral-900 mb-2">
              Price *
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., ₹299"
              className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
              required
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-900 mb-2">
              Category (Optional)
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Hair Clips"
              maxLength={50}
              className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
              disabled={loading}
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-neutral-900 mb-2">
            Image URL *
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
            required
            disabled={loading}
          />
          <p className="text-xs text-neutral-500 mt-2">
            Must be a valid HTTPS URL to an image file
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your product in detail (10-500 characters)"
            minLength={10}
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors resize-none"
            required
            disabled={loading}
          />
          <p className="text-xs text-neutral-500 mt-2">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-[#C97BA4] text-white font-semibold rounded-lg hover:bg-[#F7A8B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
