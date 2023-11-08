//Tools
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Content
import { useAuth } from "../context/AuthCtx";
import AddArticle from "../components/admin/AddArticle";
import { useLocationContext } from "../context/LocationCtx";
import Navbar from "../components/navbar/Navbar";

interface LocationContextType {
  adminView: string;
  updateAdminView: (view: string) => void;
}
interface AuthContextType {
  logout: () => void;
}

const PageAdmin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;
  const { logout } = useAuth() as AuthContextType;
  const location = useLocation();
  const { adminView, updateAdminView } =
    useLocationContext() as LocationContextType;

  const searchParams = new URLSearchParams(location.search);
  const adminviewParam = searchParams.get("adminview");

  useEffect(() => {
    if (adminviewParam === "addnewarticle") {
      updateAdminView("Add New Article");
    } else {
      updateAdminView("Admin Panel");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminviewParam]);

  switch (adminView) {
    case "Admin Panel":
      return (
        <div className="adminPageContainer">
          <Navbar logout={logout} />
          {role === "admin" && <h1>admin components</h1>}
        </div>
      );
    case "Add New Article":
      return <AddArticle />;
    default:
      return <p>Something went wrong</p>;
  }
};

export default PageAdmin;
