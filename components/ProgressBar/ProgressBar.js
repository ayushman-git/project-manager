import React from "react";
import styles from "./ProgressBar.module.scss";
export default function ProgressBar(props) {
  return (
    <progress
      className={styles.progressBar}
      value={props.storiesDone}
      max={props.totalStories}
    ></progress>
  );
}
