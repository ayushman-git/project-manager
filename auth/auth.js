import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import nookies from "nookies";
import "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return;
      }
      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
