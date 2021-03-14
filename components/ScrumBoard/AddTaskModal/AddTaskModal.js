import { useState } from "react";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

import Modal from "../../Modal/Modal";

const AddTaskModal = ({ closeModal, projectId, stories, selectedStoryId }) => {
  const db = firebase.firestore();
  const [task, setTask] = useState("");

  const updateSelectedStory = () => {
    const selectedStory = stories.find((story) => story.id === selectedStoryId);
    selectedStory.tasks.push({ id: uuidv4(), task, type: "idle" });
    const storiesWithoutSelected = stories.filter(
      (story) => story.id !== selectedStoryId
    );
    return [selectedStory, ...storiesWithoutSelected];
  };

  const addStoryHandler = (e) => {
    e.preventDefault();

    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({
          stories: updateSelectedStory(),
        });
      });
    setTask("");
    closeModal();
  };
  return (
    <Modal closeModal={closeModal} headerMessage="Add Task">
      <form>
        <label>
          Task: <br />
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
          />
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

export default AddTaskModal;
