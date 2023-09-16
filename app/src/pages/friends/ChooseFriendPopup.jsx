import React, { useState, useEffect } from "react";
import {
  commonGetJson,
  commonPostJson,
} from "../../shared/utils/api-helper.js";
import Spinner from "../../shared/components/Spinner";
import UserItem from "./UserItem.jsx";

export default function ChooseFriendPopup({ setIsOpen }) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true);
    commonGetJson("/users")
      .then(x => {
        setUserList(x);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }

  const closeHandler = () => {
    setIsOpen(false);
  };
  function saveItem(friendID, friendName) {
    let friendObj = {
      friendID,
      friendName,
    };
    commonPostJson("/friends", friendObj).catch(e => {
      console.log(e);
    });
  }

  return (
    <>
      <div className="popupContainer">
        <div className="item-popup-body">
          {loading ? (
            <Spinner />
          ) : userList.length > 0 ? (
            userList.map(x => (
              <div>
                <UserItem
                  key={x.id}
                  friendID={x._id}
                  friendName={x.username}
                  saveFriend={saveItem}
                />
              </div>
            ))
          ) : (
            <div>No one is using this app</div>
          )}
          <button onClick={closeHandler}>Close</button>
        </div>
      </div>
    </>
  );
}
