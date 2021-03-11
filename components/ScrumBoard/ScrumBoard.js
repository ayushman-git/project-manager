import { useState } from "react";
import Image from "next/image";
import styles from "./ScrumBoard.module.scss";

import AddStoryModal from "./AddStoryModal/AddStoryModal";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import StoryCard from "./StoryCard/StoryCard";
import Tasks from "./Tasks/Tasks";

const ScrumBoard = ({ stories, projectId }) => {
  const [toggleStoryModal, setToggleStoryModal] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState("");
  const [toggleTaskModal, setToggleTaskModal] = useState(false);
  let rows;
  const selectedStory = (e, storyId) => {
    setSelectedStoryId(storyId);
    setToggleTaskModal(true);
  };

  const changeTaskStatus = (id, type, direction) => {
    console.log(id, type, direction);
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
            type="idle"
            changeStatusClick={changeTaskStatus}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "doing")}
            type="doing"
            changeStatusClick={changeTaskStatus}
          />
        </td>
        <td>
          <Tasks
            tasks={story.tasks.filter((task) => task.type === "done")}
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
