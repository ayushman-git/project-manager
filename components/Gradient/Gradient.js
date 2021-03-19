import { useSpring, animated } from "react-spring";

import styles from "./Gradient.module.scss";

const Gradient = ({ theme, selected, changeTheme }) => {
  const style = {
    background: `linear-gradient(-45deg, ${theme[0]}, ${theme[1]})`,
  };
  const newTheme = () => {
    changeTheme(theme);
  };

  const [gradientAnimation, set] = useSpring(() => ({
    transform: "scale(1) rotate(0deg)",
    borderRadius: "50%",
  }));

  const hoverHandler = (isHover) => {
    set({
      transform: isHover
        ? "scale(1.4) rotate(180deg)"
        : "scale(1) rotate(0deg)",
      borderRadius: isHover ? "40%" : "50%",
    });
  };

  return (
    <animated.div
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}
      className={styles.gradient}
      style={{ ...style, ...gradientAnimation }}
      onClick={newTheme}
    ></animated.div>
  );
};

export default Gradient;
