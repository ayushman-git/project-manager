import React, { useRef, useEffect } from "react";

import Card from "../SecondaryCards/SecondaryCards";
import styles from "./Projects.module.scss";

export default function Projects(props) {
  const projectRef = useRef();
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
    useEffect(() => {
      (function () {
        function scrollHorizontally(e) {
          e = window.event || e;
          var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
          projectRef.current.scrollLeft -= delta * 40; // Multiplied by 40
          e.preventDefault();
        }
        // IE9, Chrome, Safari, Opera
        projectRef.current.addEventListener(
          "mousewheel",
          scrollHorizontally,
          false
        );
        // Firefox
        projectRef.current.addEventListener(
          "DOMMouseScroll",
          scrollHorizontally,
          false
        );
      })();
    }, []);
  }
  return (
    <div ref={projectRef} className={styles.projects}>
      {cards}
    </div>
  );
}
