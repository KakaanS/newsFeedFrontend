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
    <div className="loginMasterContainer">
      <h1>Newsfeed Reset Password</h1>
      <div className="loginContainer">
        <div className="registerTokenExpired">
          <p>Reset Password Succeeded</p>
          <button onClick={onClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSucceeded;
