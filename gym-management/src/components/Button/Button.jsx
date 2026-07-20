import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  block = false, 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'btn'
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    outline: 'btn-outline'
  }
  
  const sizeStyles = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }
  
  const blockStyle = block ? 'btn-block' : ''
  
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    blockStyle,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  )
}

export default Button
