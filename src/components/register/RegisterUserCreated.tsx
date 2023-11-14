import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setRegisterView: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterUserCreated: React.FC<RegisterProps> = ({ setRegisterView }) => {
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
          <p>Register User Created</p>
          <button onClick={onClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserCreated;
