import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Payments from './pages/Payments'
import PaymentHistory from './pages/PaymentHistory'
import IncomeDashboard from './pages/IncomeDashboard'
import Attendance from './pages/Attendance'
import AttendanceHistory from './pages/AttendanceHistory'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/Navbar'

function App() {
  // Simple login state — true means logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  // If logged in, show the full app with sidebar
  return (

    
    <Router>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar on the left */}
        <Sidebar onLogout={handleLogout} />

        {/* Main content area */}
        <div className="flex-grow-1 bg-light" style={{ marginLeft: '220px' }}>
          <TopNavbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/income" element={<IncomeDashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance-history" element={<AttendanceHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App