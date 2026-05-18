import React, { useState, useEffect } from 'react'
import { Container, Card, Table, Form, InputGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

function AttendanceHistory() {
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [filterDate, setFilterDate] = useState('')

  useEffect(() => {
    loadAttendance()
  }, [])

  const loadAttendance = async () => {
    const res = await axios.get(`${API}/attendance`)
    // Sort by most recent first
    setRecords(res.data.sort((a, b) => b.id - a.id))
  }

  // Filter by search and date
  const filtered = records.filter((r) => {
    const matchSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.registerNumber.toLowerCase().includes(search.toLowerCase())
    const matchDate = filterDate ? r.attendanceDate === filterDate : true
    return matchSearch && matchDate
  })

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">📅 Attendance History</h4>

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
              <Form.Control
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="Filter by date"
              />
            </Col>
            <Col md={3}>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => { setSearch(''); setFilterDate('') }}
              >
                Clear Filters
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Attendance Table */}
      <Card className="shadow">
        <Card.Body>
          <Table hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Register Number</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.studentName}</td>
                    <td><strong>{r.registerNumber}</strong></td>
                    <td>{r.attendanceDate}</td>
                    <td>{r.attendanceTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <p className="text-muted small">Total records: {filtered.length}</p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AttendanceHistory