import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

import useHoverCard from "../../hooks/useHoverCard";
import AddHoverAnimation from "../../HOCs/AddHoverAnimation";

import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";
import Shortcuts from "../Shortcuts/Shortcuts";
import Todos from "../Todos/Todos";
import TasksCompleted from "../Event/TasksCompleted";
import StoriesCompleted from "../Event/StoriesCompleted";

const ProjectOverviewMain = ({ project }) => {
  const router = useRouter();

  const [calc, trans] = useHoverCard();

  let sortedTasks = [];

  (function sortTasks() {
    let idle = [];
    project?.stories?.forEach((story) => {
      const doing = story?.tasks.filter((task) => task.type === "doing");
      const innerIdle = story?.tasks.filter((task) => task.type === "idle");
      idle = [...idle, ...innerIdle];
      sortedTasks = [...sortedTasks, ...doing];
    });
    sortedTasks = [...sortedTasks, ...idle];
  })();
  const handleOverciewClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      router.push({
        pathname: `${router.asPath}/${project.projectName.toLowerCase()}`,
        query: { projectId: project.projectId },
        as: `${router.asPath}/${project.projectName.toLowerCase()}`,
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

  const mouseMove = ({ clientX: x, clientY: y }) => {
    set({ xys: calc(x, y) });
  };

  const [hoverAnimation, set] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: "translateY(40px) scale(0.8)",
    },
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <animated.section
      onClick={handleOverciewClick}
      className={styles.projectCard}
      onMouseMove={mouseMove}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: hoverAnimation.xys.interpolate(trans),
        opacity: hoverAnimation.opacity.interpolate((o) => o),
      }}
    >
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
            {sortedTasks.length > 0 && (
              <Todos todos={sortedTasks.map((task) => task.task)} />
            )}
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
    </animated.section>
  );
};

export default ProjectOverviewMain;
