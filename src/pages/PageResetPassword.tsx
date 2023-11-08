import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ReseetPassword from "../components/resetPassword/ResetPassword";
import ResetPasswordTokenExpired from "../components/resetPassword/ResetPasswordTokenExpired";
import ResetPasswordSucceeded from "../components/resetPassword/ResetPasswordSucceeded";

const PageResetPassword = () => {
  const [resetPasswordView, setResetPasswordView] = useState("resetPassword");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  useEffect(() => {
    if (!resetPasswordToken) {
      navigate("/login");
    }
    const checkResetPasswordToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/identity/verifyResetPasswordToken",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${resetPasswordToken}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Token valid", data);
        } else {
          console.error("Token Expired", response);
          setResetPasswordView("Token Expired");
        }
      } catch (error) {
        console.error(error, "Something went wrong");
        navigate("/login");
      }
    };
    checkResetPasswordToken();
  }, [navigate, location.pathname, resetPasswordToken]);

  switch (resetPasswordView) {
    case "resetPassword":
      return (
        <ReseetPassword
          setResetPasswordView={setResetPasswordView}
          resetPasswordToken={resetPasswordToken}
        />
      );
    case "Password Reset Succeeded":
      return (
        <ResetPasswordSucceeded setResetPasswordView={setResetPasswordView} />
      );
    case "Token Expired":
      return (
        <ResetPasswordTokenExpired
          setResetPasswordView={setResetPasswordView}
        />
      );
    default:
      return (
        <ResetPasswordTokenExpired
          setResetPasswordView={setResetPasswordView}
        />
      );
  }
};

export default PageResetPassword;
