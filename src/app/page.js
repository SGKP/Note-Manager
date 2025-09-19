'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBook from '@/components/AnimatedBook';

export default function Home() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isAdmin, router]);

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      <AnimatedBook />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-pulse-slow">
            📚 Notes Manager
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up animation-delay-500">
            Your personal digital notebook. Create, organize, and manage your notes with ease.
            <br />Secure, simple, and always accessible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 animate-fade-in-up animation-delay-1000">
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-float">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">User Access</h2>
              <p className="text-white/80 group-hover:text-white transition-colors duration-300">Create your account and manage your personal notes</p>
            </div>
            <div className="space-y-4">
              <Link href="/login" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 block text-center transform hover:scale-105 hover:shadow-2xl group">
                <span className="group-hover:animate-bounce inline-block">Login to Your Account</span>
              </Link>
              <Link href="/register" className="w-full border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold py-4 px-8 rounded-xl transition-all duration-300 block text-center transform hover:scale-105 backdrop-blur-sm">
                Create New Account
              </Link>
              <p className="text-white/70 text-sm text-center animate-pulse">New users can register here</p>
            </div>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-float animation-delay-2000">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">Admin Access</h2>
              <p className="text-white/80 group-hover:text-white transition-colors duration-300">Administrative panel for managing users and content</p>
            </div>
            <div className="space-y-4">
              <Link href="/admin-login" className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 block text-center transform hover:scale-105 hover:shadow-2xl group">
                <span className="group-hover:animate-bounce inline-block">Admin Login</span>
              </Link>
              <div className="text-white/80 text-sm text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-bold text-yellow-200">Admin Access Only</p>
                <p className="text-white/60 text-xs mt-2 animate-pulse">Contact system administrator for credentials</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fade-in-up animation-delay-1500">
          <div className="group text-center bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">Easy to Use</h3>
            <p className="text-white/80 group-hover:text-white transition-colors duration-300">Simple and intuitive interface for managing your notes</p>
          </div>

          <div className="group text-center bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 animation-delay-500">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">Secure</h3>
            <p className="text-white/80 group-hover:text-white transition-colors duration-300">Your notes are protected with JWT authentication</p>
          </div>

          <div className="group text-center bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 animation-delay-1000">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">Fast</h3>
            <p className="text-white/80 group-hover:text-white transition-colors duration-300">Built with Next.js for optimal performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
