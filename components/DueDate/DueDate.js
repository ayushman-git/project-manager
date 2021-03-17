import React, { useState } from "react";
import firebase from "firebase";

import styles from "./DueDate.module.scss";

export default function DueDate({ days, projectId }) {
  const db = firebase.firestore();
  const [showInput, setShowInput] = useState(false);
  const changeDate = (e) => {
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];

        pr.ref.update({
          dueDate: e.target.value,
        });
      });
    setShowInput(false);
  };
  let msg = "";
  if (days < 0) {
    msg = `${Math.abs(days)} ${days === -1 ? "Day" : "Days"} Past`;
  }
  if (days > 0) {
    msg = `${days} ${days === 1 ? "Day" : "Days"} Left`;
  }
  return (
    <div className={styles.dateWrap}>
      <div
        onClick={() => setShowInput((prev) => !prev)}
        className={styles.dueCard}
      >
        {msg}
      </div>
      {showInput && projectId && <input type="date" onBlur={changeDate} />}
    </div>
  );
}
