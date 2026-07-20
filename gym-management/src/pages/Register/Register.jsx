import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, Dumbbell } from 'lucide-react'
import { useAuth, useNotification } from '../../context'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    plan: 'standard',
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const { success, error } = useNotification()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!formData.agreeTerms) {
      error('Please agree to the terms and conditions')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: 'member',
        plan: formData.plan
      }
      
      login(userData)
      success('Registration successful!')
      navigate('/dashboard')
      setLoading(false)
    }, 1000)
  }

  const plans = [
    { id: 'basic', name: 'Basic', price: 29 },
    { id: 'standard', name: 'Standard', price: 49 },
    { id: 'premium', name: 'Premium', price: 79 },
    { id: 'elite', name: 'Elite', price: 149 }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] flex flex-col">
      <Navbar variant="landing" />
      
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <Card className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--primary-color)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Dumbbell size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-light)]">Create Account</h2>
            <p className="text-[var(--text-gray)] mt-2">Join FitZone and start your fitness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-123-4567"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)] hover:text-[var(--text-light)]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-light)] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)]" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-gray)] hover:text-[var(--text-light)]"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-3">
                Select Membership Plan
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      formData.plan === plan.id
                        ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10'
                        : 'border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--primary-color)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.plan === plan.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-[var(--text-light)]">{plan.name}</div>
                      <div className="text-sm text-[var(--primary-color)]">${plan.price}/mo</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                required
              />
              <span className="text-sm text-[var(--text-gray)]">
                I agree to the{' '}
                <a href="#" className="text-[var(--primary-color)] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[var(--primary-color)] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button type="submit" block size="lg" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[var(--text-gray)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--primary-color)] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register
