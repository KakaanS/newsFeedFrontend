import React, { useState } from "react";
import api from "../../middleware/api";

interface AddArticleProps {
  setAdminView: (view: string) => void;
}

const AddArticle: React.FC<AddArticleProps> = ({ setAdminView }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    content: "",
  });

  const accessToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split("=")[1];

  setAdminView("Add New Article");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("submitting MF");

      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      };

      const response = await api.post("/news/create", formData, { headers });
      console.log("API RESPONSE", response);
      if (response.status === 201) {
        setAdminView("Admin Panel");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add new article for site</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="link">Link</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Add new article</button>
        <button type="button" onClick={() => setAdminView("Admin Panel")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
