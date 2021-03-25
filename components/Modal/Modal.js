import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

const Modal = ({ closeModal, children, headerMessage }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  });

  const onMountTransition = useSpring({
    from: { transform: "translate(-50%, -30%) scale(0.8)", opacity: 0 },
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
  });
  const bgTransition = useSpring({
    from: { opacity: 0 },
    opacity: 1,
  });
  let view = (
    <div>
      <animated.div style={onMountTransition} className={styles.modal}>
        <header>
          <h2 className={styles.heading}>{headerMessage}</h2>
        </header>
        <hr />
        {children}
      </animated.div>
      <animated.div
        style={bgTransition}
        onClick={closeModal}
        className={styles.back}
      ></animated.div>
    </div>
  );

  return mounted ? createPortal(view, document.getElementById("modal")) : null;
};

export default Modal;
