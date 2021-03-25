import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 80,
  (x - window.innerWidth / 2) / 80,
  1.03,
];

const PerspectiveHover = ({ children, perspective = 1200 }) => {
  const trans = (x, y, s) => {
    return `perspective(${perspective}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  };

  const mouseMove = ({ clientX: x, clientY: y }) => {
    set({ xys: calc(x, y) });
  };

  const [hoverAnimation, set] = useSpring(() => ({
    from: {
      opacity: 0,
      transform:
        "translateY(40px) scale(0.8) perspective(0px) rotateX(0deg) rotateY(0deg) scale(1)",
    },
    opacity: 1,
    transform:
      "translateY(0px) scale(1) perspective(0px) rotateX(0deg) rotateY(0deg) scale(1)",
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <animated.div
      onMouseMove={mouseMove}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: hoverAnimation.xys.interpolate(trans),
        opacity: hoverAnimation.opacity.interpolate((o) => o),
      }}
    >
      {children}
    </animated.div>
  );
};

export default PerspectiveHover;
