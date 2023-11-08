//Tools
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//Content
import { useAuth } from "../context/AuthCtx";
import AddArticle from "../components/admin/AddArticle";

const PageAdmin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;
  const [adminView, setAdminView] = useState("Admin Panel");
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const adminviewParam = searchParams.get("adminview");

  useEffect(() => {
    if (adminviewParam === "addnewarticle") {
      setAdminView("Add New Article");
    }
  }, [adminviewParam]);

  switch (adminView) {
    case "Admin Panel":
      return (
        <div className="adminPageContainer">
          {role === "admin" && <h1>admin components</h1>}
        </div>
      );
    case "Add New Article":
      return <AddArticle setAdminView={setAdminView} />;
    default:
      return <p>Something went wrong</p>;
  }
};

export default PageAdmin;
