export default {
  createTask(
    state,
    {
      id,
      name,
      date,
      description,
      status,
    },
  ) {
    state.tasks.push({
      id,
      name,
      date,
      description,
      status,
    });
  },
  updateTasks(state, payload) {
    state.tasks = payload || [];
  },
  changeTasksFilterVal(state, payload) {
    state.tasksFilterVal = payload;
  },
};
