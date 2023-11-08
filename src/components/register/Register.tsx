import { useState } from "react";

import checkPassword from "../../utils/passwordCheck";
import api from "../../middleware/api";
interface RegisterProps {
  setRegisterView: React.Dispatch<React.SetStateAction<string>>;
  registerToken: string | null;
}

const Register: React.FC<RegisterProps> = ({
  registerToken,
  setRegisterView,
}) => {
  const [email, setEmail] = useState("");
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
      email,
      username,
      password,
    };

    try {
      const response = await api.post("/identity/register", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerToken}`,
        },
      });

      if (response.status === 200) {
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
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
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
          Confirm Password:
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
  );
};

export default Register;
