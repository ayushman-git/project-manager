import React from "react";
import { useState } from "react";
import firebase from "firebase";
import Image from "next/image";

import styles from "./AddProjectModal.module.scss";
import theme from "../../assets/theme";

import Modal from "../Modal/Modal";
export default function AddProjectModal({ session, closeModal, empty }) {
  const [projectName, setProjectName] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const db = firebase.firestore();

  const reset = () => {
    setProjectName("");
    setTag("");
    setDescription("");
    setDeadline("");
  };

  const addProjectToDb = (e) => {
    e.preventDefault();
    db.collection("projects")
      .doc()
      .set({
        description,
        dueDate: deadline,
        projectName,
        tag,
        theme: theme[Math.floor(Math.random() * theme.length)],
        userId: session.uid,
        active: empty ? true : false,
        archive: false,
      });
    reset();
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} headerMessage="Add Project">
      <form onSubmit={addProjectToDb}>
        <div className={styles.formTwoInputs}>
          <label>
            Project Name: <br />
            <input
              autoFocus
              type="text"
              placeholder="Enter your project's name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </label>
          <label>
            Tag: <br />
            <input
              type="text"
              placeholder="Enter your project's type"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </label>
        </div>
        <br />
        <label>
          Description: <br />
          <textarea
            rows="4"
            placeholder="Write a few lines about your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <div className={styles.formTwoInputs}>
          <label>
            Deadline: <br />
            <input
              type="date"
              placeholder="Enter deadline date"
              min={new Date().toISOString().split("T")[0]}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
          <br />
          <button
            className={`${styles.submitButton} success-btn`}
            type="submit"
          >
            Submit <Image src="/images/submit.svg" width={15} height={15} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
