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
      <h6>Tasks Completed</h6>
      <EventCompleted completed={completed} total={total} />
    </div>
  );
};

export default TasksCompleted;
