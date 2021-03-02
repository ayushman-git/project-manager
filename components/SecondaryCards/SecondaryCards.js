import React from "react";
import styles from "./SecondaryCards.module.scss";
import DueDate from "../DueDate/DueDate";

export default function SecondaryCards(props) {
  return (
    <section
      className={styles.card}
      style={{
        background: `linear-gradient(-45deg, ${props.theme.start}, ${props.theme.end})`,
      }}
    >
      <h3>{props.title}</h3>
      <DueDate days={props.days} />
    </section>
  );
}
