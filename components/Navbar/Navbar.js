import React, { useState, useRef } from "react";
import styles from "./Navbar.module.scss";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";

import clickOutside from "../../hooks/clickOutside";

import PreviousButton from "../PreviousButton/PreviousButton";

export default function Navbar({ image }) {
  //State
  const [showDropdown, setShowDropdown] = useState(false);

  //Refs
  const ref = useRef();
  const router = useRouter();

  let signout, goBack, logoTransition;

  //Spring animation
  const backTransition = useSpring({
    from: { transform: "translateX(-20px) scale(0.6)", opacity: 0 },
    transform: "translateX(0px) scale(1)",
    opacity: 1,
  });

  clickOutside(ref, () => {
    if (showDropdown) {
      setShowDropdown((prev) => !prev);
    }
  });

  const signOut = async () => {
    await firebase.auth().signOut();
    router.push("/");
  };

  if (showDropdown) {
    signout = (
      <div className={styles.dropdown} ref={ref}>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  if (router.query?.project) {
    goBack = (
      <animated.div style={backTransition}>
        <PreviousButton />
      </animated.div>
    );
    logoTransition = useSpring({
      from: { transform: "translateX(-20px)" },
      transform: "translateX(0px)",
    });
  }

  return (
    <nav className={styles.navWrap}>
      <strong className={styles.logoNavWrap}>
        {goBack}
        <animated.span style={undefined ?? logoTransition}>PROTO</animated.span>
      </strong>
      <div ref={ref}>
        <div
          className={styles.navImgWrap}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            alt="profile picture"
            className={styles.navImg}
            src={image ? image : "/images/default-profile.svg"}
            width={30}
            height={30}
          />
        </div>
        {signout}
      </div>
    </nav>
  );
}
