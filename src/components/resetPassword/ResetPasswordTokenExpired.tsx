import { useNavigate } from "react-router-dom";

interface ResetPasswordProps {
  setResetPasswordView: React.Dispatch<React.SetStateAction<string>>;
}

const ResetPasswordTokenExpired: React.FC<ResetPasswordProps> = ({
  setResetPasswordView,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    setResetPasswordView("Something went wrong");
    navigate("/login");
  };
  return (
    <div>
      <div>Reset Password Link Expired to send new link go to login page </div>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default ResetPasswordTokenExpired;
