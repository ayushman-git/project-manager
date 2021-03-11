import Image from "next/image";

import styles from "./Tasks.module.scss";

const Tasks = ({ tasks, type, changeStatusClick }) => {
  const showLeftArrow = type === "doing" || type === "done";
  const showRightArrow = type === "doing" || type === "idle";
  let displayTasks;
  if (tasks) {
    displayTasks = tasks.map((task) => (
      <li key={task.id} className={`${styles.taskCard} card`}>
        {showLeftArrow && (
          <Image
            onClick={() => changeStatusClick(task.id, type, "leftArrow")}
            src="/images/left.svg"
            width={25}
            height={25}
          />
        )}
        <p>{task.task}</p>
        {showRightArrow && (
          <Image
            onClick={() => changeStatusClick(task.id, type, "rightArrow")}
            src="/images/right.svg"
            width={25}
            height={25}
          />
        )}
      </li>
    ));
  }
  return <ul className={styles.cardList}>{displayTasks}</ul>;
};

export default Tasks;
