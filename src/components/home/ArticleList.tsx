import React from "react";
import axios from "axios";

interface Article {
  title: string;
  link: string;
  content: string;
  createdAt: Date;
}

interface Props {
  article: Article;
}

const ArticleComponent: React.FC<Props> = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <a href={article.link}>Watch on YouTube</a>
      <p>{article.createdAt.toLocaleString()}</p>
    </div>
  );
};

export default ArticleComponent;
