# MagnetBrain Assignment

A full-stack Task Management System with priority-based organization and user authentication.

## 🚀 Deployment

**Live Demo:** [Add your deployment link here]

## ✨ Features

1. **Task Creation** - Form to create new tasks with title, description, due date, and priority assignment
2. **Task Details View** - Dedicated page to view complete task information including description and due date
3. **Task Editing** - Edit existing task details including title, description, and due date
4. **Task Deletion** - Delete tasks with confirmation dialogue for safety
5. **Task Status Update** - Mark tasks as completed or change status dynamically
6. **User Authentication** - bcryptjs-based authentication system for authorized access, user management, and task assignment
7. **Priority Management** - Move tasks between different priority lists for better organization
8. **Visual Representation** - Color-coded priority lists for quick task identification

## 📁 Folder Structure

```
magnetBrainassignment/
│
├── backend/
│   ├── controllers/      # Request handlers and business logic
│   ├── models/          # Database schemas and models
│   ├── routes/          # API route definitions
│   ├── middleware/      # Authentication and validation middleware
│   ├── config/          # Database and app configuration
│   ├── .env            # Environment variables (not in git)
│   ├── .gitignore      # Git ignore rules
│   ├── server.js       # Entry point for backend
│   └── package.json    # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service calls
│   │   ├── utils/       # Helper functions
│   │   ├── App.js       # Main App component
│   │   └── index.js     # Entry point
│   ├── public/          # Static files
│   └── package.json     # Frontend dependencies
│
└── README.md           # Project documentation
```

## 🛠️ Installation

### Backend Setup
```bash
cd backend
npm install
# Create .env file with required variables
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
