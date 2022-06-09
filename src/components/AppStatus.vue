<template>
  <span :class="['badge', type]">{{ statusText[type] }}</span>
</template>

<script>

import { TASK_STATUSES } from '../constants';

const STATUS_TEXT = {
  active: 'Активен',
  done: 'Завершен',
  cancelled: 'Отменен',
  pending: 'Выполняется',
};

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => TASK_STATUSES.includes(val),
    },
  },
  setup() {
    return {
      statusText: STATUS_TEXT,
    };
  },
};
</script>
