import React from "react";
import Image from "next/image";
import styles from "./Shortcut.module.scss";

export default function Shortcut({ url, image, delShortcut, id }) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener");
  };
  const mouseDownHandler = (e) => {
    if (e.button === 1 && delShortcut) {
      delShortcut(id);
      e.preventDefault();
    }
  };
  return (
    <div
      onClick={handleClick}
      onMouseDown={mouseDownHandler}
      className={`${styles.shortcutWrap} shortcutDiv`}
    >
      <Image src={image} width={30} height={25} />
    </div>
  );
}
