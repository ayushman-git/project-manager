import React from "react";
import { useState } from "react";
import Image from "next/image";
import firebase from "firebase/app";
import "firebase/firestore";

import styles from "./AddProjectModal.module.scss";
import theme from "../../assets/theme";

import Modal from "../Modal/Modal";
export default function AddProjectModal({ session, closeModal, empty }) {
  const [projectName, setProjectName] = useState("");
  const [projectNameErr, setProjectNameErr] = useState(false);
  const [tag, setTag] = useState("");
  const [tagErr, setTagErr] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [deadlineErr, setDeadlineErr] = useState(false);

  const ERR_MESSAGE = "Cannot submit empty field!";

  const db = firebase.firestore();

  const reset = () => {
    setProjectName("");
    setTag("");
    setDescription("");
    setDeadline("");
  };

  const addProjectToDb = (e) => {
    e.preventDefault();
    if (!projectName || !tag || !description || !deadline) {
      if (!projectName) {
        setProjectNameErr(true);
      }
      if (!tag) {
        setTagErr(true);
      }
      if (!description) {
        setDescriptionErr(true);
      }
      if (!deadline) {
        setDeadlineErr(true);
      }
    } else {
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
    }
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
              className={projectNameErr ? "error-inp" : ""}
              placeholder="Enter your project's name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setProjectNameErr(false);
              }}
            />
          </label>
          <label>
            Tag: <br />
            <input
              type="text"
              className={tagErr ? "error-inp" : ""}
              placeholder="Enter your project's type"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                setTagErr(false);
              }}
            />
          </label>
        </div>
        <br />
        <label>
          Description: <br />
          <textarea
            rows="4"
            className={descriptionErr ? "error-inp" : ""}
            placeholder="Write a few lines about your project"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionErr(false);
            }}
          ></textarea>
        </label>
        <br />
        <div className={styles.formTwoInputs}>
          <label>
            Deadline: <br />
            <input
              type="date"
              className={deadlineErr ? "error-inp" : ""}
              placeholder="Enter deadline date"
              min={new Date().toISOString().split("T")[0]}
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                setDeadlineErr(false);
              }}
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
        {projectNameErr || tagErr || descriptionErr || deadlineErr ? (
          <span className="input-err-msg">{ERR_MESSAGE}</span>
        ) : (
          <></>
        )}
      </form>
    </Modal>
  );
}
