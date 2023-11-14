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
  const linkExists = article.link !== "";
  console.log(article, "article");
  return (
    <div className="articleItem">
      <h2>{article.title}</h2>
      {linkExists ? (
        <iframe
          width="400"
          height="280"
          src={article.link}
          allowFullScreen
        ></iframe>
      ) : null}
      <p>{article.content}</p>
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
    getNews();
  }, []);

  return (
    <div className="feed">
      {articles.map((article) => (
        <ArticleComponent key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
