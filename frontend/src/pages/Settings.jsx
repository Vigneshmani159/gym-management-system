import React, { useState } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'

function Settings() {
  const [gymName, setGymName] = useState(
    localStorage.getItem('gymName') || 'GYM PRO'
  )
  const [darkMode, setDarkMode] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveGymName = () => {
    localStorage.setItem('gymName', gymName)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Container fluid className="p-4">
      <h4 className="mb-4">⚙️ Settings</h4>

      <Row>
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header><strong>🏋️ Gym Details</strong></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Gym Name</Form.Label>
                <Form.Control
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  placeholder="Enter gym name"
                />
              </Form.Group>
              <Button
                variant={saved ? 'success' : 'primary'}
                onClick={handleSaveGymName}
              >
                {saved ? '✅ Saved!' : 'Save Gym Name'}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header><strong>🎨 Appearance</strong></Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Dark Mode</Form.Label>
                <div>
                  <Form.Check
                    type="switch"
                    label={darkMode ? 'Dark Mode ON' : 'Dark Mode OFF'}
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                </div>
                <small className="text-muted">
                  (Full dark mode implementation requires additional CSS setup)
                </small>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Header><strong>ℹ️ App Info</strong></Card.Header>
        <Card.Body>
          <p><strong>Application:</strong> Gym Management System</p>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Frontend:</strong> React + Vite + React Bootstrap</p>
          <p><strong>Backend:</strong> Spring Boot + MySQL</p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Settings