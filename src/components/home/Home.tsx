// Tools
import React from "react";

// Content
import "./home.css";
import ArticleList from "./ArticleList";

const Home: React.FC = () => {
  return (
    <div className="homeContainer">
      <div className="newsfeed">
        <h1 className="title">The NewsFeed:</h1>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
