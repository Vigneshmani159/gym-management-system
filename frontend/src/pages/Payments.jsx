import React, { useState, useEffect } from 'react'
import { Container, Card, Table, Button, Badge } from 'react-bootstrap'
import axios from 'axios'
import PaymentModal from '../components/PaymentModal'

const API = 'http://localhost:8080'

function Payments() {
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editPayment, setEditPayment] = useState(null)

  useEffect(() => { loadPayments() }, [])

  const loadPayments = async () => {
    const res = await axios.get(`${API}/payments`)
    setPayments(res.data.sort((a, b) => b.id - a.id))
  }

  const handleSave = async (form) => {
    try {
      if (editPayment) {
        await axios.put(`${API}/payments/${editPayment.id}`, form)
      } else {
        await axios.post(`${API}/payments`, form)
      }
      loadPayments()
      setShowModal(false)
      setEditPayment(null)
      alert('Payment saved! Student expiry date has been updated automatically.')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment?')) {
      await axios.delete(`${API}/payments/${id}`)
      loadPayments()
    }
  }

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>💳 Payments</h4>
        <Button variant="success" onClick={() => { setEditPayment(null); setShowModal(true) }}>
          + Add Payment
        </Button>
      </div>

      <Card className="shadow">
        <Card.Body>
          <Table hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Reg No</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td><small>{p.tokenNumber}</small></td>
                  <td>{p.studentName}</td>
                  <td>{p.registerNumber}</td>
                  <td>{p.paymentDate}</td>
                  <td>{p.duration} Month(s)</td>
                  <td><strong>₹{p.amount}</strong></td>
                  <td>
                    <Badge bg={p.paymentMethod === 'Cash' ? 'success' : 'primary'}>
                      {p.paymentMethod}
                    </Badge>
                  </td>
                  <td>
                    <Button size="sm" variant="warning" className="me-1"
                      onClick={() => { setEditPayment(p); setShowModal(true) }}>
                      ✏️
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <PaymentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        editPayment={editPayment}
      />
    </Container>
  )
}

export default Payments