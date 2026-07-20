import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Bell, User } from 'lucide-react'
import { useTheme, useAuth } from '../../context'

const Navbar = ({ variant = 'landing' }) => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = variant === 'landing' ? [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ] : []

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-dark)]/80 backdrop-blur-lg border-b border-[var(--glass-border)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold text-[var(--text-light)]">FitZone</span>
          </Link>

          {/* Desktop Navigation */}
          {variant === 'landing' && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-[var(--primary-color)]'
                      : 'text-[var(--text-light)] hover:text-[var(--primary-color)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {variant === 'landing' ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-6 py-2 rounded-lg font-medium text-[var(--text-light)] hover:bg-[var(--glass-bg)] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg font-medium bg-[var(--primary-color)] text-[var(--text-light)] hover:opacity-90 transition-opacity"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors relative">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary-color)] rounded-full text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center">
                    <User size={18} className="text-[var(--text-light)]" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-[var(--text-light)]">
                      {user?.firstName || 'User'}
                    </p>
                    <p className="text-xs text-[var(--text-gray)]">
                      {user?.role || 'Member'}
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="hidden md:block px-4 py-2 rounded-lg font-medium text-[var(--text-light)] hover:bg-[var(--glass-bg)] transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)]"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--glass-border)] pt-4">
            {variant === 'landing' ? (
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-[var(--primary-color)]'
                        : 'text-[var(--text-light)] hover:text-[var(--primary-color)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-[var(--text-light)] hover:text-[var(--primary-color)]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-[var(--primary-color)]"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout()
                  setIsMobileMenuOpen(false)
                }}
                className="font-medium text-[var(--text-light)] hover:text-[var(--primary-color)]"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
