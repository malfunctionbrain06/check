'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { AdminAddProduct } from '@/components/AdminAddProduct';
import { AdminProductsList } from '@/components/AdminProductsList';

export default function AdminDashboard() {
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Verify admin is logged in by checking if session exists
    // If no session, user will need to login
  }, []);

  const handleProductAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });

      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8D5D0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-neutral-900">
              Admin Dashboard
            </h1>
            <p className="text-neutral-600 mt-1">Manage your products and inventory</p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <LogOut size={20} />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Add Product Form */}
          <AdminAddProduct onProductAdded={handleProductAdded} />

          {/* Products List */}
          <AdminProductsList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}
