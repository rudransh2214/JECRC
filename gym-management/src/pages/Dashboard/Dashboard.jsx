import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context'
import Card from '../../components/Card'
import { AreaChartComponent, BarChartComponent } from '../../components/Charts'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Dumbbell, 
  Activity,
  Award,
  Clock,
  Target
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalMembers: 1250,
    activeMembers: 980,
    revenue: 45000,
    attendance: 78
  })

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Checked in', time: '2 min ago' },
    { id: 2, user: 'Sarah Smith', action: 'Booked class', time: '15 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'Completed workout', time: '30 min ago' },
    { id: 4, user: 'Emily Davis', action: 'Renewed membership', time: '1 hour ago' }
  ]

  const upcomingClasses = [
    { id: 1, name: 'HIIT Training', instructor: 'Alex Anderson', time: '10:00 AM', capacity: 20, enrolled: 15 },
    { id: 2, name: 'Yoga Flow', instructor: 'Taylor Brown', time: '11:30 AM', capacity: 25, enrolled: 20 },
    { id: 3, name: 'Strength Training', instructor: 'Jordan Clark', time: '2:00 PM', capacity: 15, enrolled: 12 }
  ]

  const weeklyActivity = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 1 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 0.5 }
  ]

  const memberGrowth = [
    { month: 'Jan', members: 850 },
    { month: 'Feb', members: 920 },
    { month: 'Mar', members: 980 },
    { month: 'Apr', members: 1050 },
    { month: 'May', members: 1120 },
    { month: 'Jun', members: 1250 }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-light)]">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-[var(--text-gray)]">Here's what's happening with your gym today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp size={16} /> +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--text-light)]">{stats.totalMembers}</div>
          <div className="text-[var(--text-gray)] text-sm">Total Members</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Activity className="text-green-500" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp size={16} /> +8%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--text-light)]">{stats.activeMembers}</div>
          <div className="text-[var(--text-gray)] text-sm">Active Members</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Award className="text-purple-500" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp size={16} /> +15%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--text-light)]">${stats.revenue.toLocaleString()}</div>
          <div className="text-[var(--text-gray)] text-sm">Monthly Revenue</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Clock className="text-orange-500" size={24} />
            </div>
            <span className="text-red-500 text-sm font-medium flex items-center gap-1">
              <TrendingUp size={16} /> -3%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--text-light)]">{stats.attendance}%</div>
          <div className="text-[var(--text-gray)] text-sm">Attendance Rate</div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Member Growth</h3>
          <AreaChartComponent 
            data={memberGrowth} 
            dataKey="members" 
            xAxisKey="month" 
            color="#e63946"
          />
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Weekly Activity</h3>
          <BarChartComponent 
            data={weeklyActivity} 
            dataKey="hours" 
            xAxisKey="day" 
            color="#2ecc71"
          />
        </Card>
      </div>

      {/* Activity & Classes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                <div className="w-10 h-10 bg-[var(--primary-color)]/20 rounded-full flex items-center justify-center">
                  <Activity className="text-[var(--primary-color)]" size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--text-light)]">{activity.user}</div>
                  <div className="text-sm text-[var(--text-gray)]">{activity.action}</div>
                </div>
                <div className="text-sm text-[var(--text-gray)]">{activity.time}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Upcoming Classes</h3>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                <div className="w-10 h-10 bg-[var(--primary-color)]/20 rounded-full flex items-center justify-center">
                  <Calendar className="text-[var(--primary-color)]" size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--text-light)]">{cls.name}</div>
                  <div className="text-sm text-[var(--text-gray)]">{cls.instructor}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[var(--text-light)]">{cls.time}</div>
                  <div className="text-xs text-[var(--text-gray)]">{cls.enrolled}/{cls.capacity}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors">
            <Users className="text-[var(--primary-color)]" size={24} />
            <span className="text-sm font-medium text-[var(--text-light)]">Add Member</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors">
            <Calendar className="text-[var(--primary-color)]" size={24} />
            <span className="text-sm font-medium text-[var(--text-light)]">Schedule Class</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors">
            <Dumbbell className="text-[var(--primary-color)]" size={24} />
            <span className="text-sm font-medium text-[var(--text-light)]">Create Workout</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary-color)] transition-colors">
            <Target className="text-[var(--primary-color)]" size={24} />
            <span className="text-sm font-medium text-[var(--text-light)]">View Reports</span>
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
