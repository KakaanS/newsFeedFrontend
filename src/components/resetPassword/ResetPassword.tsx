import { useState } from "react";

import checkPassword from "../../utils/passwordCheck";
import openApi from "../../middleware/openApi";

import "../register/register.css";
import "../login/login.css";

interface ResetPasswordProps {
  setResetPasswordView: React.Dispatch<React.SetStateAction<string>>;
  resetPasswordToken: string | null;
  email: string | null;
}

const ReseetPassword: React.FC<ResetPasswordProps> = ({
  resetPasswordToken,
  setResetPasswordView,
  email,
}) => {
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
      password,
    };
    console.log("resetPasswordToken", resetPasswordToken);
    try {
      const response = await openApi.put("/identity/resetPassword", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetPasswordToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
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
    <div className="loginMasterContainer">
      <h1>Newsfeed Reset Password</h1>
      <div className="loginContainer">
        <form className="registerForm" onSubmit={handleResetPassword}>
          <label>
            <p>Email: </p>
            <input type="text" value={email as string} disabled />
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
            <p> Confirm Password:</p>
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
      <button onClick={() => setResetPasswordView("Login")}>Close</button>
    </div>
  );
};

export default ReseetPassword;
