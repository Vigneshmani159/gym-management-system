import React, { useState, useEffect } from 'react'
import { Container, Card, Table, Button, Form, Badge, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import StudentModal from '../components/StudentModal'

const API = 'http://localhost:8080'

function Students() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    const res = await axios.get(`${API}/students`)
    setStudents(res.data)
  }

  // Filter students by name or register number
  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (form) => {
    try {
      if (editStudent) {
        await axios.put(`${API}/students/${editStudent.id}`, form)
      } else {
        await axios.post(`${API}/students`, form)
      }
      loadStudents()
      setShowModal(false)
      setEditStudent(null)
    } catch (err) {
      alert('Error saving student: ' + err.message)
    }
  }

  const handleEdit = (student) => {
    setEditStudent(student)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await axios.delete(`${API}/students/${id}`)
      loadStudents()
    }
  }

  const handleAddNew = () => {
    setEditStudent(null)
    setShowModal(true)
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>👥 Students</h4>
        <Button variant="primary" onClick={handleAddNew}>+ Add Student</Button>
      </div>

      {/* Search */}
      <Card className="shadow mb-4">
        <Card.Body>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Search by name or register number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Students Table */}
      <Card className="shadow">
        <Card.Body>
          <Table hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No students found
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.registerNumber}</strong></td>
                    <td>{s.fullName}</td>
                    <td>{s.phone}</td>
                    <td>{s.joinDate}</td>
                    <td>{s.expiryDate}</td>
                    <td>
                      <Badge bg={s.membershipStatus === 'Active' ? 'success' : 'danger'}>
                        {s.membershipStatus}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-1"
                        onClick={() => handleEdit(s)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(s.id)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Student Add/Edit Modal */}
      <StudentModal
        show={showModal}
        onHide={() => { setShowModal(false); setEditStudent(null) }}
        onSave={handleSave}
        editStudent={editStudent}
      />
    </Container>
  )
}

export default Students