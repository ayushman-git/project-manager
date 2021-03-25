import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import Modal from "../../Modal/Modal";

const AddTaskModal = ({ closeModal, projectId, stories, selectedStoryId }) => {
  const db = firebase.firestore();
  const [task, setTask] = useState("");
  const [taskErr, setTaskErr] = useState(false);

  const ERR_MESSAGE = "Field cannot be left empty!";

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
    if (!task) {
      setTaskErr(true);
    } else {
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
    }
  };
  return (
    <Modal closeModal={closeModal} headerMessage="Add Task">
      <form>
        <label>
          Task: <br />
          <input
            className={taskErr ? "error-inp" : ""}
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setTaskErr(false);
            }}
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
        {taskErr ? <span className="input-err-msg">{ERR_MESSAGE}</span> : <></>}
      </form>
    </Modal>
  );
};

export default AddTaskModal;
