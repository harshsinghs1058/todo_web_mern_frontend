import React from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/auth_context";
export default function Todos() {
  const [auth] = useAuth(useAuth);
  console.log(auth);
  const { userID } = useParams();
  console.log(userID);
  if (!auth.isSignedIn || userID !== auth.email) {
    return (
      <div>
        <h1> ERROR 404</h1>
        <h2>
          You are not authorized access this page ,if you think this is the
          sign-in again
        </h2>
      </div>
    );
  }
  return (
    <div>
      <div>{auth.email}</div>
    </div>
  );
}
