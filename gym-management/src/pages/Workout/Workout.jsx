import React, { useState } from 'react'
import { Dumbbell, Clock, Flame, Play, Plus } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { dummyData } from '../../services/dummyData'

const Workout = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleViewWorkout = (workout) => {
    setSelectedWorkout(workout)
    setIsDetailModalOpen(true)
  }

  const filteredWorkouts = selectedCategory === 'All'
    ? dummyData.workoutPlans
    : dummyData.workoutPlans.filter(w => w.category === selectedCategory)

  const todayWorkout = dummyData.workoutPlans[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Workout Plans</h1>
        <p className="text-[var(--text-gray)]">Your personalized workout plans</p>
      </div>

      {/* Today's Workout */}
      <Card className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Dumbbell size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Today's Workout</h2>
              <p className="text-white/80">{todayWorkout.name} • {todayWorkout.duration} weeks</p>
            </div>
          </div>
          <Button variant="secondary" size="lg" onClick={() => handleViewWorkout(todayWorkout)}>
            <Play size={18} /> Start Workout
          </Button>
        </div>
      </Card>

      {/* Category Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:border-[var(--primary-color)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      {/* Workout Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} hover>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-color)]/20 text-[var(--primary-color)]">
                {workout.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                {workout.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[var(--text-light)] mb-2">{workout.name}</h3>
            <p className="text-[var(--text-gray)] text-sm mb-4">{workout.description}</p>
            
            <div className="flex items-center gap-4 mb-4 text-[var(--text-gray)]">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{workout.duration} weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell size={16} />
                <span>{workout.exercises.length} exercises</span>
              </div>
            </div>

            <Button block onClick={() => handleViewWorkout(workout)}>
              View Plan
            </Button>
          </Card>
        ))}
      </div>

      {/* Workout Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedWorkout?.name}
        size="lg"
      >
        {selectedWorkout && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-color)]/20 text-[var(--primary-color)]">
                {selectedWorkout.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                {selectedWorkout.difficulty}
              </span>
            </div>
            
            <p className="text-[var(--text-gray)]">{selectedWorkout.description}</p>
            
            <div>
              <h4 className="text-lg font-bold text-[var(--text-light)] mb-4">Exercises</h4>
              <div className="space-y-3">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-[var(--text-light)]">{exercise.name}</h5>
                      <div className="flex items-center gap-2 text-[var(--text-gray)]">
                        <Flame size={16} />
                        <span className="text-sm">{exercise.sets} sets × {exercise.reps} reps</span>
                      </div>
                    </div>
                    <div className="text-sm text-[var(--text-gray)]">
                      Rest: {exercise.rest}s
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Play size={18} /> Start Workout
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Workout
