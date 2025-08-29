import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
     <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Welcome Back 👋</h2> 
                <p className="text-muted">
                  Login to your <strong>Inventory Management</strong> account
                </p>
              </div>

              <Form>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-3"
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="rounded-start-3"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePassword}
                      className="rounded-end-3"
                    >
                      {passwordVisible ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Remember Me" />
                  <a href="#" className="text-decoration-none text-primary">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-3 fw-semibold shadow-sm"
                >
                  Login
                </Button>
              </Form>

              {/* Divider */}
              <div className="text-center mt-4 mb-2">
                <span className="text-muted">Or continue with</span>
              </div>

              {/* Social Logins */}
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-dark" className="rounded-3 w-100">
                  Google
                </Button>
                <Button variant="outline-dark" className="rounded-3 w-100">
                  GitHub
                </Button>
              </div>

              {/* Register Redirect */}
              <p className="text-center mt-4 text-muted">
                Don’t have an account?{" "}
                <a href="/register" className="text-decoration-none text-primary fw-semibold">
                  Sign Up
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Login