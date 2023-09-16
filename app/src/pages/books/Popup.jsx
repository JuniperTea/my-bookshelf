import React, { useState } from "react";
import {
  commonPostJson,
  commonDeleteJson,
} from "../../shared/utils/api-helper";
import PropTypes from "prop-types";

export default function Popup({ setIsOpen, data }) {
  const [currentlyReading, setCurrentlyReading] = useState(false);
  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState(false);

  let {
    _id, //book main id
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

  //closes the popup, saves the currently reading value
  function closeHandler() {
    if (currentlyReading === true) {
      let saveCR = {
        _id, //bookID
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
      };
      commonPostJson("/current", saveCR)
        .then(response => {
          if (response.success) {
            console.log("successfully saved current reading");
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      commonDeleteJson("/current/" + _id).catch(e => console.log(e));
    }
    setIsOpen(false);
  }

  //changes state of currently reading
  function checkHandler() {
    setCurrentlyReading(!currentlyReading);
  }

  //when review is posted, this saves it to database
  function handleSubmit() {
    if (review !== null && review !== "") {
      let saveReview = {
        _id, //book id
        review,
        title,
        authors,
        smallThumbnail,
        pageCount,
      };
      commonPostJson("/reviews", saveReview)
        .then(response => {
          if (response.success) {
            setSavedReview(true);
            console.log("successfully saved review");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  return (
    <>
      <div className="popupContainer">
        <div className="popupHeader">
          <h3>{title}</h3>
        </div>
        <div className="popupBody">
          <span>
            <img src={smallThumbnail} alt="temporary alt" />
          </span>
          <div className="popup-details-container">
            <span className="popupLeftDetails">
              <h5>Tombstone</h5>
              <div>Authors: {authors}</div>
              <div>Publisher: {publisher}</div>
              <div>Publish Date: {publishedDate}</div>
              <div>Language: {language}</div>
              <div>Pages: {pageCount}</div>
              <div>Format: {printType}</div>
              <div>Maturity Rating: {maturityRating}</div>
              <div>ISBN: {industryIdentifiers}</div>
              <div>Categories: {categories}</div>
            </span>
            <span className="popupRightDetails">
              <h5>Description</h5>
              {description}
            </span>
          </div>

          <input
            type="checkbox"
            name="checkbox"
            defaultChecked={currentlyReading}
            onChange={checkHandler}
          />
          <label htmlFor="checkbox">Currently Reading</label>
          <hr />
          <label htmlFor="postReview">Post a Review</label>
          <textarea
            name="postReview"
            value={review}
            onChange={e => setReview(e.target.value)}
            rows={4}
            cols={40}
          />
          <hr />
          <button type="reset">Cancel</button>
          <button type="submit" onClick={handleSubmit}>
            Save post
          </button>
          {savedReview ? <div>Review is Saved</div> : null}
          <div>
            <button onClick={closeHandler}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

Popup.propTypes = {
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

Popup.defaultProps = {
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
