'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import NoteCard from '@/components/NoteCard';
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeTab === 'stats') {
      fetchStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'notes') {
      fetchNotes();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/notes');
      setNotes(response.data.notes);
      setSelectedUserId(null); // Reset selection when fetching all notes
      setUserNotes([]);
    } catch (error) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // Group notes by user for display
  const groupedNotes = notes.reduce((acc, note) => {
    const userId = note.userId?._id || 'unknown';
    const userName = note.userId?.name || 'Unknown User';
    const userEmail = note.userId?.email || '';
    
    if (!acc[userId]) {
      acc[userId] = {
        userId,
        userName,
        userEmail,
        notes: []
      };
    }
    acc[userId].notes.push(note);
    return acc;
  }, {});

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setUserNotes(groupedNotes[userId]?.notes || []);
  };

  const handleBackToAllUsers = () => {
    setSelectedUserId(null);
    setUserNotes([]);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      fetchStats(); // Refresh stats
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`/api/admin/notes/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
      fetchStats(); // Refresh stats
    } catch (error) {
      alert('Failed to delete note');
    }
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-40 w-64 h-64 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users, notes, and monitor platform activity</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 mb-8">
          <nav className="flex space-x-4">
            {[
              { key: 'stats', label: 'Statistics', icon: '📊' },
              { key: 'users', label: 'Users', icon: '👥' },
              { key: 'notes', label: 'All Notes', icon: '📝' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div>
            {loading ? (
              <LoadingSpinner text="Loading statistics..." />
            ) : stats ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-700">Total Notes</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalNotes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-700">New Users (7d)</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.recentUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-700">New Notes (7d)</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.recentNotes}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {stats.topUsers?.length > 0 && (
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
                    <div className="px-6 py-4 border-b border-white/20">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Most Active Users</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {stats.topUsers.map((user, index) => (
                          <div key={user._id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{user.noteCount} notes</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            {loading ? (
              <LoadingSpinner text="Loading users..." />
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">All Users ({users.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div>
            {loading ? (
              <LoadingSpinner text="Loading notes..." />
            ) : selectedUserId ? (
              // Show notes for selected user
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <button
                      onClick={handleBackToAllUsers}
                      className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to All Users
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Notes by {groupedNotes[selectedUserId]?.userName} ({userNotes.length})
                    </h2>
                    <p className="text-sm text-gray-600">{groupedNotes[selectedUserId]?.userEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onDelete={handleDeleteNote}
                      isAdmin={true}
                    />
                  ))}
                </div>
                {userNotes.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    This user has no notes yet.
                  </div>
                )}
              </div>
            ) : (
              // Show all users with their note counts
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">All Notes by Users ({notes.length} total)</h2>
                  <p className="text-gray-600">Click on a user to view their notes</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(groupedNotes).map((userGroup) => (
                    <div
                      key={userGroup.userId}
                      onClick={() => handleUserSelect(userGroup.userId)}
                      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 border hover:border-blue-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-semibold text-lg">
                              {userGroup.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{userGroup.userName}</h3>
                            <p className="text-sm text-gray-600">{userGroup.userEmail}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{userGroup.notes.length}</div>
                          <div className="text-xs text-gray-500">notes</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Click to view all notes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {Object.keys(groupedNotes).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No notes found in the system.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
}