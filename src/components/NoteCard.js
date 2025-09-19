'use client';

import { useState } from 'react';

const NoteCard = ({ note, onEdit, onDelete, isAdmin = false }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    await onDelete(note._id);
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
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {note.title}
        </h3>
        <div className="flex space-x-2 ml-2">
          {!isAdmin && (
            <button
              onClick={() => onEdit(note)}
              className="text-blue-600 hover:text-blue-800 p-1"
              title="Edit note"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
            title="Delete note"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {note.description}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {formatDate(note.createdAt)}</span>
        {note.updatedAt !== note.createdAt && (
          <span>Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>

      {isAdmin && note.userId && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            By: <span className="font-medium">{note.userId.name}</span> ({note.userId.email})
          </span>
        </div>
      )}
    </div>
  );
};

export default NoteCard;