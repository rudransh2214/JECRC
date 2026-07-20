import React, { useState } from 'react'
import { TrendingUp, Weight, Activity, Plus } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { LineChartComponent } from '../../components/Charts'

const Progress = () => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const progressData = [
    { date: '2024-01-15', weight: 180, bmi: 25.5, bodyFat: 22 },
    { date: '2024-01-14', weight: 181, bmi: 25.7, bodyFat: 22.5 },
    { date: '2024-01-13', weight: 182, bmi: 25.9, bodyFat: 23 },
    { date: '2024-01-12', weight: 183, bmi: 26.1, bodyFat: 23.5 },
    { date: '2024-01-11', weight: 184, bmi: 26.3, bodyFat: 24 },
    { date: '2024-01-10', weight: 185, bmi: 26.5, bodyFat: 24.5 },
    { date: '2024-01-09', weight: 186, bmi: 26.7, bodyFat: 25 }
  ]

  const currentStats = {
    weight: 180,
    bmi: 25.5,
    bodyFat: 22,
    muscleMass: 145
  }

  const handleLogEntry = (e) => {
    e.preventDefault()
    setIsLogModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-light)]">Progress Tracking</h1>
          <p className="text-[var(--text-gray)]">Track your fitness progress</p>
        </div>
        <Button onClick={() => setIsLogModalOpen(true)}>
          <Plus size={18} /> Log Entry
        </Button>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Weight className="text-[var(--primary-color)]" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentStats.weight}</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Weight (lbs)</div>
          <div className="text-green-500 text-xs mt-1">-6 lbs from start</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-blue-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentStats.bmi}</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">BMI</div>
          <div className="text-green-500 text-xs mt-1">Normal range</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-orange-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentStats.bodyFat}%</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Body Fat</div>
          <div className="text-green-500 text-xs mt-1">-3% from start</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-purple-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">{currentStats.muscleMass}</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Muscle Mass (lbs)</div>
          <div className="text-green-500 text-xs mt-1">+4 lbs gained</div>
        </Card>
      </div>

      {/* Period Selector */}
      <Card>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedPeriod === period
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-light)] hover:border-[var(--primary-color)]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </Card>

      {/* Weight Progress Chart */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Weight Progress</h3>
        <LineChartComponent
          data={progressData}
          dataKey="weight"
          xAxisKey="date"
          color="#e63946"
        />
      </Card>

      {/* BMI Progress Chart */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">BMI Progress</h3>
        <LineChartComponent
          data={progressData}
          dataKey="bmi"
          xAxisKey="date"
          color="#2ecc71"
        />
      </Card>

      {/* Progress Log */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Progress Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Weight</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">BMI</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Body Fat</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((entry) => (
                <tr key={entry.date} className="border-b border-[var(--glass-border)]">
                  <td className="py-3 px-4 text-[var(--text-light)]">{entry.date}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{entry.weight} lbs</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{entry.bmi}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{entry.bodyFat}%</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Log Entry Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title="Log Progress Entry"
      >
        <form onSubmit={handleLogEntry}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">BMI</label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Body Fat (%)</label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-[var(--text-light)] mb-2">Notes</label>
            <textarea
              rows="3"
              className="w-full px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
              placeholder="Any notes..."
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsLogModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Entry</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Progress
