import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import nookies from "nookies";
import "firebase/auth";
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
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
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
