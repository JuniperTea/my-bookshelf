import React from "react";
import { useNavigate } from "react-router-dom";
import LocalBookList from "../books/LocalBookList";
import FriendList from "../friends/FriendList";
import CurrentlyReading from "../reading/CurrentlyReading";
import RecommendList from "../recommendations/RecommendList";
import Reviews from "../reviews/Reviews";

export default function Dashboard() {
  const navigate = useNavigate();

  function lookupGoogleBooks() {
    navigate("/google-lookup");
  }

  return (
    <div>
      <div className="dashboard-container">
        <div className="currently-reading">{<CurrentlyReading />}</div>
        <div className="reviews">
          <Reviews />
        </div>
        <div className="friend-list">{<FriendList />}</div>
        <div className="friend-recommendations">
          <RecommendList />
        </div>
      </div>

      <div className="library">
        <div className="library-title">
          <h4>My Library</h4>
          <p>Grab a Google Book</p>
          <button onClick={lookupGoogleBooks}>Google</button>
        </div>

        <LocalBookList />
      </div>
    </div>
  );
}
