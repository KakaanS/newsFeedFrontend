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
    <div>
      <div>Register User Created</div>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default RegisterUserCreated;
