import React from "react";
import PropTypes from "prop-types";

export default function ReadingPopup({ setIsOpen, data }) {
  let {
    _id,
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
    industryIdentifiers,
    id,
  } = data;

  function closeHandler() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="popupContainer">
        <div className="popupBody">
          <div className="popupHeader">
            <h5>Tombstone</h5>
          </div>
          <div className="reading-item">
            <span>
              <img src={smallThumbnail} alt="temporary alt" />
            </span>
            <div>Authors: {title}</div>
            <div>Authors: {authors}</div>
            <div>Publisher: {publisher}</div>
            <div>Publish Date: {publishedDate}</div>
            <div>Language: {language}</div>
            <div>Pages: {pageCount}</div>
            <div>Format: {printType}</div>
            <div>Maturity Rating: {maturityRating}</div>
            <div>ISBN: {industryIdentifiers}</div>
            <div>Categories: {categories}</div>
          </div>
          <div>
            <button onClick={closeHandler}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

ReadingPopup.propTypes = {
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

ReadingPopup.defaultProps = {
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
