import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateTicket = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Topic</Form.Label>
          <Form.Control type="text" placeholder="Enter topic" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Desc" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date created</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Severity</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select Severity</option>
            <option value="1">low</option>
            <option value="2">medium</option>
            <option value="3">high</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select Type</option>
            <option value="1">Type A</option>
            <option value="2">Type B</option>
            <option value="3">Type C</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" placeholder="..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Status </Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Ticket Resolution Status</option>
            <option value="1">new</option>
            <option value="2">assigned</option>
            <option value="3">resolved</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Resolved On</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTicket;
