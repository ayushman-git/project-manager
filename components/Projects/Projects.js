import React from "react";

import Card from "../SecondaryCards/SecondaryCards";
import styles from "./Projects.module.scss";

export default function Projects(props) {
  let cards;
  if (props.projects.length) {
    cards = props.projects.map((project) => (
      <Card
        key={project.projectId}
        title={project.projectName}
        days={project.dueDate}
        theme={project.theme}
        projectName={project.projectName}
        projectId={project.projectId}
      />
    ));
  }
  return <div className={styles.projects}>{cards}</div>;
}
