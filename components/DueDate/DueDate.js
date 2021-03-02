import React from "react";
import styles from "./DueDate.module.scss";

export default function DueDate(props) {
  return <div className={styles.dueCard}>{props.days} Days Left</div>;
}
