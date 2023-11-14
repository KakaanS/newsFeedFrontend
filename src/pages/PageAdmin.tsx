//Tools
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Content
import { useAuth } from "../context/AuthCtx";
import AddArticle from "../components/admin/AddArticle";
import InviteUsers from "../components/admin/InviteUser";
import EditUsers from "../components/admin/EditUsers";
import { useLocationContext } from "../context/LocationCtx";
import Navbar from "../components/navbar/Navbar";
import "../components/admin/admin.css";

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

  const [updateUsers, setUpdateUsers] = useState(false);

  const handleUpdateUsers = () => {
    setUpdateUsers(!updateUsers);
  };

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
          <div className="adminContainer">
            <div className="titleContainer">
              <h1>Admin Panel</h1>
            </div>
            {role === "admin" && (
              <InviteUsers handleUpdateUsers={handleUpdateUsers} />
            )}
            {role === "admin" && (
              <EditUsers
                updateUsers={updateUsers}
                handleUpdateUsers={handleUpdateUsers}
              />
            )}
          </div>
        </div>
      );
    case "Add New Article":
      return (
        <div className="adminPageContainer">
          <Navbar logout={logout} />
          <div className="adminContainer">
            <div className="titleContainer">
              <h1>Admin Panel</h1>
            </div>
            {role === "admin" && <AddArticle />}
          </div>
        </div>
      );
    default:
      return <p>Something went wrong</p>;
  }
};

export default PageAdmin;
