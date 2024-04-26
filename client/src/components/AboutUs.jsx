import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="about-us-container">
      <h1>About Us</h1>
      <Row>
        <Col md={6} className="about-us-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
          <p>Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.</p>
        </Col>
        <Col md={6}>
          <img src="/images/about-us-image.jpg" alt="About Us" className="about-us-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
