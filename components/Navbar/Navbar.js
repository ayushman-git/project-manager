import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar(props) {
  return (
    <nav className={styles.navWrap}>
      <strong>LOGO</strong>
      <div className={styles.navImgWrap}>
        <Image
          className={styles.navImg}
          src={props.image}
          width={40}
          height={40}
        />
      </div>
    </nav>
  );
}
