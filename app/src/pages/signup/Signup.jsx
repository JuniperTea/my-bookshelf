import React, { useState } from "react";
import { commonPostJson } from "../../shared/utils/api-helper.js";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signup() {
    let data = { username, password };
    commonPostJson("/login", data).then(x => {
      alert("Thank you! your account is created. Please Login.");
      setPassword("");
      setUsername("");
    });
  }
  return (
    <div>
      <h1>Signup</h1>
      <br />
      <br />
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <br />
      <br />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <br />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
