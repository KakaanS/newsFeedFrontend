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
    try {
      const response = await fetch(
        "http://localhost:3000/api/identity/requestPasswordReset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Password reset email sent", data.message);
      } else {
        const errorData = await response.json();
        console.error("Password reset request failed:", errorData.message);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
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
