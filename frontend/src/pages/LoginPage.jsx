import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh

    // Simple hardcoded login — in real apps you'd call an API
    if (email === 'admin@gym.com' && password === 'admin123') {
      onLogin() // Tell App.jsx we're logged in
    } else {
      setError('Wrong email or password. Try: admin@gym.com / admin123')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                {/* Logo / Title */}
                <div className="text-center mb-4">
                  <h2 style={{ color: '#e94560' }}>💪 GYM PRO</h2>
                  <p className="text-muted">Admin Login</p>
                </div>

                {/* Error message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="admin@gym.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{ backgroundColor: '#e94560', border: 'none' }}
                  >
                    Login
                  </Button>
                </Form>

                <p className="text-center text-muted mt-3" style={{ fontSize: '12px' }}>
                  Default: admin@gym.com / admin123
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage