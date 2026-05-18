import React from 'react'
import { Navbar, Container, Badge } from 'react-bootstrap'

function TopNavbar() {
  // Get current date and time
  const now = new Date()
  const dateString = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get gym name from settings (saved in localStorage)
  const gymName = localStorage.getItem('gymName') || 'GYM PRO'

  return (
    <Navbar
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e3e6f0',
        padding: '10px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Container fluid>
        {/* Left side: Page title / Gym name */}
        <Navbar.Brand style={{ fontWeight: 'bold', color: '#1a1a2e' }}>
          💪 {gymName}
        </Navbar.Brand>

        {/* Right side: Date + Admin badge */}
        <div className="d-flex align-items-center gap-3">
          {/* Current date */}
          <span style={{ color: '#6c757d', fontSize: '14px' }}>
            📅 {dateString}
          </span>

          {/* Admin badge */}
          <Badge
            style={{
              backgroundColor: '#e94560',
              fontSize: '13px',
              padding: '6px 12px',
            }}
          >
            👤 Admin
          </Badge>
        </div>
      </Container>
    </Navbar>
  )
}

export default TopNavbar