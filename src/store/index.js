import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export default createStore({
  state: {
    tasks: [],
    tasksFilterVal: 'all',
  },
  mutations,
  actions,
  getters: {
    getTasks: (state) => state.tasks,
    getActiveTasksCount: (state) => state.tasks.reduce((accumulator, task) => {
      if (task.status === 'active') accumulator += 1;
      return accumulator;
    }, 0),
    getTaskById: (state) => (id) => state.tasks.find((task) => task.id === +id),
    getFilteredTasks: (state) => state.tasks.filter((task) => {
      if (state.tasksFilterVal === 'all') return task;
      return task.status === state.tasksFilterVal;
    }),
    getTasksFilterVal: (state) => state.tasksFilterVal,
  },
});
