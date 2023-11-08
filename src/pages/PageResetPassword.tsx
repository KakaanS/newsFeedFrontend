import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ReseetPassword from "../components/reserPassword/ReseetPassword";

const PageResetPassword = () => {
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
          console.log("Created user", data);
        } else {
          console.error("Token Expired", response);
          navigate("/login");
        }
      } catch (error) {
        console.error(error, "Something went wrong");
        navigate("/login");
      }
    };
    checkResetPasswordToken();
  }, [navigate, location.pathname, resetPasswordToken]);

  return <ReseetPassword resetPasswordToken={resetPasswordToken} />;
};

export default PageResetPassword;
