'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E8D5D0] shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#C97BA4] to-[#F7A8B8] rounded-full flex items-center justify-center">
            <Lock className="text-white" size={32} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-serif font-semibold text-neutral-900 text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-neutral-600 text-center mb-8">
          Secure access required
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-900 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-[#E8D5D0] focus:outline-none focus:border-[#C97BA4] focus:ring-2 focus:ring-[#C97BA4]/20 transition-colors"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#C97BA4] text-white font-semibold rounded-lg hover:bg-[#F7A8B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-neutral-500 text-xs mt-8">
          This area is restricted to authorized personnel only
        </p>
      </div>
    </div>
  );
}
