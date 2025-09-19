'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
              📚 Notes Manager
            </Link>
            {isAdmin && (
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                ADMIN
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white font-medium bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 rounded-full">
                  Welcome <span className="font-bold">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                {/* <span className="text-sm animate-pulse">Choose your access type below</span> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;