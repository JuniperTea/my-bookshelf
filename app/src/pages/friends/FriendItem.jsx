import React from "react";
import { commonDeleteJson } from "../../shared/utils/api-helper.js";

export default function FriendItem({ username, _id }) {
  function deleteItem() {
    commonDeleteJson("/friends/" + _id).catch(e => console.log(e));
  }
  return (
    <div>
      <div className="friend-item">
        {username}
        <span>
          <button onClick={deleteItem}>X</button>
        </span>
      </div>
    </div>
  );
}
