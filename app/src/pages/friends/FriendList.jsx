import React, { useEffect, useState } from "react";
import { commonGetJson } from "../../shared/utils/api-helper.js";
import Spinner from "../../shared/components/Spinner";
import FriendItem from "./FriendItem.jsx";
import ChooseFriendPopup from "./ChooseFriendPopup.jsx";

export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //runs upon first enter and when the friendList changes after deletion
  useEffect(() => {
    getFriends();
  }, []);

  //call the friends API to capture the list of friends belonging to this user
  function getFriends() {
    setLoading(true);
    commonGetJson("/friends")
      .then(x => {
        setFriendList(x);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }
  //opens up a popup to allow user to choose friends
  function getMoreFriends() {
    setIsOpen(true);
  }

  return (
    <div>
      <h4>Friends List</h4>
      <button onClick={getFriends}>Refresh</button>
      <button onClick={getMoreFriends}>Add Friends</button>
      <hr />
      {loading ? (
        <Spinner />
      ) : friendList.length > 0 ? (
        friendList.map(x => (
          <FriendItem key={x.friendID} username={x.friendName} _id={x._id} />
        ))
      ) : (
        <span>You Have no Friends. Open User List to select Friends.</span>
      )}
      {isOpen && <ChooseFriendPopup setIsOpen={setIsOpen} />}
    </div>
  );
}
