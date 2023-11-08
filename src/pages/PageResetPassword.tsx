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
  }, [navigate, location.pathname, resetPasswordToken]);

  return <ReseetPassword resetPasswordToken={resetPasswordToken} />;
};

export default PageResetPassword;
