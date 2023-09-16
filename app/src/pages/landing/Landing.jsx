import React, { useState } from "react";
import Header from "../../shared/components/Header";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import bookshelf from "../../shared/decorations/bookshelf.jpg";
import { Button } from "@mui/material";

export default function Landing() {
  const [userState, setUserState] = useState("login");

  function loginButton() {
    setUserState("login");
  }
  function signupButton() {
    setUserState("signup");
  }
  return (
    <div>
      <Header />

      <div className="dashboard-container">
        <div className="box a">
          Welcome to Your Bookshelf
          <br />
          <img src={bookshelf} alt="wall of pages" />
        </div>
        <div className="box b">
          Login/Signup
          <div>
            <Button variant="contained" onClick={loginButton}>
              Login
            </Button>
            <Button variant="contained" onClick={signupButton}>
              Signup
            </Button>
          </div>
          <div>{userState === "login" ? <Login /> : <Signup />}</div>
        </div>
      </div>
    </div>
  );
}
