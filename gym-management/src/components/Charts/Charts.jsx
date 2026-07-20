import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = ['#e63946', '#2ecc71', '#f39c12', '#3498db', '#9b59b6']

export const LineChartComponent = ({ data, dataKey, xAxisKey, color = '#e63946' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
      <XAxis dataKey={xAxisKey} stroke="#a0a0a0" />
      <YAxis stroke="#a0a0a0" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px'
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        dot={{ fill: color, strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
)

export const AreaChartComponent = ({ data, dataKey, xAxisKey, color = '#e63946' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
      <XAxis dataKey={xAxisKey} stroke="#a0a0a0" />
      <YAxis stroke="#a0a0a0" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px'
        }}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        fillOpacity={0.3}
        fill={color}
      />
    </AreaChart>
  </ResponsiveContainer>
)

export const BarChartComponent = ({ data, dataKey, xAxisKey, color = '#e63946' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
      <XAxis dataKey={xAxisKey} stroke="#a0a0a0" />
      <YAxis stroke="#a0a0a0" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px'
        }}
      />
      <Legend />
      <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export const PieChartComponent = ({ data, dataKey, nameKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px'
        }}
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
)

export default { LineChartComponent, AreaChartComponent, BarChartComponent, PieChartComponent }
