import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
export default function HomePage() {
  const [auth] = useAuth(useAuth);
  console.log(auth.isSignedIn);
  if (auth.isSignedIn === true) return <Navigate to={`/${auth.email}/todos`} />;
  else return <Navigate to='/sign-in' />;
}
