<script setup lang="ts">
//vue
import { ref, computed, onMounted, nextTick } from "vue";
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

let newTask = ref<string>("");
const addNewTask = (text: string) => {
  tasksStore.addNewTask(text);
  newTask.value = "";
};
</script>

<template>
  <div class="input-container">
    <input class="input-container__input" type="text" v-model.trim="newTask" placeholder="What need to be done?"
      @keydown.enter="addNewTask(newTask)" />
    <!-- <button
        class="input-container__button"
        @click="addNewTask(newTask)"
        v-html="'Add'"
      /> -->
  </div>
</template>
<style scoped lang="scss">
.input-container {
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.input-container__input {
  width: 100%;
  padding: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  // box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    &:focus{
      outline: none;
    }
}
</style>
