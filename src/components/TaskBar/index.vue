<script setup lang="ts">
//components
import TaskBarFilter from './TaskBarFilter.vue';
import TaskBarInput from './TaskBarInput.vue';
import TaskBarItem from './TaskBarItem.vue';
//vue
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";


const tasksStore = useTasksStore();
const { clearCompleted, checkAllTasks } = tasksStore;
const {
  getCurrentTasks,
  currentFilter,
  getCountOfCompletedTasks,
  isAllTasksCompleted,
  tasksLength,
} = storeToRefs(tasksStore);
</script>


<template>
  <div class="wrapper">
    <TaskBarInput />
    <ul class="todo__container">
      <TaskBarItem v-for="task in getCurrentTasks" :task="task" :key="task.id" />
    </ul>
    <TaskBarFilter />
  </div>
</template>

<style scoped lang="scss">
.todo__container {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper {
  margin: 0 auto;
  max-width: 40%;
}
</style>