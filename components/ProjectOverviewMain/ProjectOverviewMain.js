import React from "react";
import styles from "./ProjectOverviewMain.module.scss";
import DueDate from "../DueDate/DueDate";

export default function ProjectOverviewMain() {
  return (
    <section className={styles.projectCard}>
      <header className={styles.cardHeader}>
        <h2>
          Astronomia<span className={styles.tag}>#Programming</span>
        </h2>
        <DueDate />
      </header>
    </section>
  );
}
