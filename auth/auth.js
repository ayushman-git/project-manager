import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import nookies from "nookies";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        Cookies.remove("tknCookies", { path: "/" });
        Cookies.remove("user", { path: "/" });
        return;
      }
      const token = await user.getIdToken(true);
      setUser(user);
      nookies.set(undefined, "user", user.displayName, {
        path: "/",
        maxAge: 3600,
      });
      nookies.set(undefined, "tknCookies", token, {
        path: "/",
        maxAge: 3600,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const userAuth = () => useContext(AuthContext);
