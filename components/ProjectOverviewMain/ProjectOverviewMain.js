import React, { useState } from "react";
import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";
import Shortcuts from "../Shortcuts/Shortcuts";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function ProjectOverviewMain() {
  const [shortcuts] = useState([
    {
      title: "Firebase",
      url:
        "https://console.firebase.google.com/project/project-manager-dd0f2/overview",
      image: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
    },
    {
      title: "Firebase",
      url:
        "https://console.firebase.google.com/project/project-manager-dd0f2/overview",
      image: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
    },
  ]);
  return (
    <section className={styles.projectCard}>
      <article className={styles.leftBar}>
        <header className={styles.cardHeader}>
          <h2>
            Astronomia<span className={styles.tag}>#Programming</span>
          </h2>
          <DueDate />
        </header>
        <Shortcuts shortcuts={shortcuts} />
        <ProgressBar storiesDone={20} totalStories={40} />
      </article>
      <article className={styles.rightBar}>hi</article>
    </section>
  );
}
