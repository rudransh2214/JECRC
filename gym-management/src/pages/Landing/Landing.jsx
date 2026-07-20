import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Dumbbell, Target, Heart, Users, TrendingUp, Award, Play } from 'lucide-react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const Landing = () => {
  const features = [
    { icon: Dumbbell, title: 'Modern Equipment', description: 'State-of-the-art fitness equipment for all your workout needs' },
    { icon: Target, title: 'Expert Trainers', description: 'Certified personal trainers to guide your fitness journey' },
    { icon: Heart, title: 'Wellness Programs', description: 'Comprehensive wellness programs including yoga and meditation' },
    { icon: Users, title: 'Community', description: 'Join a supportive community of fitness enthusiasts' }
  ]

  const plans = [
    { name: 'Basic', price: 29, features: ['Gym Access (6AM-10PM)', 'Basic Equipment', 'Locker Room Access'], popular: false },
    { name: 'Standard', price: 49, features: ['24/7 Gym Access', 'All Equipment', '5 Group Classes/Month'], popular: true },
    { name: 'Premium', price: 79, features: ['24/7 Access + VIP Areas', 'Unlimited Classes', '10 PT Sessions'], popular: false },
    { name: 'Elite', price: 149, features: ['All Premium Features', 'Unlimited PT', 'Full Spa Access'], popular: false }
  ]

  const stats = [
    { value: '5000+', label: 'Happy Members' },
    { value: '50+', label: 'Expert Trainers' },
    { value: '100+', label: 'Weekly Classes' },
    { value: '10+', label: 'Years Experience' }
  ]

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Member', text: 'FitZone transformed my life! The trainers are amazing and the community is so supportive.' },
    { name: 'Michael Chen', role: 'Member', text: 'Best gym I\'ve ever been to. The equipment is top-notch and the atmosphere is motivating.' },
    { name: 'Emily Davis', role: 'Member', text: 'I love the variety of classes and the personal attention from the trainers.' }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-gray)] to-[var(--bg-dark)]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-light)] mb-6 animate-slideUp">
            Transform Your Body,
            <span className="text-[var(--primary-color)]"> Transform Your Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-gray)] mb-8 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Join FitZone Gym and start your fitness journey today with state-of-the-art equipment and expert trainers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <Link to="/register">
              <Button size="lg" block>
                Start Your Journey <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" block>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--bg-darker)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">Why Choose FitZone?</h2>
            <p className="text-[var(--text-gray)] text-lg">Everything you need to achieve your fitness goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} hover>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[var(--primary-color)] rounded-2xl flex items-center justify-center mb-4">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-light)] mb-2">{feature.title}</h3>
                    <p className="text-[var(--text-gray)]">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">Membership Plans</h2>
            <p className="text-[var(--text-gray)] text-lg">Choose the perfect plan for your fitness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} hover className={`${plan.popular ? 'border-[var(--primary-color)]' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--primary-color)] rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[var(--text-light)] mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    ${plan.price}
                    <span className="text-lg text-[var(--text-gray)]">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-[var(--text-gray)]">
                      <div className="w-5 h-5 bg-[var(--success)] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button block variant={plan.popular ? 'primary' : 'outline'}>
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--primary-color)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--bg-darker)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">What Our Members Say</h2>
            <p className="text-[var(--text-gray)] text-lg">Real stories from real members</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} size={16} className="text-[var(--primary-color)] fill-[var(--primary-color)]" />
                    ))}
                  </div>
                  <p className="text-[var(--text-gray)] mb-6 flex-1">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-[var(--text-light)]">{testimonial.name}</div>
                    <div className="text-sm text-[var(--text-gray)]">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] border-none">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join FitZone today and get your first week free! No commitment required.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Join Now <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
