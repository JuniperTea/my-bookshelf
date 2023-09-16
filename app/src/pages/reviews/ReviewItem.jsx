import React from "react";

//this displays 1 review item.
export default function ReviewItem({ data }) {
  let { smallThumbnail, title, review, dateOfReview } = data;

  return (
    <div>
      <div className="reading-item-line">
        <div>
          <img
            src={smallThumbnail}
            alt="temporary alt"
            className="book-image-small"
          />
          <span className="book-title">{title}</span>
          <span>{review}</span>
          <span>{dateOfReview}</span>
        </div>
      </div>
    </div>
  );
}
