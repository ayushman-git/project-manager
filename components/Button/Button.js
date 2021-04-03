import Image from "next/image";
import { useSpring, animated } from "react-spring";

import styles from "./Button.module.scss";

const Button = ({ type, text, image, link, event, size }) => {
  let imageView;
  const [btnAnim, set] = useSpring(() => ({
    transform: "translateY(0px) scale(1)",
    background: "rgba(255,255,255,0.8)",
  }));

  const clickHandler = () => {
    if (link) window.open(link, "_blank", "noopener");
    if (event) event();
  };

  const hover = (isHover) => {
    set({
      transform: isHover
        ? "translateY(-2px) scale(1.2)"
        : "translateY(0px) scale(1)",
      background: isHover ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.8)",
    });
  };

  if (image)
    imageView = (
      <Image
        src={image}
        alt=""
        width={size ? size - 20 : 30}
        height={size ? size - 20 : 30}
        layout="fixed"
      />
    );

  return (
    <animated.button
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onClick={clickHandler}
      className={styles[type]}
      style={{ ...btnAnim, width: size + "px", height: size + "px" }}
    >
      {text}
      {imageView}
    </animated.button>
  );
};

export default Button;
