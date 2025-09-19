'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
        return;
      }

      if (adminOnly && user.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  if (!user) {
    return <LoadingSpinner text="Redirecting to login..." />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <LoadingSpinner text="Redirecting to dashboard..." />;
  }

  return children;
};

export default ProtectedRoute;