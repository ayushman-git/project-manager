import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import nookies from "nookies";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        localStorage.setItem("token", "");
        // nookies.set(undefined, "token", "", {
        //   sameSite: "none",
        //   secure: true,
        // });
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      localStorage.setItem("token", token);
      // nookies.set(undefined, "token", token, {
      //   sameSite: "none",
      //   secure: true,
      // });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
