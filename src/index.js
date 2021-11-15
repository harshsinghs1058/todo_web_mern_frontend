import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./Components/home_page/home_page";
import PageNotFound from "./Components/page_not_found/page_not_found";
import SignInPage from "./Components/sign_in_page/sign_in_page";
import SignUpPage from "./Components/sign_up_page/sign_up_page";
import Todos from "./Components/todos/todos";
import { AuthProvider } from "./context/auth_context";
import "./global.css";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/sign-in' element={<SignInPage />} />
        <Route exact path='/sign-up' element={<SignUpPage />} />
        <Route exact path='/:userID/Todos' element={<Todos />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
