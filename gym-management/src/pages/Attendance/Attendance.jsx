import React, { useState } from 'react'
import { QrCode, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { dummyData } from '../../services/dummyData'

const Attendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('January')

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    setCheckInTime(new Date().toLocaleTimeString())
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    setCheckInTime(null)
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June']

  const attendanceData = [
    { date: '2024-01-15', checkIn: '08:30 AM', checkOut: '10:45 AM', duration: '2h 15m', status: 'Present' },
    { date: '2024-01-14', checkIn: '07:00 AM', checkOut: '09:00 AM', duration: '2h 0m', status: 'Present' },
    { date: '2024-01-13', checkIn: '-', checkOut: '-', duration: '-', status: 'Absent' },
    { date: '2024-01-12', checkIn: '06:30 AM', checkOut: '08:30 AM', duration: '2h 0m', status: 'Present' },
    { date: '2024-01-11', checkIn: '09:00 AM', checkOut: '11:30 AM', duration: '2h 30m', status: 'Present' },
    { date: '2024-01-10', checkIn: '-', checkOut: '-', duration: '-', status: 'Absent' },
    { date: '2024-01-09', checkIn: '07:30 AM', checkOut: '09:45 AM', duration: '2h 15m', status: 'Present' }
  ]

  const presentDays = attendanceData.filter(a => a.status === 'Present').length
  const totalDays = attendanceData.length
  const attendanceRate = Math.round((presentDays / totalDays) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Attendance</h1>
        <p className="text-[var(--text-gray)]">Track your gym attendance</p>
      </div>

      {/* Quick Check-in */}
      <Card className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <QrCode size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {isCheckedIn ? 'Checked In' : 'Quick Check-in'}
              </h2>
              <p className="text-white/80">
                {isCheckedIn ? `Checked in at ${checkInTime}` : 'Scan QR code or click to check in'}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          >
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-2xl font-bold text-[var(--text-light)]">{presentDays}</div>
          <div className="text-[var(--text-gray)] text-sm">Days Present</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-[var(--text-light)]">{totalDays}</div>
          <div className="text-[var(--text-gray)] text-sm">Total Days</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-green-500">{attendanceRate}%</div>
          <div className="text-[var(--text-gray)] text-sm">Attendance Rate</div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-blue-500">12</div>
          <div className="text-[var(--text-gray)] text-sm">Day Streak</div>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[var(--text-light)]">Attendance History</h3>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[var(--text-light)] focus:outline-none focus:border-[var(--primary-color)]"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Check In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Check Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.date} className="border-b border-[var(--glass-border)]">
                  <td className="py-3 px-4 text-[var(--text-light)]">{record.date}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">{record.checkIn}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">{record.checkOut}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{record.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Present'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {record.status === 'Present' ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Monthly Progress */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Monthly Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Weekly Goal</span>
              <span className="text-[var(--text-light)]">4/5 days</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary-color)] rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Monthly Goal</span>
              <span className="text-[var(--text-light)]">18/20 days</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--text-gray)]">Yearly Goal</span>
              <span className="text-[var(--text-light)]">245/300 days</span>
            </div>
            <div className="w-full h-3 bg-[var(--glass-bg)] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Attendance
