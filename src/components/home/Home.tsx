// Tools
import React from "react";
import { useNavigate } from "react-router-dom";

// Content
import "./Home.css";
import ArticleList from "./ArticleList";
import { useAuth } from "../../context/AuthCtx";

interface HomeProps {
  logout: () => void;
}

const Home: React.FC<HomeProps> = ({ logout }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;
  const navigate = useNavigate();

  console.log(role, "role");
  const navigateHome = () => {
    navigate("/");
  };

  const navigateAdmin = () => {
    navigate("/admin");
  };
  const navigateAddNewArticle = () => {
    navigate("/addNewArticle");
  };

  return (
    <div className="homeContainer">
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
      <div className="newsfeed">
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
