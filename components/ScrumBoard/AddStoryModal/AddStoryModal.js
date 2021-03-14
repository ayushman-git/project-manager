import { useState } from "react";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

import Modal from "../../Modal/Modal";

const AddStoryModal = ({ closeModal, projectId, stories }) => {
  const db = firebase.firestore();
  const [description, setDescription] = useState("");

  const addStoryHandler = (e) => {
    e.preventDefault();

    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        if (stories) {
          pr.ref.update({
            stories: [
              ...stories,
              {
                id: uuidv4(),
                description,
                tasks: [],
              },
            ],
          });
        } else {
          pr.ref.update({
            stories: [
              {
                id: uuidv4(),
                description,
                tasks: [],
              },
            ],
          });
        }
        setDescription("");
        closeModal();
      });
  };
  return (
    <Modal closeModal={closeModal} headerMessage="Add Story">
      <form>
        <label>
          Story Description:
          <textarea
            value={description}
            placeholder="Add Story for your project"
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </label>
        <br />
        <button
          className="success-btn"
          style={{ float: "right" }}
          onClick={addStoryHandler}
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddStoryModal;
