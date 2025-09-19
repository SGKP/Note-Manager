// Database migration script to fix user roles
// Run this script to ensure all users have proper roles set

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-manager';

async function fixUserRoles() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all users without a role to have 'user' role
    const result1 = await mongoose.connection.db.collection('users').updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );
    
    console.log(`Updated ${result1.modifiedCount} users without role to 'user'`);

    // Update all users with null role to have 'user' role
    const result2 = await mongoose.connection.db.collection('users').updateMany(
      { role: null },
      { $set: { role: 'user' } }
    );
    
    console.log(`Updated ${result2.modifiedCount} users with null role to 'user'`);

    // Set admin role for the admin user
    const result3 = await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@notesmanager.com' },
      { $set: { role: 'admin' } },
      { upsert: false }
    );
    
    console.log(`Admin user role updated: ${result3.modifiedCount > 0 ? 'success' : 'admin user not found'}`);

    // Show current user count by role
    const userStats = await mongoose.connection.db.collection('users').aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('Current user statistics by role:', userStats);

    await mongoose.disconnect();
    console.log('Migration completed successfully');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

fixUserRoles();