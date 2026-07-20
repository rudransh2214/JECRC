import React, { useState } from 'react'
import { Calendar, Clock, Users, Plus, X } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { dummyData } from '../../services/dummyData'

const Classes = () => {
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const filteredClasses = dummyData.classSchedule.filter(
    cls => cls.day === selectedDay
  )

  const handleBookClass = (cls) => {
    setSelectedClass(cls)
    setIsBookingModalOpen(true)
  }

  const confirmBooking = () => {
    setIsBookingModalOpen(false)
    setSelectedClass(null)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-500'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-500'
      case 'Advanced': return 'bg-red-500/20 text-red-500'
      default: return 'bg-gray-500/20 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Class Schedule</h1>
        <p className="text-[var(--text-gray)]">View and book your gym classes</p>
      </div>

      {/* Day Selector */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:border-[var(--primary-color)]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-1">{cls.name}</h3>
                <p className="text-[var(--text-gray)] text-sm">{cls.instructor}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(cls.difficulty)}`}>
                {cls.difficulty}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-[var(--text-gray)]">
                <Clock size={16} />
                <span>{cls.time} • {cls.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-gray)]">
                <Users size={16} />
                <span>{cls.enrolled}/{cls.capacity} enrolled</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--text-gray)]">Capacity</span>
                <span className="text-[var(--text-light)]">{Math.round((cls.enrolled / cls.capacity) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--glass-bg)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary-color)] rounded-full transition-all"
                  style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                />
              </div>
            </div>

            <Button
              block
              disabled={cls.enrolled >= cls.capacity}
              onClick={() => handleBookClass(cls)}
            >
              {cls.enrolled >= cls.capacity ? 'Full' : 'Book Class'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Book Class"
      >
        {selectedClass && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <h3 className="text-xl font-bold text-[var(--text-light)] mb-2">{selectedClass.name}</h3>
              <div className="space-y-2 text-[var(--text-gray)]">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{selectedClass.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{selectedClass.time} • {selectedClass.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{selectedClass.instructor}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-500 text-sm">
                <strong>Note:</strong> Please arrive 10 minutes before the class starts. Cancellations must be made at least 2 hours in advance.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Classes
