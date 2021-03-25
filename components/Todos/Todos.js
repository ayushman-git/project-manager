import React from "react";

import AddHoverAnimation from "../../HOCs/AddHoverAnimation";

import styles from "./Todos.module.scss";

export default function Todos({ todos }) {
  let todosView;
  if (todos.length) {
    todosView = todos.map((todo) => (
      <li className={styles.todo} key={todo.id}>
        <AddHoverAnimation>{todo.task}</AddHoverAnimation>
      </li>
    ));
  }
  return <ul className={styles.todosWrapper}>{todosView}</ul>;
}
