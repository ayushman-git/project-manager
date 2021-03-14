import styles from "./Modal.module.scss";

const Modal = ({ closeModal, children, headerMessage }) => {
  return (
    <>
      <div className={styles.modal}>
        <header>
          <h2 className={styles.heading}>{headerMessage}</h2>
        </header>
        <hr />
        {children}
      </div>
      <div onClick={closeModal} className={styles.back}></div>
    </>
  );
};

export default Modal;
