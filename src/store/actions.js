import { storageSetItem, storageGetItem } from '../utils/storage';

export default {
  createTask({ commit, getters }, payload) {
    commit('createTask', payload);
    storageSetItem('tasks', getters.getTasks);
  },
  loadFromStorage({ commit }) {
    commit('updateTasks', storageGetItem('tasks'));
  },
  updateTaskStatus({ commit, getters }, payload) {
    const tasks = getters.getTasks.map((task) => {
      if (task.id === +payload.id) {
        task.status = payload.status;
      }
      return task;
    });
    commit('updateTasks', tasks);
    storageSetItem('tasks', getters.getTasks);
  },
};
