import styles from "./VideoBackground.module.scss";
import { useSpring, animated } from "react-spring";
import { useEffect } from "react";

const VideoBackground = () => {
  const [overlayAnim, set] = useSpring(() => ({
    backdropFilter: `hue-rotate(0deg)`,
    x: 0,
  }));
  const changeHue = (x) => {
    return `hue-rotate(${x}deg)`;
  };
  let counter = 10;
  const interval = setInterval(() => {
    if (overlayAnim.x.getValue() > 360) {
      counter = -10;
    }
    if (overlayAnim.x.getValue() < 0) {
      counter = 10;
    }
    set({ x: overlayAnim.x.getValue() + counter });
  }, 100);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className={styles.heroBg}>
      <video
        className={styles.bgVid}
        src="/video/home_bg_1.mp4"
        muted
        loop
        autoPlay
      ></video>
      <animated.div
        className={styles.overlay}
        // style={{ backdropFilter: overlayAnim.x.interpolate(changeHue) }}
      ></animated.div>
    </div>
  );
};

export default VideoBackground;
