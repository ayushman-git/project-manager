import React, { useState } from "react";
import styles from "./SecondaryCards.module.scss";
import DueDate from "../DueDate/DueDate";
import firebase from "firebase";

export default function SecondaryCards(props) {
  const getDaysLeft = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const diffDays = Math.round(
      Math.abs((today - new Date(props.days)) / oneDay)
    );
    return diffDays;
  };
  getDaysLeft();
  return (
    <section
      className={styles.card}
      style={{
        background: `linear-gradient(-45deg, ${props.theme[0]}, ${props.theme[1]})`,
      }}
    >
      <h3>{props.title}</h3>
      <DueDate days={getDaysLeft()} />
    </section>
  );
}
