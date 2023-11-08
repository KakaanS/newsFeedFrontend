//Tools
import { useNavigate } from "react-router-dom";

//Content
import "./Navbar.css";
import { useAuth } from "../../context/AuthCtx";

interface NavbarProps {
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logout }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;

  const navigateHome = () => {
    navigate("/");
  };

  const navigateAdmin = () => {
    navigate("/adminpanel");
  };
  const navigateAddNewArticle = () => {
    navigate("/adminpanel?adminview=addnewarticle");
  };

  return (
    <div className="sidebar">
      <button onClick={navigateHome} className="sidebarBtn">
        Home
      </button>
      {role === "admin" && (
        <button onClick={navigateAdmin} className="sidebarBtn">
          Admin Panel
        </button>
      )}
      {role === "admin" && (
        <button onClick={navigateAddNewArticle} className="sidebarBtn">
          Add new article
        </button>
      )}
      <button onClick={logout} className="sidebarBtn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
