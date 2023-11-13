import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Register from "../components/register/Register";
import RegisterUserCreated from "../components/register/RegisterUserCreated";
import RegisterTokenExpired from "../components/register/RegisterTokenExpired";

const PageRegister = () => {
  const [registerView, setRegisterView] = useState("register");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const registerTokenParam = searchParams.get("registerToken");
  const emailParam = searchParams.get("email") as string;

  useEffect(() => {
    if (!registerTokenParam || !emailParam) {
      navigate("/login");
    }
    const checkRegisterToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/identity/verifyRegisterToken",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${registerTokenParam}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Created user", data);
        } else {
          console.error("Token Expired", response);
          setRegisterView("Token Expired");
        }
      } catch (error) {
        console.error(error, "Something went wrong");
        setRegisterView("Something went wrong");
      }
    };
    checkRegisterToken();
  }, [navigate, registerTokenParam, emailParam]);

  switch (registerView) {
    case "register":
      return (
        <Register
          email={emailParam}
          setRegisterView={setRegisterView}
          registerToken={registerTokenParam}
        />
      );
    case "User created":
      return <RegisterUserCreated setRegisterView={setRegisterView} />;
    case "Token Expired":
      return <RegisterTokenExpired setRegisterView={setRegisterView} />;
    default:
      return <p>Something went wrong</p>;
  }
};

export default PageRegister;
