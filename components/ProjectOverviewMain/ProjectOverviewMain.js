import { useRouter } from "next/router";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

import PerspectiveHover from "../../HOCs/PerspectiveHover";
import AddHoverAnimation from "../../HOCs/AddHoverAnimation";
import useSortTasks from "../../hooks/useSortTasks";

import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";
import Shortcuts from "../Shortcuts/Shortcuts";
import Todos from "../Todos/Todos";
import TasksCompleted from "../Event/TasksCompleted";
import StoriesCompleted from "../Event/StoriesCompleted";

const ProjectOverviewMain = ({ project }) => {
  const router = useRouter();

  let sortedTasks = (project.stories && useSortTasks(project.stories)) || [];
  const handleOverviewClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      router.push({
        pathname: `${router.asPath}/${project.projectName.toLowerCase()}`,
        query: { projectId: project.projectId },
      });
    }
  };
  const reduceDescription = (num, str) => {
    let result;
    if (str.split(" ").splice(0, str.length).length > num) {
      result = str.split(" ").splice(0, num).join(" ");
      return result + "...";
    }
    return str;
  };

  const imageTransition = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(40px) scale(0.8)",
    },
    opacity: 1,
    transform: "translateY(0px) scale(1)",
  });

  return (
    <PerspectiveHover>
      <section onClick={handleOverviewClick} className={styles.projectCard}>
        <animated.article className={styles.leftBar}>
          <header className={styles.cardHeader}>
            <h2>
              {project.projectName}
              <span className={styles.tag}>#{project.tag}</span>
            </h2>
            <DueDate days={project.dueDate} />
          </header>
          {project?.shortcuts && <Shortcuts shortcuts={project.shortcuts} />}
          <section className={styles.mainWrap}>
            <AddHoverAnimation>
              <article className={styles.description}>
                {reduceDescription(50, project.description)}
              </article>
            </AddHoverAnimation>
            {project.stories?.length > 0 && (
              <aside className={styles.stats}>
                <AddHoverAnimation>
                  <TasksCompleted stories={project.stories} />
                </AddHoverAnimation>
                <AddHoverAnimation>
                  <StoriesCompleted stories={project.stories} />
                </AddHoverAnimation>
              </aside>
            )}
          </section>
        </animated.article>
        <article className={styles.rightBar}>
          {sortedTasks.length > 0 && (
            <div>
              <header className={styles.rightBarHeader}>
                <h3>Tasks</h3>
              </header>
              {sortedTasks.length > 0 && <Todos todos={sortedTasks} />}
            </div>
          )}
          {sortedTasks.length === 0 && (
            <animated.div
              style={{
                ...imageTransition,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={`/images/illustrations/i_${Math.floor(
                  Math.random() * 8
                )}.svg`}
                height={200}
                width={200}
              />
            </animated.div>
          )}
        </article>
      </section>
    </PerspectiveHover>
  );
};

export default ProjectOverviewMain;
