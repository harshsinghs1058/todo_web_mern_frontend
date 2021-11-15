import React, { useEffect, useState, useContext } from "react";

const AuthContext = React.createContext(undefined);
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isSignedIn: false,
    email: "",
  });

  useEffect(() => {
    const authJson = localStorage.getItem("authTodo");
    if (authJson) {
      const authObj = JSON.parse(authJson);
      if (authObj.isSignedIn) {
        setAuth(authObj);
      }
    }
  }, []);

  const userSignOut = () => {
    setAuth({
      isSignedIn: false,
      email: "",
    });
  };
  //req user email
  const userSignIn = (email) => {
    setAuth({
      isSignedIn: true,
      email,
    });
  };

  const data = [auth, userSignIn, userSignOut];
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("you can only use useAuth inside AuthContext.Provider");
  }
  return context;
};
