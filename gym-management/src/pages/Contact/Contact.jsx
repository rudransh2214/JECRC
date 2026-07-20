import React, { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useNotification } from '../../context'

const Contact = () => {
  const { success } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const faqs = [
    { question: 'What are your opening hours?', answer: 'We are open 24/7 for Premium and Elite members. Basic and Standard members have access from 6AM to 10PM.' },
    { question: 'How do I cancel my membership?', answer: 'You can cancel your membership with 30 days notice. Visit our front desk or contact us via email.' },
    { question: 'Do you offer trial memberships?', answer: 'Yes! We offer a 7-day free trial for new members. Contact us to get started.' },
    { question: 'Can I freeze my membership?', answer: 'Yes, you can freeze your membership for up to 3 months per year for medical reasons or travel.' }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-gray)] to-[var(--bg-dark)]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-light)] mb-4">
            Contact <span className="text-[var(--primary-color)]">Us</span>
          </h1>
          <p className="text-xl text-[var(--text-gray)] max-w-2xl mx-auto">
            Get in touch with our team
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[var(--bg-darker)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-light)] mb-6">Get In Touch</h2>
              <p className="text-[var(--text-gray)] mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[var(--primary-color)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-light)] mb-1">Location</h3>
                    <p className="text-[var(--text-gray)]">123 Fitness Street, Gym City, GC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[var(--primary-color)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-light)] mb-1">Phone</h3>
                    <p className="text-[var(--text-gray)]">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-color)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[var(--primary-color)]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-light)] mb-1">Email</h3>
                    <p className="text-[var(--text-gray)]">info@fitzone.com</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-[var(--primary-color)] mx-auto mb-2" size={32} />
                  <p className="text-[var(--text-gray)]">Interactive Map</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <h3 className="text-2xl font-bold text-[var(--text-light)] mb-6">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@email.com"
                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1-555-123-4567"
                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] placeholder-[var(--text-gray)] focus:outline-none focus:border-[var(--primary-color)] resize-none"
                    required
                  />
                </div>
                <Button type="submit" block size="lg">
                  <Send size={18} /> Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--text-light)] mb-4">Frequently Asked Questions</h2>
            <p className="text-[var(--text-gray)] text-lg">Quick answers to common questions</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="text-lg font-bold text-[var(--text-light)] mb-2">{faq.question}</h3>
                <p className="text-[var(--text-gray)]">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact
