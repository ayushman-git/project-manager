import firebase from "firebase";
import { useState } from "react";

import theme from "../../assets/theme";
import Gradient from "../Gradient/Gradient";

import styles from "./SetTheme.module.scss";
import Modal from "../Modal/Modal";

const SetTheme = ({ currentTheme, projectId }) => {
  let modal;

  const [showModal, setShowModal] = useState(false);
  const db = firebase.firestore();
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const changeTheme = (theme) => {
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({ theme });
      });
    toggleModal();
  };

  const gradients = theme.map((th, index) => (
    <Gradient theme={th} key={index} changeTheme={changeTheme} />
  ));

  if (showModal) {
    modal = (
      <Modal
        currentTheme={currentTheme}
        closeModal={toggleModal}
        headerMessage="Pick a theme"
      >
        <section className={styles.gradientsWrap}>{gradients}</section>
      </Modal>
    );
  }
  return (
    <div>
      <div
        onClick={toggleModal}
        className={styles.setThemeWrap}
        style={{ backgroundColor: currentTheme[0] }}
      ></div>
      {modal}
    </div>
  );
};

export default SetTheme;
