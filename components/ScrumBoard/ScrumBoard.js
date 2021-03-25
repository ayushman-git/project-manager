import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Image from "next/image";
import styles from "./ScrumBoard.module.scss";

import AddStoryModal from "./AddStoryModal/AddStoryModal";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import StoryCard from "./StoryCard/StoryCard";
import Tasks from "./Tasks/Tasks";

const ScrumBoard = ({ stories, projectId }) => {
  const db = firebase.firestore();
  const [selectedStoryId, setSelectedStoryId] = useState("");

  const [toggleStoryModal, setToggleStoryModal] = useState(false);
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

  const delTaskHandler = (taskId, storyId) => {
    const selectedStoryIndex = stories.findIndex(
      (story) => story.id === storyId
    );
    const selectedStory = stories.find((story) => story.id === storyId);
    const selectedTaskIndex = selectedStory.tasks.findIndex(
      (task) => task.id === taskId
    );
    if (selectedTaskIndex > -1) {
      selectedStory.tasks.splice(selectedTaskIndex, 1);
    }

    const updatedStory = stories;
    updatedStory[selectedStoryIndex] = selectedStory;
    updateFirestoreWithUpdatedTasks(updatedStory);
  };

  const delStoryHandler = (storyId) => {
    const selectedStoryIndex = stories.findIndex(
      (story) => story.id === storyId
    );

    const updatedStory = stories;
    updatedStory.splice(selectedStoryIndex, 1);
    updateFirestoreWithUpdatedTasks(updatedStory);
  };

  const updateStory = (e, ref, storyId) => {
    const newData = e.currentTarget.textContent;
    const editedStoryIndex = stories.findIndex((story) => story.id === storyId);
    const updatedStories = stories;
    updatedStories[editedStoryIndex].description = newData;
    console.log(updatedStories);
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({
          stories: updatedStories,
        });
      });
    ref.current.contentEditable = false;
  };

  if (stories) {
    rows = stories.map((story) => (
      <tr key={story.id}>
        <td>
          <StoryCard
            projectId={projectId}
            story={story}
            selectedStory={selectedStory}
            delStory={delStoryHandler}
            updateStory={updateStory}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "idle")}
            storyId={story.id}
            type="idle"
            changeStatusClick={changeTaskStatus}
            delTask={delTaskHandler}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "doing")}
            storyId={story.id}
            type="doing"
            changeStatusClick={changeTaskStatus}
            delTask={delTaskHandler}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "done")}
            storyId={story.id}
            type="done"
            changeStatusClick={changeTaskStatus}
            delTask={delTaskHandler}
          />
        </td>
      </tr>
    ));
  }
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
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
            <td>
              <div className={styles.add}>
                <div
                  onClick={() => setToggleStoryModal(true)}
                  className={styles.addStory}
                >
                  <Image src="/images/plus-white.svg" height={25} width={25} />
                </div>
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
