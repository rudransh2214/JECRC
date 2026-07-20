import React, { useState } from 'react'
import { User, Shield, Bell, Moon, Sun, Trash2, Download } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { useAuth, useTheme } from '../../context'

const Settings = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    classes: true,
    payments: true,
    promotions: false
  })

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Settings</h1>
        <p className="text-[var(--text-gray)]">Manage your account settings</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <User className="text-[var(--primary-color)]" size={24} />
          <h3 className="text-xl font-bold text-[var(--text-light)]">Profile Information</h3>
        </div>
        <form onSubmit={handleSaveProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">First Name</label>
              <input
                type="text"
                defaultValue={user?.firstName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Last Name</label>
              <input
                type="text"
                defaultValue={user?.lastName}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1-555-123-4567"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>

      {/* Security Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-[var(--primary-color)]" size={24} />
          <h3 className="text-xl font-bold text-[var(--text-light)]">Security</h3>
        </div>
        <form onSubmit={handleChangePassword}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </Card>

      {/* Notification Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="text-[var(--primary-color)]" size={24} />
          <h3 className="text-xl font-bold text-[var(--text-light)]">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive updates about your account via email' },
            { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
            { key: 'classes', label: 'Class Reminders', desc: 'Get reminded about upcoming classes' },
            { key: 'payments', label: 'Payment Reminders', desc: 'Receive alerts before payment due dates' },
            { key: 'promotions', label: 'Promotional Emails', desc: 'Receive offers and promotions' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <div>
                <div className="font-medium text-[var(--text-light)]">{item.label}</div>
                <div className="text-sm text-[var(--text-gray)]">{item.desc}</div>
              </div>
              <button
                onClick={() => handleNotificationToggle(item.key)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key] ? 'bg-[var(--primary-color)]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Theme Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          {theme === 'dark' ? <Moon className="text-[var(--primary-color)]" size={24} /> : <Sun className="text-[var(--primary-color)]" size={24} />}
          <h3 className="text-xl font-bold text-[var(--text-light)]">Theme</h3>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          <div>
            <div className="font-medium text-[var(--text-light)]">Dark Mode</div>
            <div className="text-sm text-[var(--text-gray)]">Toggle between light and dark theme</div>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full transition-colors ${
              theme === 'dark' ? 'bg-[var(--primary-color)]' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-red-500" size={24} />
          <h3 className="text-xl font-bold text-red-500">Danger Zone</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            <Download size={18} /> Download My Data
          </Button>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Deactivate Account
          </Button>
          <Button variant="danger" onClick={logout}>
            <Trash2 size={18} /> Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Settings
