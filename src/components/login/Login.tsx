// Tools
import React, { useState } from "react";

//Content
import ForgotPassword from "./ForgotPassword";

import "./login.css";
import { AuthContextType, useAuth } from "../../context/AuthCtx";
import openApi from "../../middleware/openApi";

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
      const { data, status } = await openApi.post("/identity/login", userData);
      if (status === 200) {
        login(data);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  switch (showForgotPassword) {
    case true:
      return (
        <ForgotPassword
          show={showForgotPassword}
          setShow={setShowForgotPassword}
        />
      );
    case false:
      return (
        <div className="loginMasterContainer">
          <h1>Newsfeed Login</h1>
          <div className="loginContainer">
            <form className="loginForm" onSubmit={handleLogin}>
              <label>
                <p> Email:</p>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <p> Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
          <button onClick={handleForgotPasswordClick}>Forgot Password</button>
        </div>
      );
  }
};

export default Login;
