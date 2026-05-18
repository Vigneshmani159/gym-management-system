import React, { useState, useEffect } from 'react'
import { Container, Card, Table, Form, Badge, InputGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

function PaymentHistory() {
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState('')
  const [filterMonth, setFilterMonth] = useState('')

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    const res = await axios.get(`${API}/payments`)
    setPayments(res.data.sort((a, b) => b.id - a.id))
  }

  // Filter payments
  const filtered = payments.filter((p) => {
    const matchSearch =
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.registerNumber.toLowerCase().includes(search.toLowerCase())

    // Filter by month (paymentDate is like "2024-01-15", so month is chars 5-6)
    const matchMonth = filterMonth
      ? p.paymentDate && p.paymentDate.substring(5, 7) === filterMonth
      : true

    return matchSearch && matchMonth
  })

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">📋 Payment History</h4>

      {/* Filters */}
      <Card className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Search by name or register number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => { setSearch(''); setFilterMonth('') }}
              >
                Clear Filters
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary */}
      <Card className="shadow mb-3 border-0 bg-light">
        <Card.Body className="py-2">
          Total Amount Shown: <strong>
            ₹{filtered.reduce((sum, p) => sum + Number(p.amount), 0).toLocaleString('en-IN')}
          </strong>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          Records: <strong>{filtered.length}</strong>
        </Card.Body>
      </Card>

      {/* Payments Table */}
      <Card className="shadow">
        <Card.Body>
          <Table hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Token</th>
                <th>Date</th>
                <th>Reg No</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><small className="text-muted">{p.tokenNumber}</small></td>
                  <td>{p.paymentDate}</td>
                  <td><strong>{p.registerNumber}</strong></td>
                  <td>{p.studentName}</td>
                  <td>{p.duration} month(s)</td>
                  <td>
                    <Badge bg={p.paymentMethod === 'Cash' ? 'success' : 'primary'}>
                      {p.paymentMethod}
                    </Badge>
                  </td>
                  <td><strong className="text-success">₹{p.amount}</strong></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PaymentHistory