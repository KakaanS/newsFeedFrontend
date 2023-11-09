// Tools
import React from "react";

// Content
import "./home.css";
import ArticleList from "./ArticleList";
import { useAuth } from "../../context/AuthCtx";

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { role } = useAuth() as any;

  console.log(role, "role");

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
