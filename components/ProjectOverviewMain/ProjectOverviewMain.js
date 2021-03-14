import React from "react";
import { useRouter } from "next/router";

import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";
import Shortcuts from "../Shortcuts/Shortcuts";
import Todos from "../Todos/Todos";

const ProjectOverviewMain = ({ project }) => {
  let sortedTasks = [];
  (function sortTasks() {
    let idle = [];
    project.stories?.forEach((story) => {
      const doing = story?.tasks.filter((task) => task.type === "doing");
      const innerIdle = story?.tasks.filter((task) => task.type === "idle");
      idle = [...idle, ...innerIdle];
      sortedTasks = [...sortedTasks, ...doing];
    });
    sortedTasks = [...sortedTasks, ...idle];
  })();
  const router = useRouter();
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
  return (
    <section
      onClick={handleOverciewClick}
      className={styles.projectCard}
      // style={{
      //   background: `linear-gradient(-45deg, ${project.theme[0]}, ${project.theme[1]})`,
      // }}
    >
      <article className={styles.leftBar}>
        <header className={styles.cardHeader}>
          <h2>
            {project.projectName}
            <span className={styles.tag}>#{project.tag}</span>
          </h2>
          <DueDate days={project.dueDate} />
        </header>
        {project?.shortcuts && <Shortcuts shortcuts={project.shortcuts} />}
        <article className={styles.description}>
          {reduceDescription(70, project.description)}
        </article>
      </article>
      <article className={styles.rightBar}>
        <header className={styles.rightBarHeader}>
          <h3>STORIES</h3>
        </header>
        {sortedTasks.length > 0 && (
          <Todos todos={sortedTasks.map((task) => task.task)} />
        )}
      </article>
    </section>
  );
};

export default ProjectOverviewMain;
