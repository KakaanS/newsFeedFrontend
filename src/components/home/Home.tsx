import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ArticleList from "./ArticleList";

interface HomeProps {
  logout: () => void;
}

const Home: React.FC<HomeProps> = ({ logout }) => {
  const navigate = useNavigate();

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
        <button onClick={navigateAdmin} className="sidebarBtn">
          Admin Panel
        </button>
        <button onClick={navigateAddNewArticle} className="sidebarBtn">
          Add new article
        </button>
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
