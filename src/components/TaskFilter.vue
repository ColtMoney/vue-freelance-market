<template>
  <div class="form-control mb-0">
    <select @change="taskFilter" v-model="filterValue">
      <option value="all">Показать всё</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>

import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { getters, commit } = useStore();
    const filterValue = ref(getters.getTasksFilterVal);

    function taskFilter() {
      commit('changeTasksFilterVal', filterValue.value);
    }

    return {
      filterValue,
      taskFilter,
    };
  },
};
</script>
