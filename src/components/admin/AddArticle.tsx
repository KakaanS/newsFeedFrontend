import React from "react";

interface AddArticleProps {
  setAdminView: (view: string) => void;
}

const AddArticle: React.FC<AddArticleProps> = ({ setAdminView }) => {
  setAdminView("Add New Article");

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div>
      <h1>Add new article for site</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} />
        <label htmlFor="link">Link</label>
        <input type="text" name="link" value={link} />
        <label htmlFor="content">Content</label>
        <input type="text" name="content" value={content} />
      </form>
      <button type="submit">Add new article</button>
    </div>
  );
};

export default AddArticle;
