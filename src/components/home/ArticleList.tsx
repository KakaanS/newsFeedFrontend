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
      <iframe
        width="700"
        height="450"
        src={article.link}
        allowFullScreen
      ></iframe>
      <p>{article.content}</p>
      <p>{article.createdAt && <p>{article.createdAt.toLocaleString()}</p>}</p>
    </div>
  );
};

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const getNews = async () => {
    await api
      .get("/news/getAll")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  };

  useEffect(() => {
    console.log("fetching news");
    getNews();
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
