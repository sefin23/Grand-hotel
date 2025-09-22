import React from 'react'
import { Link } from 'react-router-dom'
import { Hotel, Github, Twitter, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-textSecondary py-8 px-6 border-t border-border mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center gap-2 text-primary mb-4">
            <Hotel className="w-7 h-7" />
            <span className="text-xl font-bold tracking-wide">BoltStay</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Experience unparalleled comfort and convenience. Your perfect stay, every time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link></li>
            <li><Link to="/book" className="hover:text-primary transition-colors duration-300">Book Now</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors duration-300">Profile</Link></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors duration-300">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/stackblitz" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/stackblitz" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/company/stackblitz" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm mt-4">&copy; {new Date().getFullYear()} BoltStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer