import React from 'react'
import { useNotification } from '../../context'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const Notification = () => {
  const { notifications, removeNotification } = useNotification()

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => {
        const Icon = icons[notification.type] || Info
        const colorClass = colors[notification.type] || colors.info
        
        return (
          <div
            key={notification.id}
            className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-gray)] border border-[var(--glass-border)] rounded-lg shadow-lg animate-slideRight"
          >
            <div className={`p-2 rounded-full ${colorClass}`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="flex-1 text-sm text-[var(--text-light)]">
              {notification.message}
            </p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 text-[var(--text-gray)] hover:text-[var(--text-light)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Notification
