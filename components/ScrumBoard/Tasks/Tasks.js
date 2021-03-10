const Tasks = ({ tasks, type }) => {
  let displayTasks;
  if (tasks) {
    displayTasks = tasks.map((task) => <li key={tasks.id}>{task.task}</li>);
  }
  return <ul>{displayTasks}</ul>;
};

export default Tasks;
