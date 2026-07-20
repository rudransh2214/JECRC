import React, { useState } from 'react'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import Card from '../../components/Card'
import { LineChartComponent, BarChartComponent, PieChartComponent } from '../../components/Charts'
import { dummyData } from '../../services/dummyData'

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">Analytics Dashboard</h1>
        <p className="text-[var(--text-gray)]">Comprehensive gym analytics and insights</p>
      </div>

      {/* Period Selector */}
      <Card>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-green-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">$124,500</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Total Revenue</div>
          <div className="text-green-500 text-xs mt-1">+15% from last period</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">156</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">New Members</div>
          <div className="text-green-500 text-xs mt-1">+12% growth</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-purple-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">87%</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Retention Rate</div>
          <div className="text-green-500 text-xs mt-1">Excellent</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-orange-500" size={24} />
            <div className="text-2xl font-bold text-[var(--text-light)]">$68</div>
          </div>
          <div className="text-[var(--text-gray)] text-sm">Avg Revenue/Member</div>
          <div className="text-green-500 text-xs mt-1">+8% increase</div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Revenue Trend</h3>
          <LineChartComponent
            data={dummyData.analytics.revenue}
            dataKey="amount"
            xAxisKey="month"
            color="#e63946"
          />
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Member Growth</h3>
          <LineChartComponent
            data={dummyData.analytics.memberGrowth}
            dataKey="count"
            xAxisKey="month"
            color="#2ecc71"
          />
        </Card>
      </div>

      {/* Attendance Chart */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Attendance Analytics</h3>
        <BarChartComponent
          data={dummyData.analytics.attendance}
          dataKey="percentage"
          xAxisKey="day"
          color="#3498db"
        />
      </Card>

      {/* Class Popularity */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Class Popularity</h3>
        <PieChartComponent
          data={dummyData.analytics.classPopularity}
          dataKey="sessions"
          nameKey="name"
        />
      </Card>

      {/* Detailed Class Stats */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Class Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Class Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Total Sessions</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Avg Attendance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Capacity Usage</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-light)]">Trend</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.analytics.classPopularity.map((cls) => (
                <tr key={cls.name} className="border-b border-[var(--glass-border)]">
                  <td className="py-3 px-4 text-[var(--text-light)]">{cls.name}</td>
                  <td className="py-3 px-4 text-[var(--text-light)]">{cls.sessions}</td>
                  <td className="py-3 px-4 text-[var(--text-gray)]">-</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[var(--glass-bg)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--primary-color)] rounded-full"
                          style={{ width: `${Math.min(cls.sessions / 3, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-[var(--text-light)]">{Math.min(cls.sessions / 3, 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-500">↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Analytics
