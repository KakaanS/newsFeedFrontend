import React, { useState } from "react";

interface ForgotPasswordProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ show, setShow }) => {
  const [email, setEmail] = useState("");

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
        },
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
    <div className="loginMasterContainer">
      <h1>Newsfee Forgot Password</h1>
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleForgotPassword}>
          <label>
            <p> Email:</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      </div>
      <button onClick={() => setShow(!show)}>Close</button>
    </div>
  );
};

export default ForgotPassword;
