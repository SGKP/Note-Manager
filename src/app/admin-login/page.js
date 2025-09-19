'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleAdminLogin = async (formData) => {
    setLoading(true);
    const result = await login(formData.email, formData.password, true); // true for admin login
    setLoading(false);
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access administrative dashboard and user management
            </p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <AuthForm mode="login" onSubmit={handleAdminLogin} loading={loading} />
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 font-medium">Admin Access Only</p>
            <p className="text-sm text-gray-500">Contact system administrator for login credentials</p>
          </div>
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