import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = jwtDecode(token);
      let expire = decoded.exp * 1000;
      if (new Date().getTime() < expire) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.clear();
        navigate("/landing");
      }
    } else {
      setIsAuthenticated(false);
      localStorage.clear();
      navigate("/landing");
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
