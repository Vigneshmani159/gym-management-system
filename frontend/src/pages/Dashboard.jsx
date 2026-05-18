import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeMembers: 0,
    expiredMembers: 0,
    expiredMembersList: [],
  })
  const [todayAttendance, setTodayAttendance] = useState(0)
  const [recentPayments, setRecentPayments] = useState([])

  // Load data when page opens
  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      // Fetch student stats
      const statsRes = await axios.get(`${API}/students/stats`)
      setStats(statsRes.data)

      // Fetch today's attendance
      const attRes = await axios.get(`${API}/attendance/today`)
      setTodayAttendance(attRes.data.todayCount)

      // Fetch recent payments (last 5)
      const payRes = await axios.get(`${API}/payments`)
      // Sort by id descending and take last 5
      const sorted = payRes.data.sort((a, b) => b.id - a.id).slice(0, 5)
      setRecentPayments(sorted)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    }
  }

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">📊 Dashboard</h4>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white shadow" style={{ backgroundColor: '#4e73df' }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: '14px' }}>Total Students</div>
                  <h3>{stats.totalStudents}</h3>
                </div>
                <div style={{ fontSize: '40px', opacity: 0.5 }}>👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white shadow" style={{ backgroundColor: '#1cc88a' }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: '14px' }}>Active Memberships</div>
                  <h3>{stats.activeMembers}</h3>
                </div>
                <div style={{ fontSize: '40px', opacity: 0.5 }}>✅</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white shadow" style={{ backgroundColor: '#e74a3b' }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: '14px' }}>Expired Memberships</div>
                  <h3>{stats.expiredMembers}</h3>
                </div>
                <div style={{ fontSize: '40px', opacity: 0.5 }}>❌</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white shadow" style={{ backgroundColor: '#f6c23e' }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <div style={{ fontSize: '14px' }}>Today Attendance</div>
                  <h3>{todayAttendance}</h3>
                </div>
                <div style={{ fontSize: '40px', opacity: 0.5 }}>📅</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Expired Members */}
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header><strong>⚠️ Expired Members</strong></Card.Header>
            <Card.Body>
              <Table size="sm" hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Reg No</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.expiredMembersList.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted">No expired members</td></tr>
                  ) : (
                    stats.expiredMembersList.map((s) => (
                      <tr key={s.id}>
                        <td>{s.fullName}</td>
                        <td>{s.registerNumber}</td>
                        <td>
                          <Badge bg="danger">{s.expiryDate}</Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Payments */}
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header><strong>💳 Recent Payments</strong></Card.Header>
            <Card.Body>
              <Table size="sm" hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted">No payments yet</td></tr>
                  ) : (
                    recentPayments.map((p) => (
                      <tr key={p.id}>
                        <td>{p.studentName}</td>
                        <td>₹{p.amount}</td>
                        <td>
                          <Badge bg={p.paymentMethod === 'Cash' ? 'success' : 'primary'}>
                            {p.paymentMethod}
                          </Badge>
                        </td>
                        <td>{p.paymentDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard