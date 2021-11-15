import React from "react";
import { useNavigate } from "react-router";
import "./page_not_found.css";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div id='page_not_found'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Home Page
      </button>
    </div>
  );
}
