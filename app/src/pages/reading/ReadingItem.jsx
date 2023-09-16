import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import ReadingPopup from "./ReadingPopup.jsx";

export default function ReadingItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [passingData, setPassingData] = useState([data]);

  let { title, printType, pageCount, authors, smallThumbnail } = data;

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <div>
      <span className="book-item-container">
        <img src={smallThumbnail} alt="temporary alt" />
        <span className="book-title">{title}</span>
        <span className="book-author">
          {authors.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </span>
        <Tooltip title="Click for full information">
          <span className="book-description-list" onClick={handleClick}>
            {printType} - {pageCount}
          </span>
        </Tooltip>
      </span>
      {isOpen && <ReadingPopup setIsOpen={setIsOpen} data={data} />}
    </div>
  );
}
