import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Crown, 
  Calendar, 
  ClipboardCheck, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Menu,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/trainers', icon: UserCheck, label: 'Trainers' },
    { path: '/membership', icon: Crown, label: 'Membership' },
    { path: '/classes', icon: Calendar, label: 'Classes' },
    { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { path: '/workout', icon: Dumbbell, label: 'Workout' },
    { path: '/nutrition', icon: Apple, label: 'Nutrition' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/payment', icon: CreditCard, label: 'Payment' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 bg-[var(--bg-darker)] border-r border-[var(--glass-border)] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-[var(--text-light)]">FitZone</span>
            </Link>
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-[var(--primary-color)] text-white'
                          : 'text-[var(--text-light)] hover:bg-[var(--glass-bg)]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--glass-border)]">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text-light)]">John Doe</p>
                <p className="text-xs text-[var(--text-gray)]">Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
