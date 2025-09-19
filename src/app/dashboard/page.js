'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import NoteCard from '@/components/NoteCard';
import NoteModal from '@/components/NoteModal';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data.notes);
    } catch (error) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (formData, noteId) => {
    try {
      if (noteId) {
        // Update existing note
        const response = await axios.put(`/api/notes/${noteId}`, formData);
        setNotes(notes.map(note => 
          note._id === noteId ? response.data.note : note
        ));
      } else {
        // Create new note
        const response = await axios.post('/api/notes', formData);
        setNotes([response.data.note, ...notes]);
      }
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to save note' 
      };
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      alert('Failed to delete note');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-indigo-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">My Notes</h1>
            <p className="text-gray-700 mt-1 font-medium text-lg">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-2xl group"
          >
            <svg className="w-6 h-6 mr-2 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="group-hover:animate-bounce">Add New Note</span>
          </button>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-800 px-6 py-4 rounded-2xl mb-6 font-medium shadow-lg backdrop-blur-sm">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner text="Loading your notes..." />
        ) : notes.length === 0 ? (
          <div className="text-center py-16 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">No notes yet</h3>
            <p className="text-gray-700 font-medium mb-8 text-lg">Get started by creating your first note!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        <NoteModal
          note={editingNote}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveNote}
        />
        </div>
      </div>
    </ProtectedRoute>
  );
}