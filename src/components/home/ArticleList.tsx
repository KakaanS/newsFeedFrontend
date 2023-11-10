import React, { useEffect, useState } from "react";
import api from "../../middleware/api";
import { useAuth } from "../../context/AuthCtx";

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
  const { accessToken, validToken } = useAuth() as {
    accessToken: string;
    validToken: boolean;
  };

  useEffect(() => {
    console.log("validToken", validToken);
    if (!validToken) return;
    const getNews = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      await api
        .get("/news/getAll", config)
        .then((response) => {
          setArticles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching articles", error);
        });
    };
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validToken]);

  return (
    <div>
      {articles.map((article) => (
        <ArticleComponent key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
