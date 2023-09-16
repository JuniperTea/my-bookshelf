import React from "react";

export default function RecommendItem({ data }) {
  let { title, description, smallThumbnail } = data;

  return (
    <div>
      <div className="book-item-container">
        <img src={smallThumbnail} alt="temporary alt" />
        <span>{title}</span>
        <span className="book-description-general "> {description}</span>
      </div>
    </div>
  );
}
