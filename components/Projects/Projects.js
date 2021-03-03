import React from "react";
import Card from "../SecondaryCards/SecondaryCards";
import styles from "./Projects.module.scss";

export default function Projects(props) {
  console.log(props.projects);
  let cards;
  if (props.projects.length) {
    cards = props.projects.map((project) => (
      <Card
        key={project.id}
        title={project.projectName}
        days={project.dueDate}
        theme={project.theme}
      />
    ));
  }
  return <div className={styles.projects}>{cards}</div>;
}
