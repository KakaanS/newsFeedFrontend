import { useNavigate } from "react-router-dom";

import "../login/login.css";
import "./register.css";

interface RegisterProps {
  setRegisterView: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterTokenExpired: React.FC<RegisterProps> = ({ setRegisterView }) => {
  const navigate = useNavigate();

  const onClick = () => {
    setRegisterView("Something went wrong");
    navigate("/login");
  };
  return (
    <div className="loginMasterContainer">
      <h1>Newsfeed Register</h1>
      <div className="loginContainer">
        <div className="registerTokenExpired">
          <p>Register Link Expired please ask Admin for a new link </p>
          <button onClick={onClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterTokenExpired;
