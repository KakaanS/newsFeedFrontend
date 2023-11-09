import React, { useEffect, useState } from "react";
import api from "../../middleware/api";

interface Article {
  id: string;
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
    <div className="articleItem">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <a href={article.link}>Watch on YouTube</a>
      <p>{article.createdAt && <p>{article.createdAt.toLocaleString()}</p>}</p>
    </div>
  );
};

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];

    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    api
      .get("/news/getAll", config)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <ArticleComponent key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
