import { useNavigate } from "react-router-dom";

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
    <div>
      <div>Register Link Expired please ask Admin for a new link </div>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default RegisterTokenExpired;
