import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";
import Shortcuts from "../Shortcuts/Shortcuts";
import ProgressBar from "../ProgressBar/ProgressBar";
import Todos from "../Todos/Todos";

const ProjectOverviewMain = (props) => {
  const [todos] = useState([
    { description: "Complete astronomia" },
    { description: "Complete login" },
    { description: "Update leveling" },
  ]);
  const router = useRouter();
  return (
    <Link href={`${router.asPath}/${props.project.projectName.toLowerCase()}`}>
      <section
        className={styles.projectCard}
        style={{
          background: `linear-gradient(-45deg, ${props.project.theme[0]}, ${props.project.theme[1]})`,
        }}
      >
        <article className={styles.leftBar}>
          <header className={styles.cardHeader}>
            <h2>
              {props.project.projectName}
              <span className={styles.tag}>#{props.project.tag}</span>
            </h2>
            <DueDate days={props.project.dueDate} />
          </header>
          <Shortcuts shortcuts={JSON.parse(props.project.shortcuts)} />
          <ProgressBar storiesDone={20} totalStories={40} />
        </article>
        <article className={styles.rightBar}>
          <header className={styles.rightBarHeader}>
            <h3>STORIES</h3>
          </header>
          <Todos todos={todos} />
        </article>
      </section>
    </Link>
  );
};

export default ProjectOverviewMain;
