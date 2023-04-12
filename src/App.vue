<script setup lang="ts">
//components
import { Task, FilterBar } from "@/components";
import Header from '@/components/Header/index.vue'
import TaskBar from "./components/TaskBar/index.vue";
//vue
import { ref, computed, onMounted, nextTick } from "vue";
//store
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";

//referense
//https://todomvc.com/examples/vanillajs/#/
const tasksStore = useTasksStore();
const { clearCompleted, checkAllTasks } = tasksStore;
const {
  getCurrentTasks,
  currentFilter,
  getCountOfCompletedTasks,
  isAllTasksCompleted,
  tasksLength,
} = storeToRefs(tasksStore);

const input = ref<any>(null);
const asd = ref<any>(null);

const showDeleteButton = computed<boolean>(() =>
  getCountOfCompletedTasks.value === 0 ? true : false
);

let activeTasksColor = computed<boolean>(() =>
  currentFilter.value === "active" ? true : false
);

let allTasksColor = computed<boolean>(() =>
  currentFilter.value === "all" ? true : false
);

let completedTasksColor = computed<boolean>(() =>
  currentFilter.value === "complete" ? true : false
);

const checkAll = async () => {
  checkAllTasks(input.value.checked);
  await nextTick();
};

</script>

<template>
  <div id="app">
    <Header />
    <div>
      <h1 class="todo__title">My Awesome Todo</h1>
      <TaskBar />
    </div>

<!--       
      <input
        type="checkbox"
        :disabled="tasksLength"
        v-model="isAllTasksCompleted"
        ref="input"
        class="input-container__button"
        @change="checkAll"
      />
      <span ref="asd">Check all tasks</span>
      <button :disabled="showDeleteButton" @click.prevent="clearCompleted()">
        DELETE
      </button>
    </div>
    <div class="hero">
      <ul
        class="tasks"
        :class="{
          red: activeTasksColor,
          green: allTasksColor,
          blue: completedTasksColor,
        }"
      >
    
      </ul> -->
  </div>
</template>

<style lang="scss" scoped>

</style>
