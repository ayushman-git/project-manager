import React from "react";

import AddHoverAnimation from "../../HOCs/AddHoverAnimation";

import styles from "./Todos.module.scss";

export default function Todos(props) {
  let todos;
  if (props.todos.length) {
    todos = props.todos.map((todo, index) => (
      <AddHoverAnimation>
        <li className={styles.todo} key={index}>
          {todo}
        </li>
      </AddHoverAnimation>
    ));
  }
  return <ul className={styles.todosWrapper}>{todos}</ul>;
}
