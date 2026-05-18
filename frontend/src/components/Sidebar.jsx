import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({ onLogout }) {
  // Navigation links list
  const links = [
    { path: '/', label: '🏠 Dashboard' },
    { path: '/students', label: '👥 Students' },
    { path: '/payments', label: '💳 Payments' },
    { path: '/payment-history', label: '📋 Payment History' },
    { path: '/income', label: '💰 Income Dashboard' },
    { path: '/attendance', label: '✅ Attendance' },
    { path: '/attendance-history', label: '📅 Attendance History' },
    { path: '/settings', label: '⚙️ Settings' },
  ]

  const sidebarStyle = {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#5c5c65',
    position: 'fixed',
    left: 0,
    top: 0,
    padding: '20px 0',
    zIndex: 100,
  }

  const activeLinkStyle = {
    backgroundColor: 'gold',
    color: 'white',
    display: 'block',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '10px',
    margin: '2px 10px',
  }

  const linkStyle = {
    color: '#ccc',
    display: 'block',
    padding: '10px 20px',
    textDecoration: 'none',
    margin: '2px 10px',
    borderRadius: '4px',
  }

  return (
    <div style={sidebarStyle}>
      {/* Gym Name Header */}
      <div className="text-center mb-4">
        <h5 style={{ color: '#e94560', fontWeight: 'bold' }}>💪 GYM PRO</h5>
        <small style={{ color: '#999' }}>Management System</small>
      </div>

      {/* Navigation Links */}
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'} // "end" prevents "/" from matching all paths
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div style={{ padding: '20px 10px', marginTop: '20px' }}>
        <button
          className="btn btn-outline-danger w-100"
          onClick={onLogout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar