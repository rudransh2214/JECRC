import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Notification from '../components/Notification'

const MemberLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <Navbar variant="dashboard" />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-6 pt-20">
          <Outlet />
        </main>
      </div>
      <Notification />
    </div>
  )
}

export default MemberLayout
