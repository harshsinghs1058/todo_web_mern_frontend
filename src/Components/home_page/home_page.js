import { Navigate } from "react-router-dom";
export default function HomePage() {
  const authJson = localStorage.getItem("authTodo");
  if (authJson) {
    const authObj = JSON.parse(authJson);
    if (authObj.isSignedIn) {
      return <Navigate to={`/${authObj.email}/todos`} />;
    }
  }
  return <Navigate to='/sign-in' />;
}
