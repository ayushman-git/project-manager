import { useSpring, animated } from "react-spring";

import styles from "./ProjectModify.module.scss";

const ProjectModify = ({ delToggle, archiveToggle }) => {
  const [btnTransition, set] = useSpring(() => ({
    from: { bottom: "-100px", opacity: 0 },
    bottom: "-62px",
    opacity: 0.6,
  }));

  const hoverHandler = (isHover) => {
    set({
      bottom: isHover ? "0px" : "-62px",
      opacity: 1,
    });
  };
  return (
    <animated.div
      className={styles.buttonWrap}
      style={btnTransition}
      onMouseEnter={() => hoverHandler(true)}
      onMouseLeave={() => hoverHandler(false)}
    >
      <button className="secondary-btn" onClick={delToggle}>
        Delete
      </button>
      <button className="success-btn" onClick={archiveToggle}>
        Complete
      </button>
    </animated.div>
  );
};

export default ProjectModify;
