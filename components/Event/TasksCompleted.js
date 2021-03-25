import EventCompleted from "../EventCompleted/EventCompleted";

const TasksCompleted = ({ stories }) => {
  let completed = 0;
  let total = 0;
  stories?.forEach((story) => {
    story.tasks.forEach((task) => {
      if (task.type === "done") {
        completed++;
      }
      total++;
    });
  });
  return (
    <div>
      <strong className="mini-heading">Tasks Completed</strong>
      <EventCompleted completed={completed} total={total} />
    </div>
  );
};

export default TasksCompleted;
