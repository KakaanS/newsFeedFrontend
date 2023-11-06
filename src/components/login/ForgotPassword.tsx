import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface ForgotPasswordProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShow(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
    };
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleForgotPassword}>
        <Modal.Header>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll send you an email to reset your password.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Send
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ForgotPassword;
