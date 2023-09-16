import React, { useState } from "react";
import {
  commonDeleteJson,
  commonPostJson,
} from "../../shared/utils/api-helper";
import RecommendSharpIcon from "@mui/icons-material/RecommendSharp";
import { useNavigate } from "react-router-dom";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { Tooltip } from "@mui/material";
import Popup from "./Popup";

export default function LocalBookItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recommended, setRecommended] = useState(false);
  let { _id, title, description, authors, smallThumbnail } = data;
  const navigate = useNavigate();

  function handleClick() {
    setIsOpen(true);
  }

  //Delete Book
  function deleteBook() {
    if (window.confirm("you sure?")) {
      commonDeleteJson("/books/" + _id).catch(e => console.log(e));
      navigate("/dashboard");
    }
  }

  function recommendBook() {
    let saveRec = { _id, title, description, authors, smallThumbnail };
    setRecommended(true);
    commonPostJson("/recommendations", saveRec).catch(e => console.log(e));
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
            {description}
          </span>
        </Tooltip>
        <span>
          Options
          <div>
            <Tooltip title={recommended ? "Already Recommended" : "Recommend"}>
              <RecommendSharpIcon fontSize="small" onClick={recommendBook} />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteForeverSharpIcon fontSize="small" onClick={deleteBook} />
            </Tooltip>
          </div>
        </span>
        {isOpen && <Popup setIsOpen={setIsOpen} data={data} />}
      </span>
    </div>
  );
}
