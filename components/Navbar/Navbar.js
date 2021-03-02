import React from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";

export default function Navbar(props) {
  return (
    <nav className={styles.navWrap}>
      <strong>LOGO</strong>
      <div className={styles.navImgWrap}>
        <Image
          className={styles.navImg}
          src={props.image}
          width={50}
          height={50}
        />
      </div>
    </nav>
  );
}
