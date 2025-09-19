# 📚 Notes Manager - Full Stack MERN Application

A comprehensive full-stack notes management application built with Next.js, featuring user authentication, CRUD operations, and admin functionality for content moderation.

## 🎯 Features

### User Features
- **User Registration & Login** - Secure email/password authentication
- **Personal Notes Management** - Create, read, update, and delete personal notes
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Instant note updates without page refresh

### Admin Features
- **Admin Dashboard** - Comprehensive statistics and analytics
- **User Management** - View all registered users and delete accounts
- **Content Moderation** - View all notes across the platform
- **Inappropriate Content Removal** - Delete any notes that violate guidelines

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Context** - State management for authentication

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing and validation
- **JSON Web Tokens (JWT)** - Secure user authentication

## 📁 Project Structure

```
notes-manager/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.js
│   │   │   │   ├── login/route.js
│   │   │   │   └── admin-login/route.js
│   │   │   ├── notes/
│   │   │   │   ├── route.js
│   │   │   │   └── [id]/route.js
│   │   │   └── admin/
│   │   │       ├── users/route.js
│   │   │       ├── notes/route.js
│   │   │       └── stats/route.js
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── admin-login/page.js
│   │   ├── dashboard/page.js
│   │   ├── admin/dashboard/page.js
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── AuthForm.js
│   │   ├── NoteCard.js
│   │   ├── NoteModal.js
│   │   ├── UserCard.js
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── LoadingSpinner.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── lib/
│   │   ├── mongodb.js
│   │   ├── auth.js
│   │   ├── middleware.js
│   │   └── adminMiddleware.js
│   └── models/
│       ├── User.js
│       └── Note.js
├── .env.local
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/notes-manager.git
   cd notes-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notes-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@notesmanager.com
   ADMIN_PASSWORD=admin123
   ADMIN_NAME=Administrator
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your Atlas connection string in `MONGODB_URI`

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The application will be running on localhost:3000

## 📖 Usage Guide

### User Registration & Login
1. Navigate to the homepage
2. Click "Create Account" to register a new user
3. Fill in your name, email, and password (minimum 6 characters)
4. After registration, you'll be automatically logged in and redirected to your dashboard

### Managing Notes
1. **Create a Note**: Click "Add New Note" button on your dashboard
2. **Edit a Note**: Click the edit icon on any note card
3. **Delete a Note**: Click the delete icon and confirm the action
4. **View Notes**: All your notes are displayed in a responsive grid layout

### Admin Access
1. Click "Admin Login" on the homepage
2. Use the default credentials:
   - **Email**: `admin@notesmanager.com`
   - **Password**: `admin123`
3. Access the admin dashboard with three main sections:
   - **Statistics**: Platform overview and user activity
   - **Users**: View and manage all registered users
   - **All Notes**: View and moderate all notes across the platform

## 🔐 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
User login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/admin-login`
Admin login
```json
{
  "email": "admin@notesmanager.com",
  "password": "admin123"
}
```

### Notes Endpoints (Protected)

#### GET `/api/notes`
Get all notes for the authenticated user

#### POST `/api/notes`
Create a new note
```json
{
  "title": "My Note Title",
  "description": "Note content goes here..."
}
```

#### PUT `/api/notes/:id`
Update an existing note
```json
{
  "title": "Updated Title",
  "description": "Updated content..."
}
```

#### DELETE `/api/notes/:id`
Delete a note by ID

### Admin Endpoints (Admin Only)

#### GET `/api/admin/stats`
Get platform statistics

#### GET `/api/admin/users`
Get all registered users

#### DELETE `/api/admin/users/:id`
Delete a user and all their notes

#### GET `/api/admin/notes`
Get all notes from all users

#### DELETE `/api/admin/notes/:id`
Delete any note by ID

## 🎨 UI Components

### Key Components
- **AuthForm**: Reusable login/register form
- **NoteCard**: Individual note display with actions
- **NoteModal**: Create/edit note modal dialog
- **UserCard**: Admin view of user information
- **Navbar**: Application navigation header
- **ProtectedRoute**: Route protection wrapper
- **LoadingSpinner**: Loading state indicator

## 🔧 Configuration

### Database Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Note Model
```javascript
{
  title: String (required, max: 100 chars),
  description: String (required),
  userId: ObjectId (required, ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 📦 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXTAUTH_URL=https://your-app-domain.com
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-admin-password
ADMIN_NAME=Administrator
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with validation
- [ ] User login and logout
- [ ] Note creation, editing, and deletion
- [ ] Admin login and dashboard access
- [ ] User management by admin
- [ ] Note moderation by admin
- [ ] Responsive design on various devices
- [ ] Error handling and loading states

## 🚧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or Atlas connection string is correct
   - Check network connectivity and firewall settings

2. **JWT Authentication Issues**
   - Verify JWT_SECRET is set in environment variables
   - Clear browser localStorage and cookies

3. **Build Errors**
   - Delete `.next` folder and `node_modules`
   - Run `npm install` and `npm run build`

4. **API Route Issues**
   - Check API route file structure and naming
   - Verify middleware and authentication logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB team for the flexible database
- Tailwind CSS for the utility-first CSS framework
- Vercel for seamless deployment platform

---

⭐ **If you found this project helpful, please give it a star!** ⭐
