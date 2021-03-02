import React from "react";
import Card from "../SecondaryCards/SecondaryCards";
import styles from "./Projects.module.scss";

export default function Projects(props) {
  let cards;
  if (props.projects.length) {
    cards = props.projects.map((project, index) => (
      <Card
        key={index}
        title={project.title}
        days={project.days}
        theme={project.theme}
      />
    ));
  }
  return <div className={styles.projects}>{cards}</div>;
}
