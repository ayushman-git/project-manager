import styles from "./Modal.module.scss";

const Modal = ({ closeModal, children, currentTheme }) => {
  return (
    <>
      <div
        className={styles.modal}
        style={{
          background: currentTheme
            ? `linear-gradient(-90deg, ${currentTheme[0]}, ${currentTheme[1]})`
            : "background: black",
        }}
      >
        {children}
      </div>
      <div onClick={closeModal} className={styles.back}></div>
    </>
  );
};

export default Modal;
