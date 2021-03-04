import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import firebase from "firebase";
import { useRouter } from "next/router";

import clickOutside from "../../hooks/clickOutside";

import PreviousButton from "../PreviousButton/PreviousButton";

export default function Navbar({ image }) {
  let signout;
  let goBack;
  const ref = useRef();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  clickOutside(ref, () => {
    if (showDropdown) {
      setShowDropdown((prev) => !prev);
    }
  });
  const toggleSignout = () => {
    setShowDropdown((prev) => !prev);
  };

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
    goBack = <PreviousButton />;
  }

  return (
    <nav className={styles.navWrap}>
      <strong className={styles.logoNavWrap}>
        {goBack}
        <span>LOGO</span>
      </strong>
      <div ref={ref}>
        <div className={styles.navImgWrap} onClick={toggleSignout}>
          <Image className={styles.navImg} src={image} width={40} height={40} />
        </div>
        {signout}
      </div>
    </nav>
  );
}
