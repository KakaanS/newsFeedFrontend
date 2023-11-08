import { useState } from "react";

import checkPassword from "../../utils/passwordCheck";

interface ResetPasswordProps {
  setResetPasswordView: React.Dispatch<React.SetStateAction<string>>;
  resetPasswordToken: string | null;
}

const ReseetPassword: React.FC<ResetPasswordProps> = ({
  resetPasswordToken,
  setResetPasswordView,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStongEnough, setPasswordStongEnough] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState<undefined | boolean>(
    undefined,
  );
  const [showErrorResetPassword, setShowErrorResetPassword] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/identity/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${resetPasswordToken}`,
          },
          body: JSON.stringify(userData),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Password Reset", data);
        setResetPasswordView("Password Reset Succeeded");
      } else {
        console.error("Reset Password failed", response);
        setShowErrorResetPassword(true);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
      setShowErrorResetPassword(true);
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

  const ErrorResetPassword = () => {
    if (showErrorResetPassword) return <p>Reset password failed</p>;
    else return;
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
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
          Reset Password
        </button>
        <ErrorResetPassword />
      </form>
    </div>
  );
};

export default ReseetPassword;
