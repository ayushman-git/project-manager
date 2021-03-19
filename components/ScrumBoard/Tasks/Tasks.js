import { useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

import AddHoverAnimation from "../../../HOCs/AddHoverAnimation";

import DelModal from "../DelModal/DelModal";
import styles from "./Tasks.module.scss";

const Tasks = ({ tasks, type, changeStatusClick, storyId, delTask }) => {
  const [toggleTaskDelModal, setToggleTaskDelModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const showLeftArrow = type === "doing" || type === "done";
  const showRightArrow = type === "doing" || type === "idle";
  let displayTasks;

  const middleMouseHandler = (e, taskId) => {
    if (e.button === 1) {
      setSelectedTaskId(taskId);
      setToggleTaskDelModal(true);
      e.preventDefault();
    }
  };

  const taskTransition = useSpring({
    from: {
      transform: `translateX(-50px) scale(0.9) rotate(5deg)`,
      opacity: 0,
    },
    transform: "translateX(0px) scale(1) rotate(0deg)",
    opacity: 1,
  });

  if (tasks) {
    displayTasks = tasks.map((task) => (
      <AddHoverAnimation>
        <animated.li
          style={taskTransition}
          key={task.id}
          className={`${styles.taskCard} card`}
          onMouseDown={(e) => middleMouseHandler(e, task.id)}
        >
          {showLeftArrow && (
            <Image
              onClick={() => changeStatusClick(task.id, storyId, type, "left")}
              src="/images/left.svg"
              width={25}
              height={25}
              layout="fixed"
            />
          )}
          <p>{task.task}</p>
          {showRightArrow && (
            <Image
              onClick={() => changeStatusClick(task.id, storyId, type, "right")}
              src="/images/right.svg"
              width={25}
              height={25}
            />
          )}
          {toggleTaskDelModal && (
            <DelModal
              closeModal={() => setToggleTaskDelModal(false)}
              confirmDel={() => {
                delTask(selectedTaskId, storyId);
                setToggleTaskDelModal(false);
              }}
              message="Delete Task?"
            />
          )}
        </animated.li>
      </AddHoverAnimation>
    ));
  }
  return <ul className={styles.cardList}>{displayTasks}</ul>;
};

export default Tasks;
