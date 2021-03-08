import React from "react";
import { useState } from "react";
import firebase from "firebase";

import theme from "../../assets/theme";

import Modal from "../Modal/Modal";
export default function AddProjectModal({ session, closeModal }) {
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
      });
    closeModal();
    reset();
  };
  return (
    <Modal closeModal={closeModal}>
      <header>
        <h3>Edit Project</h3>
      </header>
      <form onSubmit={addProjectToDb}>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <label>
          Tag:
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
