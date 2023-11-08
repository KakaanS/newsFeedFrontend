//Tools
import { useNavigate } from "react-router-dom";

//Content
import "./Navbar.css";
import { useAuth } from "../../context/AuthCtx";
import { useLocationContext } from "../../context/LocationCtx";

interface NavbarProps {
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logout }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { adminView, currentView } = useLocationContext() as any;

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
      <button
        onClick={navigateHome}
        className={`sidebarBtn ${
          currentView === "Home" ? "active-button" : ""
        }`}
      >
        Home
      </button>
      {role === "admin" && (
        <button
          onClick={navigateAdmin}
          className={`sidebarBtn ${
            currentView === "Admin Panel" ? "active-button" : ""
          }`}
        >
          Admin Panel
        </button>
      )}
      {role === "admin" && (
        <button
          onClick={navigateAddNewArticle}
          className={`sidebarBtn ${
            currentView === "Add New Article" ? "active-button" : ""
          }`}
        >
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
