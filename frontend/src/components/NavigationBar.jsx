import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
const NavigationBar = () => {
  return (
    <div>
      <Navbar  bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/agent">Shvasa</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/agent">Create Agent</Nav.Link>
            <Nav.Link href="/ticket">Create Ticket</Nav.Link>
            <Nav.Link href="#pricing">View Tickets</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar