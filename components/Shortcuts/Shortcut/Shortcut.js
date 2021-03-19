import React from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

import AddHoverAnimation from "../../../HOCs/AddHoverAnimation";

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

  const [transition, set] = useSpring(() => ({
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1)",
    config: { duration: 10 },
  }));

  const hoverHandler = (isHover) => {
    set({
      backgroundColor: isHover
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(255, 255, 255, 0.1)",
      transform: isHover ? "scale(1.05)" : "scale(1)",
    });
  };

  return (
    <AddHoverAnimation>
      <animated.div
        style={transition}
        onClick={handleClick}
        onMouseDown={mouseDownHandler}
        onMouseEnter={() => hoverHandler(true)}
        onMouseLeave={() => hoverHandler(false)}
        className={`${styles.shortcutWrap} shortcutDiv`}
      >
        <Image src={image} width={30} height={25} />
      </animated.div>
    </AddHoverAnimation>
  );
}
