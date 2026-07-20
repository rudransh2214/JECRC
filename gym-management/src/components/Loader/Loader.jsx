import React from 'react'

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className={`absolute inset-0 rounded-full border-4 border-[var(--primary-color)] opacity-25 ${sizeStyles[size]}`}></div>
        <div className={`absolute inset-0 rounded-full border-4 border-[var(--primary-color)] border-t-transparent animate-spin ${sizeStyles[size]}`}></div>
      </div>
      {text && <p className="text-[var(--text-gray)]">{text}</p>}
    </div>
  )
}

export default Loader
