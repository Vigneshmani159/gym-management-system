import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

function IncomeDashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    cashIncome: 0,
    onlineIncome: 0,
    yearlyIncome: 0,
    monthlyIncome: 0,
    totalPayments: 0,
    averageMonthlyIncome: 0,
  })
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    loadIncomeData()
  }, [])

  const loadIncomeData = async () => {
    try {
      const summaryRes = await axios.get(`${API}/income/summary`)
      setSummary(summaryRes.data)

      const monthlyRes = await axios.get(`${API}/income/monthly`)
      setMonthlyData(monthlyRes.data)
    } catch (err) {
      console.error('Error loading income data:', err)
    }
  }

  // Format number as Indian currency
  const formatMoney = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN')
  }

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">💰 Income Dashboard</h4>

      {/* ── TOP INCOME CARDS ── */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="text-white h-100" style={{ backgroundColor: '#1cc88a' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>Cash In Hand</small>
                  <h3 className="mt-1">{formatMoney(summary.cashIncome)}</h3>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>💵</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="text-white h-100" style={{ backgroundColor: '#4e73df' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>Online Payments Total</small>
                  <h3 className="mt-1">{formatMoney(summary.onlineIncome)}</h3>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>💳</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="text-white h-100" style={{ backgroundColor: '#f6c23e' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>This Month Income</small>
                  <h3 className="mt-1">{formatMoney(summary.monthlyIncome)}</h3>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>📆</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="text-white h-100" style={{ backgroundColor: '#e74a3b' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>This Year Income</small>
                  <h3 className="mt-1">{formatMoney(summary.yearlyIncome)}</h3>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>📅</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="text-white h-100" style={{ backgroundColor: '#6f42c1' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>Overall Total Income</small>
                  <h3 className="mt-1">{formatMoney(summary.totalIncome)}</h3>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>🏆</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="text-dark h-100 border">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Avg Monthly Income</small>
                  <h3 className="mt-1">{formatMoney(summary.averageMonthlyIncome)}</h3>
                  <small className="text-muted">
                    Total Payments: <strong>{summary.totalPayments}</strong>
                  </small>
                </div>
                <div style={{ fontSize: '48px', opacity: 0.4 }}>📊</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ── MONTHLY BREAKDOWN TABLE ── */}
      <Card className="shadow">
        <Card.Header>
          <strong>📅 Monthly Income Breakdown — {new Date().getFullYear()}</strong>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Month</th>
                <th>Total Income</th>
                <th>No. of Payments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m) => {
                const isCurrentMonth = m.monthNumber === new Date().getMonth() + 1
                return (
                  <tr key={m.monthNumber} className={isCurrentMonth ? 'table-warning' : ''}>
                    <td>{m.monthNumber}</td>
                    <td>
                      <strong>{m.month}</strong>
                      {isCurrentMonth && (
                        <Badge bg="warning" text="dark" className="ms-2">Current</Badge>
                      )}
                    </td>
                    <td>
                      <strong style={{ color: m.income > 0 ? '#1cc88a' : '#999' }}>
                        {formatMoney(m.income)}
                      </strong>
                    </td>
                    <td>{m.paymentCount} payments</td>
                    <td>
                      {m.income > 0 ? (
                        <Badge bg="success">Has Income</Badge>
                      ) : (
                        <Badge bg="secondary">No Income</Badge>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default IncomeDashboard