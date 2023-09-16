import React, { useState, useEffect } from "react";
import { commonGetJson } from "../../shared/utils/api-helper";
import ReviewItem from "./ReviewItem";
import Spinner from "../../shared/components/Spinner";

//gets the reviews for all the current books in the library
export default function Reviews() {
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReviews();
    console.log(reviewList);
  }, []);

  function getReviews() {
    setLoading(true);
    commonGetJson("/reviews")
      .then(x => {
        setReviewList(x);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <h4>Reviews of Books on MyBookshelf</h4>
      <button onClick={getReviews}>Refresh</button>
      <hr />
      {loading ? (
        <>
          <Spinner />
          <div>Standby while processing...</div>
        </>
      ) : reviewList.length > 0 ? (
        reviewList.map(x => (
          <div className="reading-item-line" key={x._id}>
            <ReviewItem data={x} />
          </div>
        ))
      ) : (
        <span>None of your friends read.</span>
      )}
    </div>
  );
}
