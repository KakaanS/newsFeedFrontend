import { useState } from "react";

import commonPasswords from "../../data/commonPasswors.json";

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

  const checkPassword = (password: string) => {
    const passwordToCheck = password.toLowerCase();
    passwordToCheck.replace(/[^a-zA-Z0-9\s]/g, "");

    if (commonPasswords.includes(passwordToCheck)) {
      setPasswordStongEnough("Password to common");
      return;
    }

    if (password.length < 10) {
      setPasswordStongEnough("Password to short");
      return;
    }

    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\]/;

    if (
      !hasUppercase.test(password) ||
      !hasLowercase.test(password) ||
      !hasNumber.test(password) ||
      !hasSpecialChar.test(password)
    ) {
      setPasswordStongEnough(
        "Password must contain at least one uppercase, one lowercase, one number and one special character",
      );
      return;
    }
    setPasswordStongEnough("Password ok");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      username,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/identity/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${registerToken}`,
          },
          body: JSON.stringify(userData),
        },
      );
      if (response.ok) {
        const data = await response.json();
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
              checkPassword(e.target.value);
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
