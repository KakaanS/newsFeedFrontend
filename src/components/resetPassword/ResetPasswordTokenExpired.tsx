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
    <div className="loginMasterContainer">
      <h1>Newsfeed Reset Password</h1>
      <div className="loginContainer">
        <div className="registerTokenExpired">
          <p>Reset Password Link Expired to send new link go to login page </p>
          <button onClick={onClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordTokenExpired;
