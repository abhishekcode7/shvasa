import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios"
const CreateTicket = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const ticketData = {
      topic: e.target.topic.value,
      description: e.target.desc.value,
      dateCreated: e.target.dateCreated.value,
      severity: e.target.severity.value,
      type: e.target.type.value,
      status: e.target.status.value
    }

    axios.post("http://localhost:3000/api/support-tickets",ticketData)
    .then((response) => {
      console.log(response)
      alert("Successfully created Ticket!")
    })
    .catch((error)=>{
      console.log(error)
      alert("Something went wrong! Please try again.")
    })
  };

  return (
    <div className="px-4 py-4" >
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="topic">
          <Form.Label>Topic</Form.Label>
          <Form.Control type="text" placeholder="Enter topic" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Desc" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dateCreated">
          <Form.Label>Date created</Form.Label>
          <Form.Control type="date" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="severity">
          <Form.Label>Severity</Form.Label>
          <Form.Select aria-label="Default select example" required>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Select aria-label="Default select example" required>
            <option value="A">Type A</option>
            <option value="B">Type B</option>
            <option value="C">Type C</option>
          </Form.Select>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="assignedTo">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" placeholder="Enter Agent Name" />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status </Form.Label>
          <Form.Control type="text" value="new" disabled/>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="resolvedOn">
          <Form.Label>Resolved On</Form.Label>
          <Form.Control type="date" />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Create New Ticket
        </Button>
      </Form>
    </div>
  );
};

export default CreateTicket;
