import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/landing");
  }
  function gotoProfile() {
    navigate("/profile");
  }
  return (
    <div className="header-container">
      <h1 className="header-title">My Bookshelf</h1>
      {(userName !== null) & (userName !== "") ? (
        <>
          <div className="header-user-info">
            <div>
              <span>Welcome,</span>
              <span onClick={gotoProfile}>{userName}</span>
            </div>
            <br />
            <span onClick={logout}>Logout</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
