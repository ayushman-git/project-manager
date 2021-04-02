import Image from "next/image";
import { useSpring, animated } from "react-spring";

import styles from "./Button.module.scss";

const Button = ({ type, text, image, link }) => {
  let imageView;
  const [btnAnim, set] = useSpring(() => ({
    transform: "translateY(0px) scale(1)",
    background: "rgba(255,255,255,0.8)",
  }));

  const clickHandler = () => {
    window.open(link, "_blank", "noopener");
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
      <Image src={image} alt="" width={30} height={30} layout="fixed" />
    );

  return (
    <animated.button
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onClick={clickHandler}
      className={styles[type]}
      style={btnAnim}
    >
      {text}
      {imageView}
    </animated.button>
  );
};

export default Button;
