import { Button, Container, Row, Col } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <Row>
          <Col>
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3">Page Not Found</h2>
            <p className="text-muted mb-4">
              Oops! The page you are looking for doesn’t exist or has been
              moved.
            </p>
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageNotFound;
