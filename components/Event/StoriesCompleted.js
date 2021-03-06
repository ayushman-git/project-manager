import EventCompleted from "../EventCompleted/EventCompleted";

const StoriesCompleted = ({ stories }) => {
  let completed = 0;
  let total = 0;
  stories?.forEach((story) => {
    let c = 0;
    story.tasks.forEach((task) => {
      if (task.type === "done") {
        c++;
      }
    });
    if (c === story.tasks.length) completed++;
    total++;
  });
  return (
    <div>
      <strong className="mini-heading">Stories Completed</strong>
      <EventCompleted completed={completed} total={total} />
    </div>
  );
};

export default StoriesCompleted;
