import { useSpring, animated } from "react-spring";

import styles from "./FloatingActionButton.module.scss";
import Image from "next/image";

const FloatingActionButton = ({ FABClicked, image }) => {
  const [transition, setTransition] = useSpring(() => ({
    from: { transform: "scale(0.6) rotate(45deg)", opacity: 0 },
    transform: "scale(1) rotate(0deg)",
    opacity: 0.6,
  }));

  const mouseHover = (isHover) => {
    setTransition({
      opacity: isHover ? 1 : 0.6,
      transform: isHover ? `scale(1.1) rotate(90deg)` : `scale(1) rotate(0)`,
    });
  };

  return (
    <animated.div
      className={styles.FABWrap}
      onClick={FABClicked}
      style={transition}
      onMouseEnter={() => mouseHover(true)}
      onMouseLeave={() => mouseHover(false)}
    >
      <Image
        src={`/images/${image}.svg`}
        width={40}
        height={40}
        layout="responsive"
        alt={image}
      />
    </animated.div>
  );
};

export default FloatingActionButton;
