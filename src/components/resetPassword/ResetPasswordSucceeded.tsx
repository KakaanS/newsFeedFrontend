import { useNavigate } from "react-router-dom";

interface ResetPasswordProps {
  setResetPasswordView: React.Dispatch<React.SetStateAction<string>>;
}

const ResetPasswordSucceeded: React.FC<ResetPasswordProps> = ({
  setResetPasswordView,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    setResetPasswordView("Something went wrong");
    navigate("/login");
  };
  return (
    <div>
      <div>Password reset succeeded</div>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default ResetPasswordSucceeded;
