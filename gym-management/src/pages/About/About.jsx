import React from 'react'
import { Award, Users, Target, Heart, Dumbbell } from 'lucide-react'
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const About = () => {
  const features = [
    { icon: Award, title: 'Expert Trainers', description: 'Certified professionals with years of experience' },
    { icon: Target, title: 'Modern Equipment', description: 'State-of-the-art fitness technology' },
    { icon: Heart, title: 'Wellness Focus', description: 'Holistic approach to health and fitness' },
    { icon: Users, title: 'Community', description: 'Supportive environment for all fitness levels' }
  ]

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '5000+', label: 'Happy Members' },
    { value: '50+', label: 'Expert Trainers' },
    { value: '100+', label: 'Weekly Classes' }
  ]

  const team = [
    { name: 'Michael Roberts', role: 'Founder & CEO', bio: 'Former professional athlete with 15+ years in fitness' },
    { name: 'Sarah Johnson', role: 'Head Trainer', bio: 'Certified fitness expert specializing in sports performance' },
    { name: 'David Chen', role: 'Operations Manager', bio: 'Ensuring exceptional member experiences' },
    { name: 'Emily Williams', role: 'Nutrition Director', bio: 'Registered dietitian specializing in sports nutrition' }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-gray)] to-[var(--bg-dark)]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-light)] mb-4">
            About <span className="text-[var(--primary-color)]">FitZone</span>
          </h1>
          <p className="text-xl text-[var(--text-gray)] max-w-2xl mx-auto">
            Transforming lives through fitness since 2015
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[var(--bg-darker)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--text-light)] mb-6">Our Story</h2>
              <p className="text-[var(--text-gray)] mb-4">
                FitZone was founded in 2015 with a simple mission: to make quality fitness accessible to everyone while maintaining the highest standards of equipment and service.
              </p>
              <p className="text-[var(--text-gray)] mb-4">
                What started as a small neighborhood gym has grown into a premier fitness destination with over 5,000 active members and a team of 50+ expert trainers.
              </p>
              <p className="text-[var(--text-gray)]">
                Our journey began when our founder, a former professional athlete, noticed a gap in the fitness industry. Today, we pride ourselves on our state-of-the-art facilities, certified trainers, and supportive community.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-dark)] rounded-2xl flex items-center justify-center">
                <Dumbbell size={64} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">Why Choose Us?</h2>
            <p className="text-[var(--text-gray)] text-lg">What sets FitZone apart</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} hover>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[var(--primary-color)]/20 rounded-2xl flex items-center justify-center mb-4">
                      <Icon size={32} className="text-[var(--primary-color)]" />
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

      {/* Stats */}
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

      {/* Team */}
      <section className="py-20 bg-[var(--bg-darker)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">Our Team</h2>
            <p className="text-[var(--text-gray)] text-lg">Meet the people behind FitZone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="w-24 h-24 bg-[var(--primary-color)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-[var(--primary-color)]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-light)] mb-1">{member.name}</h3>
                  <p className="text-[var(--primary-color)] text-sm mb-3">{member.role}</p>
                  <p className="text-[var(--text-gray)] text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
