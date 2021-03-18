import React, { useRef } from "react";

import enableVerticleScroll from "../../hooks/enableVerticleScroll";

import Card from "../SecondaryCards/SecondaryCards";
import styles from "./Projects.module.scss";

export default function Projects({ projects }) {
  const projectRef = useRef();

  let cards;

  enableVerticleScroll(projectRef);

  if (projects.length) {
    cards = projects.map((project) => (
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
  return (
    <div ref={projectRef} className={styles.projects}>
      {cards}
    </div>
  );
}
