# FitZone Gym Management System

A complete, production-ready Gym Membership Management System frontend built with React.js 18+, Vite, and modern web technologies.

## 🏋️ Features

- **Modern UI/UX**: Premium fitness theme with glassmorphism cards, smooth animations, and responsive design
- **Authentication**: Login/Register with form validation and localStorage persistence
- **Dashboard**: Interactive dashboards for both members and admins with real-time statistics
- **Member Management**: Complete CRUD operations with search, filter, and pagination
- **Trainer Management**: Manage gym trainers with ratings, specializations, and availability
- **Membership Plans**: Multiple membership tiers with upgrade/downgrade functionality
- **Class Schedule**: View and book gym classes with capacity tracking
- **Attendance Tracking**: QR code check-in system with attendance history
- **Workout Plans**: Personalized workout plans with exercise details
- **Nutrition Plans**: Custom nutrition plans with macro tracking
- **Progress Tracking**: Weight, BMI, and body composition tracking with charts
- **Payment System**: Billing history and payment processing
- **Analytics Dashboard**: Comprehensive analytics with charts and insights
- **Settings**: Profile management, security, and notification preferences
- **Theme Support**: Dark/Light mode toggle
- **Responsive Design**: Fully responsive across all devices

## 🚀 Tech Stack

- **React 18+**: Modern React with Hooks
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing
- **Recharts**: Beautiful charts for data visualization
- **Lucide React**: Modern icon library
- **Context API**: State management
- **CSS3**: Custom CSS with CSS variables
- **JavaScript (ES6+)**: Modern JavaScript features

## 📁 Project Structure

```
gym-management/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── Navbar/         # Navigation component
│   │   ├── Sidebar/        # Sidebar component
│   │   ├── Footer/         # Footer component
│   │   ├── Button/         # Button component
│   │   ├── Card/           # Card component
│   │   ├── Modal/          # Modal component
│   │   ├── Table/          # Table component
│   │   ├── Loader/         # Loading component
│   │   ├── SearchBar/      # Search component
│   │   ├── Pagination/     # Pagination component
│   │   ├── Notification/    # Notification component
│   │   ├── Charts/         # Chart components
│   │   └── ProtectedRoute.jsx
│   ├── layouts/            # Layout components
│   │   ├── AdminLayout.jsx
│   │   └── MemberLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Landing/        # Landing page
│   │   ├── Login/          # Login page
│   │   ├── Register/       # Registration page
│   │   ├── Dashboard/      # Dashboard page
│   │   ├── Members/        # Members management
│   │   ├── Trainers/       # Trainers management
│   │   ├── Membership/     # Membership plans
│   │   ├── Classes/        # Class schedule
│   │   ├── Attendance/     # Attendance tracking
│   │   ├── Workout/        # Workout plans
│   │   ├── Nutrition/      # Nutrition plans
│   │   ├── Progress/       # Progress tracking
│   │   ├── Payment/        # Payment system
│   │   ├── Analytics/      # Analytics dashboard
│   │   ├── Settings/       # Settings page
│   │   ├── About/          # About page
│   │   ├── Contact/        # Contact page
│   │   └── NotFound/       # 404 page
│   ├── context/            # Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services & dummy data
│   │   └── dummyData.js
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ and npm installed on your system

### Steps

1. **Install Dependencies**
   ```bash
   cd gym-management
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🎨 Theme & Design

### Color Palette
- **Primary**: #e63946 (Red)
- **Primary Dark**: #c1121f (Darker Red)
- **Text Dark**: #1a1a2e (Dark Blue/Gray)
- **Text Light**: #f8f9fa (Off-white)
- **Background Dark**: #0f0f0f (Very Dark Gray/Black)
- **Background Light**: #ffffff (White)
- **Glass Background**: rgba(255, 255, 255, 0.05)

### Design Features
- Glassmorphism cards with backdrop blur
- Smooth animations and transitions
- Gradient buttons
- Modern shadows and rounded corners
- Responsive grid layouts
- Premium typography

## 🔐 Authentication

### Default Credentials
- **Admin**: admin@fitzone.com / admin123
- **Member**: Any email / any password (demo mode)

### Features
- Email and password validation
- Remember me functionality
- Password visibility toggle
- Social login placeholders
- LocalStorage persistence
- Protected routes

## 📊 Dummy Data

The application includes realistic dummy data for:
- 100 Members with full profiles
- 20 Trainers with specializations
- 4 Membership plans
- 16 Class schedules
- 4 Workout plans
- 3 Nutrition plans
- Attendance records
- Payment history
- Analytics data

## 🌐 Pages Overview

### Public Pages
- **Landing Page**: Hero section, features, plans, testimonials, CTA
- **Login**: Email/password authentication
- **Register**: User registration with plan selection
- **About**: Company information and team
- **Contact**: Contact form and FAQ

### Protected Pages
- **Dashboard**: Overview with statistics and charts
- **Members**: Member management with CRUD operations
- **Trainers**: Trainer management with profiles
- **Membership**: Plan management and upgrades
- **Classes**: Class schedule and booking
- **Attendance**: Check-in system and history
- **Workout**: Workout plans and exercise tracking
- **Nutrition**: Meal plans and macro tracking
- **Progress**: Weight, BMI, and body composition tracking
- **Payment**: Billing and payment processing
- **Analytics**: Revenue, growth, and attendance analytics
- **Settings**: Profile, security, and preferences

## 🎯 Key Features

### Reusable Components
- **Button**: Multiple variants (primary, secondary, outline, danger)
- **Card**: Glassmorphism cards with hover effects
- **Modal**: Custom modal with overlay
- **Table**: Responsive table with custom rendering
- **Pagination**: Smart pagination with ellipsis
- **SearchBar**: Search input with icon
- **Loader**: Loading spinner with text
- **Notification**: Toast notification system
- **Charts**: Line, Area, Bar, and Pie charts using Recharts

### State Management
- **AuthContext**: User authentication and session management
- **ThemeContext**: Dark/Light mode toggle
- **NotificationContext**: Toast notification system

### Utilities
- Form validation
- Search and filter functionality
- Pagination logic
- Data formatting
- LocalStorage helpers

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Customization

### Theme Colors
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-color: #e63946;
  --primary-dark: #c1121f;
  /* ... other variables */
}
```

### Dummy Data
Modify data in `src/services/dummyData.js`

### Routing
Update routes in `src/App.jsx`

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel deploy
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to GitHub Pages
```

## 📝 License

This project is created for educational purposes (Final Year Project).

## 👥 Credits

- **Developer**: FitZone Team
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## 📞 Support

For questions or issues, please contact the development team.

---

**Note**: This is a frontend-only application. To make it fully functional, you need to connect it to a backend API for authentication, data persistence, and real-time features.
