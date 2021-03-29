import { useSpring, animated } from "react-spring";

const AddHoverAnimation = ({ children }) => {
  const [element, setElement] = useSpring(() => ({
    from: {
      transform: "translateY(30px) scale(0.9)",
      opacity: 0,
    },
    transform: "translateY(0px) scale(1)",
    opacity: 1,
  }));

  const hoverHandler = (isHover) => {
    setElement({
      transform: isHover
        ? "translateY(-3px) scale(1)"
        : "translateY(0px) scale(1)",
    });
  };

  return (
    <animated.div
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}
      style={element}
    >
      {children}
    </animated.div>
  );
};

export default AddHoverAnimation;
