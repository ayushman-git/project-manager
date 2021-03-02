import React from "react";
import Image from "next/image";
import styles from "./Shortcut.module.scss";

export default function Shortcut(props) {
  console.log(props);
  return (
    <a
      href={props.url}
      target="_blank"
      noopener="noopener"
      className={styles.shortcutWrap}
    >
      <Image src={props.image} width={30} height={30} />
    </a>
  );
}
