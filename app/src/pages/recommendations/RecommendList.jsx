import React, { useState, useEffect } from "react";
import { commonGetJson } from "../../shared/utils/api-helper";
import RecommendItem from "./RecommendItem";
import Spinner from "../../shared/components/Spinner";

//To fetch the recommendations and display them
export default function RecommendList() {
  const [recList, setRecList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecommendation();
  }, []);

  function getRecommendation() {
    setLoading(true);
    commonGetJson("/recommendations")
      .then(x => {
        setRecList(x);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <h4>Recommendations</h4>
      <button onClick={getRecommendation}>Refresh</button>
      {loading ? (
        <>
          <Spinner />
          <div>Standby while processing...</div>
        </>
      ) : recList.length > 0 ? (
        recList.map(x => (
          <div key={x._id}>
            {x.recs.length > 0 ? (
              <div>
                <div className="bold-me">Friend: {x.friendName}</div>
                <div>
                  {x.recs.map(y => (
                    <div className="reading-item-line" key={y._id}>
                      <RecommendItem key={y._id} data={y} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <span>None of your friends read.</span>
      )}
    </div>
  );
}
