import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-darker)] border-t border-[var(--glass-border)]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-[var(--text-light)]">FitZone</span>
            </div>
            <p className="text-[var(--text-gray)] mb-4">
              Transform your body and life with FitZone Gym. Join our community of fitness enthusiasts today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:bg-[var(--primary-color)] transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[var(--text-light)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold text-[var(--text-light)] mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Group Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Yoga & Pilates
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  CrossFit
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-gray)] hover:text-[var(--primary-color)] transition-colors">
                  Nutrition Coaching
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-[var(--text-light)] mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[var(--text-gray)]">
                <MapPin size={18} className="text-[var(--primary-color)] flex-shrink-0 mt-1" />
                <span>123 Fitness Street, Gym City, GC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-gray)]">
                <Phone size={18} className="text-[var(--primary-color)] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-gray)]">
                <Mail size={18} className="text-[var(--primary-color)] flex-shrink-0" />
                <span>info@fitzone.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-[var(--glass-border)] text-center">
          <p className="text-[var(--text-gray)]">
            &copy; 2024 FitZone Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
