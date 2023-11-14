import { useState } from "react";

import checkPassword from "../../utils/passwordCheck";
import openApi from "../../middleware/openApi";

import "../login/login.css";
import "./register.css";

interface RegisterProps {
  email: string;
  setRegisterView: React.Dispatch<React.SetStateAction<string>>;
  registerToken: string | null;
}

const Register: React.FC<RegisterProps> = ({
  email,
  registerToken,
  setRegisterView,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStongEnough, setPasswordStongEnough] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState<undefined | boolean>(
    undefined,
  );
  const [showErrorRegister, setShowErrorRegister] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };

    try {
      const response = await openApi.post("/identity/register", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerToken}`,
        },
      });

      if (response.status === 201) {
        const data = response.data;
        console.log("Created user", data);
        setRegisterView("User created");
      } else {
        console.error("Register failed", response);
        setShowErrorRegister(true);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
      setShowErrorRegister(true);
    }
  };
  const PasswordStrength = () => {
    if (passwordStongEnough === "Password ok") return;
    else return <p>{passwordStongEnough}</p>;
  };

  const PasswordMatch = () => {
    if (passwordMatch || passwordMatch === undefined) return;
    else return <p>Passwords do not match</p>;
  };

  const ErrorRegister = () => {
    if (showErrorRegister) return <p>Register failed</p>;
    else return;
  };

  return (
    <div className="loginMasterContainer">
      <h1>Newsfeed Register</h1>
      <div className="loginContainer">
        <form className="registerForm" onSubmit={handleRegister}>
          <label>
            <p>Email:</p>
            <input type="text" value={email} disabled />
          </label>
          <label>
            <p>Username:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <p>Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(e.target.value, setPasswordStongEnough);
              }}
            />
          </label>
          <PasswordStrength />
          <label>
            <p>Confirm Password:</p>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setPasswordMatch(password === e.target.value);
              }}
            />
          </label>
          <PasswordMatch />
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
          <ErrorRegister />
        </form>
      </div>
    </div>
  );
};

export default Register;
