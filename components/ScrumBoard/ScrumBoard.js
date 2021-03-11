import { useState } from "react";
import firebase from "firebase";
import Image from "next/image";
import styles from "./ScrumBoard.module.scss";

import AddStoryModal from "./AddStoryModal/AddStoryModal";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import StoryCard from "./StoryCard/StoryCard";
import Tasks from "./Tasks/Tasks";

const ScrumBoard = ({ stories, projectId }) => {
  const db = firebase.firestore();
  const [toggleStoryModal, setToggleStoryModal] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState("");
  const [toggleTaskModal, setToggleTaskModal] = useState(false);
  let rows;
  const selectedStory = (e, storyId) => {
    setSelectedStoryId(storyId);
    setToggleTaskModal(true);
  };

  const updateFirestoreWithUpdatedTasks = (updatedStory) => {
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({
          stories: updatedStory,
        });
      });
  };

  const changeTaskStatus = (taskId, storyId, type, direction) => {
    const selectedStoryIndex = stories.findIndex(
      (story) => story.id === storyId
    );
    const selectedStory = stories.find((story) => story.id === storyId);
    const selectedTaskIndex = selectedStory.tasks.findIndex(
      (task) => task.id === taskId
    );

    if (type === "idle" && direction === "right")
      selectedStory.tasks[selectedTaskIndex].type = "doing";
    else if (type === "doing" && direction === "left")
      selectedStory.tasks[selectedTaskIndex].type = "idle";
    else if (type === "doing" && direction === "right")
      selectedStory.tasks[selectedTaskIndex].type = "done";
    else if (type === "done" && direction === "left")
      selectedStory.tasks[selectedTaskIndex].type = "doing";

    const updatedStory = stories;
    updatedStory[selectedStoryIndex] = selectedStory;
    updateFirestoreWithUpdatedTasks(updatedStory);
  };

  if (stories) {
    rows = stories.map((story) => (
      <tr key={story.id}>
        <td>
          <StoryCard story={story} selectedStory={selectedStory} />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "idle")}
            storyId={story.id}
            type="idle"
            changeStatusClick={changeTaskStatus}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "doing")}
            storyId={story.id}
            type="doing"
            changeStatusClick={changeTaskStatus}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "done")}
            storyId={story.id}
            type="done"
            changeStatusClick={changeTaskStatus}
          />
        </td>
      </tr>
    ));
  }
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.stories}>Stories</th>
            <th>Idle</th>
            <th>Doing</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td className={styles.add}>
              <div onClick={() => setToggleStoryModal(true)}>
                <Image src="/images/plus.svg" height={25} width={25} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {toggleStoryModal && (
        <AddStoryModal
          projectId={projectId}
          closeModal={(e) => setToggleStoryModal(false)}
          stories={stories}
        />
      )}
      {toggleTaskModal && (
        <AddTaskModal
          projectId={projectId}
          closeModal={(e) => setToggleTaskModal(false)}
          stories={stories}
          selectedStoryId={selectedStoryId}
        />
      )}
    </>
  );
};

export default ScrumBoard;
