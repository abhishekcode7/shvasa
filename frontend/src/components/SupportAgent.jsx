import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios"

const SupportAgent = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

    const agentData = {
      name: e.target.Name.value,
      email: e.target.Email.value,
      phone: e.target.Phone.value,
      desc: e.target.Description.value
    }

    axios.post("http://localhost:3000/api/support-agents",agentData)
    .then((response) => {
      console.log(response);
    })
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="abc@gmail.com" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" placeholder="10 digit code" pattern="[0-9]{10}" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SupportAgent;
