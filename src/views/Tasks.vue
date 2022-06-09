<template>
  <h1 v-if="!tasks.length" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <div class="d-flex align-center justify-content-btw">
      <h3 class="text-white">Всёго активных задач: {{ activeTasksCount }}</h3>
      <TaskFilter
        :options="selectOptions"
      />
    </div>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="card"
    >
      <h2 class="card-title">
        {{ task.name }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <router-link :to="{ name: 'task', params: { id: task.id } }" custom v-slot="{ navigate }">
        <button class="btn primary" @click="navigate">Посмотреть</button>
      </router-link>
    </div>
  </template>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import AppStatus from '../components/AppStatus.vue';
import TaskFilter from '../components/TaskFilter.vue';

const FILTER_OPTIONS = [
  {
    value: 'active',
    text: 'Активные',
    disabled: false,
  },
  {
    value: 'done',
    text: 'Завершонные',
    disabled: false,
  },
  {
    value: 'cancelled',
    text: 'Отменённые',
    disabled: false,
  },
  {
    value: 'pending',
    text: 'Выполняются',
    disabled: false,
  },
];

export default {
  components: {
    AppStatus,
    TaskFilter,
  },
  setup() {
    const { dispatch, getters } = useStore();
    const activeTasksCount = ref(0);
    const tasks = computed(() => getters.getFilteredTasks);
    const selectOptions = computed(() => FILTER_OPTIONS.map((option) => {
      const result = getters.getTasks.find((task) => task.status === option.value);
      if (result) option.disabled = false;
      else option.disabled = true;
      return option;
    }));

    onMounted(() => {
      dispatch('loadFromStorage');
      if (tasks.value.length) {
        activeTasksCount.value = getters.getActiveTasksCount;
      }
    });

    return {
      tasks,
      activeTasksCount,
      selectOptions,
    };
  },
};
</script>
