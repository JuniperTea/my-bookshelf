import React, { useState, useEffect } from "react";

export default function UserItem({ friendID, friendName, saveFriend }) {
  const [newFriend, setNewFriend] = useState(false);

  useEffect(() => {
    if (newFriend === true) {
      saveFriend(friendID, friendName);
    }
  }, [newFriend]);

  const changeHandler = () => {
    setNewFriend(!newFriend);
  };

  return (
    <div className="user-item-line">
      <div className="user-item">{friendName}</div>
      <input
        type="checkbox"
        id="checkbox"
        checked={newFriend}
        onChange={changeHandler}
      />
    </div>
  );
}
