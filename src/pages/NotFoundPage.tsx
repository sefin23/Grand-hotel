import React from 'react'
import { Link } from 'react-router-dom'
import { Frown, Home } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 animate-fade-in">
      <Frown className="w-24 h-24 text-primary mb-8 animate-bounce-slow" />
      <h1 className="text-6xl font-extrabold text-text mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-textSecondary mb-6">Page Not Found</h2>
      <p className="text-lg text-textSecondary mb-10 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-accent transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        <Home className="w-6 h-6" /> Go to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage