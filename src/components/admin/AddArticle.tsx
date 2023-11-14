import React, { useState } from "react";
import api from "../../middleware/api";
import { useLocationContext } from "../../context/LocationCtx";
import "./admin.css";

interface LocationContextType {
  adminView: string;
  updateAdminView: (view: string) => void;
}

const AddArticle: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    content: "",
  });
  const { updateAdminView } = useLocationContext() as LocationContextType;

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
      const response = await api.post("/news/create", formData);
      if (response.status === 201) {
        updateAdminView("Admin Panel");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editUsersContainer">
      <h2>Add new article for site</h2>
      <form className="inviteFormContainer" onSubmit={handleSubmit}>
        <div className="inviteForm">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Link:
            <input
              type="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </label>
          <label>
            Content:
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Add new article</button>
        <button type="button" onClick={() => updateAdminView("Admin Panel")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
