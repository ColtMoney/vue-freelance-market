<template>
  <AppLoader v-if="loader" />
  <div v-else-if="isTaskExist" class="card">
    <h2>Название задачи</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="updateStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="updateStatus('done')">Завершить</button>
      <button class="btn danger" @click="updateStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import { useStore } from 'vuex';
import {
  onMounted,
  ref,
  computed,
} from 'vue';

import AppStatus from '../components/AppStatus.vue';
import AppLoader from '../components/AppLoader.vue';

export default {
  props: ['id'],
  components: {
    AppStatus,
    AppLoader,
  },
  setup(props) {
    const { dispatch, getters } = useStore();
    const task = ref({});
    const loader = ref(true);
    const isTaskExist = computed(() => Object.keys(task.value).length);

    onMounted(() => {
      setTimeout(() => {
        dispatch('loadFromStorage');
        task.value = getters.getTaskById(props.id) || {};
        loader.value = false;
      }, 300);
    });

    function updateStatus(status) {
      dispatch('updateTaskStatus', { status, id: props.id });
    }

    return {
      task,
      loader,
      isTaskExist,
      updateStatus,
    };
  },
};
</script>
