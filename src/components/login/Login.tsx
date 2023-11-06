// Tools
import React, { useState } from "react";

//Utils
import ForgotPassword from "./ForgotPassword";
import { useAuth, LoginData } from "../../context/AuthCtx";

interface AuthContextType {
  login: (data: LoginData) => void;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth() as AuthContextType;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/identity/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        login(data);
        console.log("login successful", data);
      } else {
        console.error("login failed");
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleForgotPasswordClick}>Forgot Password</button>
      <ForgotPassword
        show={showForgotPassword}
        setShow={setShowForgotPassword}
      />
    </div>
  );
};

export default Login;
