import React from "react";
import styles from "./Todos.module.scss";

export default function Todos(props) {
  let todos;
  if (props.todos.length) {
    todos = props.todos.map((todo, index) => (
      <li className={styles.todo} key={index}>
        {todo.description}
      </li>
    ));
  }
  return <ul className={styles.todosWrapper}>{todos}</ul>;
}
