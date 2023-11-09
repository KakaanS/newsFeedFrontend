// Tools
import { useAuth } from "../context/AuthCtx";

//Content
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";
import "../components/home/home.css";
interface AuthContextType {
  logout: () => void;
}

const PageHome = () => {
  const { logout } = useAuth() as AuthContextType;
  return (
    <div className="homePageContainer">
      <Navbar logout={logout} />
      <Home />
    </div>
  );
};

export default PageHome;
