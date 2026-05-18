import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'

function PaymentModal({ show, onHide, onSave, editPayment }) {
  const [form, setForm] = useState({
    studentName: '',
    registerNumber: '',
    paymentDate: new Date().toISOString().split('T')[0], // Today's date
    duration: 1,
    amount: '',
    paymentMethod: 'Cash',
  })

  useEffect(() => {
    if (editPayment) {
      setForm(editPayment)
    } else {
      setForm({
        studentName: '',
        registerNumber: '',
        paymentDate: new Date().toISOString().split('T')[0],
        duration: 1,
        amount: '',
        paymentMethod: 'Cash',
      })
    }
  }, [editPayment, show])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editPayment ? 'Edit Payment' : 'Add Payment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Student Name *</Form.Label>
                <Form.Control
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Register Number *</Form.Label>
                <Form.Control
                  name="registerNumber"
                  value={form.registerNumber}
                  onChange={handleChange}
                  placeholder="e.g., GYM001"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration (Months)</Form.Label>
                <Form.Select name="duration" value={form.duration} onChange={handleChange}>
                  <option value={1}>1 Month</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount (₹) *</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g., 1500"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button type="submit" variant="success">
              {editPayment ? 'Update Payment' : 'Add Payment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PaymentModal