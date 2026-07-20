import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)] PointerEvent" 
        size={18} 
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
      />
    </div>
  )
}

export default SearchBar
