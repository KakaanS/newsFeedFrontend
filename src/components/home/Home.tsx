import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ArticleComponent from "./newsFeed";

interface HomeProps {
  logout: () => void;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate = useNavigate();

const Home: React.FC<HomeProps> = ({ logout }) => {
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
        <ArticleComponent article={undefined} />
      </div>
    </div>
  );
};

export default Home;
