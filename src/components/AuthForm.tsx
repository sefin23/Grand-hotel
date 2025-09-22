import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Loader2 } from 'lucide-react'

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name?: string;
  setName?: (name: string) => void;
  loading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  loading,
  error,
}) => {
  return (
    <div className="bg-surface p-8 rounded-xl shadow-2xl w-full max-w-md border border-border animate-fade-in">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        {type === 'login' ? 'Welcome Back!' : 'Join BoltStay'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        {type === 'register' && (
          <div>
            <label htmlFor="name" className="block text-textSecondary text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
              <input
                type="text"
                id="name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text transition-all duration-200"
                placeholder="John Doe"
                value={name || ''}
                onChange={(e) => setName && setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-textSecondary text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
            <input
              type="email"
              id="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text transition-all duration-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-textSecondary text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
            <input
              type="password"
              id="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text transition-all duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <p className="text-error text-sm text-center bg-error/20 p-3 rounded-xl border border-error animate-shake">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="text-center text-textSecondary mt-6">
        {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
        <Link to={type === 'login' ? '/register' : '/login'} className="text-primary hover:underline font-medium">
          {type === 'login' ? 'Register here' : 'Login here'}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm