import { useSpring, animated } from "react-spring";

import styles from "./AddProjectFAB.module.scss";
import Image from "next/image";

const AddProjectFAB = ({ FABClicked }) => {
  const FABtransition = useSpring({
    from: { transform: "scale(0.6) rotate(45deg)", opacity: 0 },
    transform: "scale(1) rotate(0deg)",
    opacity: 1,
  });
  return (
    <animated.div
      className={styles.FABWrap}
      onClick={FABClicked}
      style={FABtransition}
    >
      <Image
        src="/images/plus.svg"
        width={40}
        height={40}
        layout="responsive"
      />
    </animated.div>
  );
};

export default AddProjectFAB;
