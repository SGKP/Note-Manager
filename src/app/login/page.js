'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
        </div>

        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}