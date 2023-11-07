// Tools
import { useAuth } from "../context/AuthCtx";

//Content
import Home from "../components/home/Home";
interface AuthContextType {
  logout: () => void;
}

const PageHome = () => {
  const { logout } = useAuth() as AuthContextType;
  return (
    <>
      <Home logout={logout} />
    </>
  );
};

export default PageHome;
