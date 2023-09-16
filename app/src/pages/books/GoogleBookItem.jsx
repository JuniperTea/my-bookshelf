import React, { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Tooltip } from "@mui/material";
import { commonPostJson } from "../../shared/utils/api-helper.js";
import defaultBook from "../../shared/decorations/favicon.ico";
import PropTypes from "prop-types";

export default function GoogleBookItem({ data }) {
  const [saved, setSaved] = useState(false);
  const { id = "" } = data;
  const {
    title = "",
    description = "",
    authors = [],
    categories = [],
    industryIdentifiers = [],
    language = "",
    pageCount = 0,
    printType = "",
    publisher = "",
    publishedDate = "",
    maturityRating = "",
  } = data.volumeInfo;
  const { smallThumbnail = "" } = data.volumeInfo?.imageLinks;

  const handleClick = () => {
    let saveBook = {
      title,
      description,
      authors,
      categories,
      language,
      pageCount,
      printType,
      publisher,
      publishedDate,
      maturityRating,
      smallThumbnail,
      id,
      industryIdentifiers,
    };
    commonPostJson("/books", saveBook).catch(e => {
      console.log(e);
    });
    setSaved(true);
  };
  return (
    <div>
      <span className="book-item-container">
        {smallThumbnail ? (
          <img src={smallThumbnail} alt="temporary alt" />
        ) : (
          <img src={defaultBook} alt="default book" />
        )}
        <span className="book-title">{title}</span>
        <span className="book-author">
          {authors.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </span>
        <span className="book-description-list">{description}</span>

        <span>
          Options
          <div>
            <Tooltip title="Save Local">
              {!saved ? (
                <SaveAltIcon fontSize="small" onClick={handleClick} />
              ) : (
                <div>Saved</div>
              )}
            </Tooltip>
          </div>
        </span>
      </span>
    </div>
  );
}

GoogleBookItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
  printType: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  maturityRating: PropTypes.string.isRequired,
  smallThumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  industryIdentifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

GoogleBookItem.defaultProps = {
  title: "",
  description: "",
  authors: [],
  categories: [],
  language: "",
  pageCount: 0,
  printType: "",
  publisher: "",
  publishedDate: "",
  maturityRating: "",
  smallThumbnail: "",
  id: "",
  industryIdentifiers: [],
};
