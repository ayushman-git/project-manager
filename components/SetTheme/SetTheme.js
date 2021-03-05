import firebase from "firebase";
import { useState } from "react";

import styles from "./SetTheme.module.scss";
import ThemeModal from "./ThemeModal/ThemeModal";

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
  if (showModal) {
    modal = (
      <ThemeModal
        currentTheme={currentTheme}
        changeTheme={changeTheme}
        closeModal={toggleModal}
      />
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
