import React from 'react'
import { Link } from 'react-router-dom'
import { Hotel, LogIn, UserPlus, User, LayoutDashboard, CalendarCheck } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-surface shadow-lg py-4 px-6 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
          <Hotel className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-wide">BoltStay</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium">Home</Link>
          <Link to="/book" className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium flex items-center gap-1">
            <CalendarCheck className="w-5 h-5" /> Book Now
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium flex items-center gap-1">
                <User className="w-5 h-5" /> Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium flex items-center gap-1">
                  <LayoutDashboard className="w-5 h-5" /> Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-primary transition-all duration-300 text-lg font-medium shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium flex items-center gap-1">
                <LogIn className="w-5 h-5" /> Login
              </Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-accent transition-all duration-300 text-lg font-medium shadow-lg">
                <UserPlus className="w-5 h-5 inline-block mr-1" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar