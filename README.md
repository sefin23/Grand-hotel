# Grand Hotel Booking System

A full-stack hotel booking application with room reservations, hall bookings, and food ordering.

## Project Structure

```
/Grand-hotel
  /backend
    /models
      User.js
      Booking.js
    /routes
      auth.js
      bookings.js
      reports.js
    /controllers
      auth.js
    server.js
    package.json
    .env
  /frontend
    /src
      /components
        Navbar.tsx
        Footer.tsx
        BookingForm.tsx
        RoomCard.tsx
        HallCard.tsx
        FoodItem.tsx
        AuthForm.tsx
      /pages
        HomePage.tsx
        LoginPage.tsx
        RegisterPage.tsx
        ProfilePage.tsx
        BookingPage.tsx
        AdminDashboardPage.tsx
        NotFoundPage.tsx
      /store
        authStore.ts
      App.tsx
      main.tsx
      index.css
    package.json
    index.html
    vite.config.ts
    tailwind.config.js
```

## Getting Started

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start MongoDB service
4. Run the server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features

- User authentication (register/login)
- Room booking with different types
- Hall/auditorium reservations
- Food ordering system
- Admin dashboard for managing bookings
- Daily reports and analytics
- Responsive design with dark theme

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- Lucide React for icons

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled