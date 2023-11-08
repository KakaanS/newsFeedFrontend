import React from "react";

interface AddArticleProps {
  setAdminView: (view: string) => void;
}

const AddArticle: React.FC<AddArticleProps> = ({ setAdminView }) => {
  return (
    <div>
      <h1>Add Article</h1>
    </div>
  );
};

export default AddArticle;
