<script setup lang="ts">
import { Task, FilterBar } from "@/components";
import {
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  reactive,
  onUpdated,
} from "vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";

const tasksStore = useTasksStore();
const { clearCompleted, checkAllTasks, logAllData } = tasksStore;
const {
  getCurrentTasks,
  currentFilter,
  getCountOfCompletedTasks,
  isAllTasksCompleted,
  tasksLength,
} = storeToRefs(tasksStore);
const input = ref<any>(null);
const asd = ref<any>(null);
const reactiveProp = reactive({
  firstName: "asd" as string,
  lastName: "zxc" as string,
});
let statuses = ref<boolean>(false);

let newTask = ref<string>("");

const showDeleteButton = computed<boolean>(() =>
  getCountOfCompletedTasks.value === 0 ? true : false
);

onMounted(() => {});
let activeTasksColor = computed<boolean>(() =>
  currentFilter.value === "active" ? true : false
);
let allTasksColor = computed<boolean>(() =>
  currentFilter.value === "all" ? true : false
);
let completedTasksColor = computed<boolean>(() =>
  currentFilter.value === "complete" ? true : false
);

const addNewTask = (text: string) => {
  tasksStore.addNewTask(text);
  newTask.value = "";
};
const checkAll = async () => {
  checkAllTasks(input.value.checked);
  await nextTick();
};

onMounted(() => {
  // console.log("input", input);
  // console.log("isAllTasksCompleted", isAllTasksCompleted.value);
  // console.log("reactiveProp", reactiveProp);
  // console.log("reactiveProp-name", reactiveProp.firstName);
  logAllData();
});
</script>

<template>
  <div id="app">
    <div class="header">
      <h1 class="app__title">My Awesome Todo</h1>
      <div class="app__input-container">
        <input
          class="input-container__input"
          type="text"
          v-model.trim="newTask"
          @keydown.enter="addNewTask(newTask)"
        />
        <button
          class="input-container__button"
          @click="addNewTask(newTask)"
          v-html="'Add'"
        />
      </div>
      <FilterBar />

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
        <Task v-for="task of getCurrentTasks" :key="task.id" :task="task" />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  background: #20c997;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 17px;
  height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  font-weight: normal;
}

.header {
  background: #6f42c1;
}

.hero {
  padding: 1em 2em;
  height: 100%;
}

.app__title {
  text-align: center;
  padding: 1em;
}

.app__input-container {
  display: flex;
  padding: 1em;

  justify-content: center;
}

.input-container {
  &__input {
    display: block;
    width: 45%;
  }

  &__button {
    display: block;
    width: 5%;
  }
}

.red {
  background: red;
}

.green {
  background: green;
}

.blue {
  background: blue;
}

.tasks {
  padding: 40px 20px;
}
</style>
