import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import {
  Speedometer2,
  BoxSeam,
  Receipt,
  People,
  PersonCircle
} from "react-bootstrap-icons";

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  // Sample user data - you can replace this with actual user data from your app state
  const userName = "John Doe";

  return (
    <>
      <Container fluid className="p-0">
        {/* Top Navigation Bar */}
        <Navbar bg="transparent" expand="lg" className=" border-bottom shadow-sm">
          <Container fluid>
            {/* Left side: Text Logo */}
            <Navbar.Brand href="/dashboard" className="fw-bold fs-3 text-primary">
              InventPro
            </Navbar.Brand>
            
            {/* Right side: Profile with user name */}
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="d-flex align-items-center">
                <PersonCircle className="me-2" size={24} />
                <span className="fw-medium">{userName}</span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row>
          {/* Sidebar */}
          <Col
            md={2}
            className="bg-transparent vh-100 d-flex flex-column p-3 position-fixed shadow-sm z-index-1"
            style={{ minWidth: "220px", top: "56px" }} // Adjust top to account for navbar height
          >
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-dark mb-2 d-flex align-items-center p-3 rounded">
                <Speedometer2 className="me-2" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/products" className="text-dark mb-2 d-flex align-items-center p-3 rounded">
                <BoxSeam className="me-2" /> Products
              </Nav.Link>
              <Nav.Link href="/invoices" className="text-dark mb-2 d-flex align-items-center p-3 rounded">
                <Receipt className="me-2" /> Invoices
              </Nav.Link>
              <Nav.Link href="/customers" className="text-dark mb-2 d-flex align-items-center p-3 rounded">
                <People className="me-2" /> Customers
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={{ span: 10, offset: 2 }} className="p-4" style={{ marginTop: "56px" }}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard