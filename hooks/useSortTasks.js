const useSortTasks = (stories) => {
  let idle = [];
  let sortedTasks = [];
  stories.forEach((story) => {
    const doing = story?.tasks.filter((task) => task.type === "doing");
    const innerIdle = story?.tasks.filter((task) => task.type === "idle");
    idle = [...idle, ...innerIdle];
    sortedTasks = [...sortedTasks, ...doing];
  });
  sortedTasks = [...sortedTasks, ...idle];
  return sortedTasks;
};

export default useSortTasks;
