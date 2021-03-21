import React from "react";

import AddHoverAnimation from "../../HOCs/AddHoverAnimation";

import styles from "./Todos.module.scss";

export default function Todos({ todos }) {
  let todosView;
  if (todos.length) {
    todosView = todos.map((todo) => (
      <AddHoverAnimation key={todo.id}>
        <li className={styles.todo}>{todo.task}</li>
      </AddHoverAnimation>
    ));
  }
  return <ul className={styles.todosWrapper}>{todosView}</ul>;
}
