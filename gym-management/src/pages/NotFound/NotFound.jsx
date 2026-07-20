import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../../components/Button'
import Navbar from '../../components/Navbar'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-dark)] flex flex-col">
      <Navbar variant="landing" />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-[var(--primary-color)] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[var(--text-light)] mb-4">Page Not Found</h2>
          <p className="text-[var(--text-gray)] text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button>
                <Home size={18} /> Go Home
              </Button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg font-medium bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:border-[var(--primary-color)] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
