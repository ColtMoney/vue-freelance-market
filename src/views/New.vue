<template>
  <form class="card" @submit.prevent="onCreateTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="name">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="description"></textarea>
    </div>

    <button class="btn primary" :disabled="isFieldEmpty">Создать</button>
  </form>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const { dispatch } = useStore();
    const name = ref('');
    const date = ref('');
    const description = ref('');
    const isFieldEmpty = computed(() => {
      if (name.value && date.value && description.value) return false;
      return true;
    });

    function onCreateTask() {
      const status = new Date(date.value).getTime() > new Date().getTime() ? 'active' : 'cancelled';

      dispatch('createTask', {
        id: Math.floor(Math.random() * Date.now()),
        name,
        date,
        description,
        status,
      });
      router.push({ name: 'home' });
    }

    return {
      name,
      date,
      description,
      isFieldEmpty,
      onCreateTask,
    };
  },
};
</script>
