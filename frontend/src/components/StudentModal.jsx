import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'

function StudentModal({ show, onHide, onSave, editStudent }) {
  // Form fields state
  const [form, setForm] = useState({
    registerNumber: '',
    fullName: '',
    phone: '',
    address: '',
    joinDate: '',
    expiryDate: '',
    membershipStatus: 'Active',
  })

  // When editing, fill form with student data
  useEffect(() => {
    if (editStudent) {
      setForm(editStudent)
    } else {
      // Reset form for new student
      setForm({
        registerNumber: '',
        fullName: '',
        phone: '',
        address: '',
        joinDate: '',
        expiryDate: '',
        membershipStatus: 'Active',
      })
    }
  }, [editStudent, show])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form) // Send data to Students.jsx
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editStudent ? 'Edit Student' : 'Add New Student'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Register Number *</Form.Label>
                <Form.Control
                  name="registerNumber"
                  value={form.registerNumber}
                  onChange={handleChange}
                  placeholder="e.g., GYM001"
                  required
                  disabled={!!editStudent} // Can't change reg number when editing
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Membership Status</Form.Label>
                <Form.Select
                  name="membershipStatus"
                  value={form.membershipStatus}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              placeholder="Enter address"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Join Date</Form.Label>
                <Form.Control
                  type="date"
                  name="joinDate"
                  value={form.joinDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button type="submit" variant="primary">
              {editStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default StudentModal