import React, { useState } from 'react'
import { Container, Card, Row, Col, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

function Attendance() {
  const [input, setInput] = useState('')    // Register number typed so far
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('info')

  // When a keypad button is pressed
  const handleKey = (key) => {
    setInput((prev) => prev + key)
  }

  const handleClear = () => {
    setInput('')
    setMessage(null)
  }

  const handleSubmit = async () => {
    if (!input) {
      setMessage('Please enter a register number')
      setMessageType('warning')
      return
    }

    try {
      const res = await axios.post(`${API}/attendance`, {
        registerNumber: input,
      })

      if (res.data.success) {
        setMessage(`✅ Attendance marked for ${res.data.studentName}`)
        setMessageType('success')
      } else {
        setMessage(`❌ ${res.data.message}`)
        setMessageType('danger')
      }
    } catch (err) {
      setMessage('Error connecting to server')
      setMessageType('danger')
    }

    setInput('') // Clear input after submit
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'GYM', '0', '←']

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">✅ Mark Attendance</h4>

      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Header className="text-center">
              <strong>🔢 Enter Register Number</strong>
            </Card.Header>
            <Card.Body>
              {/* Display Input */}
              <div
                className="text-center mb-3 p-3 rounded"
                style={{
                  backgroundColor: '#f8f9fa',
                  fontSize: '24px',
                  letterSpacing: '4px',
                  minHeight: '60px',
                  border: '2px solid #dee2e6',
                  fontWeight: 'bold',
                }}
              >
                {input || <span style={{ color: '#ccc' }}>_ _ _ _ _</span>}
              </div>

              {/* Message Alert */}
              {message && (
                <Alert variant={messageType} className="text-center">
                  {message}
                </Alert>
              )}

              {/* Keypad Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                {keys.map((key) => (
                  <Button
                    key={key}
                    variant={key === '←' ? 'danger' : 'outline-secondary'}
                    style={{ height: '55px', fontSize: '18px', fontWeight: 'bold' }}
                    onClick={() => {
                      if (key === '←') {
                        setInput((prev) => prev.slice(0, -1)) // Backspace
                      } else {
                        handleKey(key)
                      }
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <Button variant="secondary" className="flex-grow-1" onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  variant="success"
                  className="flex-grow-1"
                  onClick={handleSubmit}
                  style={{ fontSize: '16px' }}
                >
                  ✅ Mark Attendance
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Attendance