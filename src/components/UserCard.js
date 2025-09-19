'use client';

import { useState } from 'react';

const UserCard = ({ user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete user "${user.name}" and all their notes? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    await onDelete(user._id);
    setIsDeleting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {user.name}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            user.role === 'admin' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {user.role?.toUpperCase() || 'USER'}
          </span>
          
          {user.role !== 'admin' && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
              title="Delete user and all their notes"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Joined: {formatDate(user.createdAt)}</p>
        {user.updatedAt !== user.createdAt && (
          <p>Last updated: {formatDate(user.updatedAt)}</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;