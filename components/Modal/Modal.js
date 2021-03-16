import { useSpring, animated } from "react-spring";
import styles from "./Modal.module.scss";

const Modal = ({ closeModal, children, headerMessage }) => {
  const onMountTransition = useSpring({
    from: { transform: "translate(-50%, -30%) scale(0.8)", opacity: 0 },
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
  });
  const bgTransition = useSpring({
    from: { opacity: 0 },
    opacity: 1,
  });

  return (
    <>
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
    </>
  );
};

export default Modal;
