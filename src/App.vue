<script setup lang="ts">
import Task from "@/components/Task.vue";
import FilterBar from "@/components/FilterBar.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from 'pinia';

const tasksStore = useTasksStore();
const { deleteCompletedTasks, checkAllTasks } = tasksStore;
const { getCurrentTasks, currentFilter, getCountOfCompletedTasks } = storeToRefs(tasksStore);

const statuses = ref<boolean>(false);

let newTask = ref<string>('');

const showDeleteButton = computed<boolean>(() => getCountOfCompletedTasks.value === 0 ? true : false)

onMounted(() => { })
let activeTasksColor = computed<boolean>(() => currentFilter.value === 'active' ? true : false);
let allTasksColor = computed<boolean>(() => currentFilter.value === 'all' ? true : false);
let completedTasksColor = computed<boolean>(() => currentFilter.value === 'complete' ? true : false);


function addNewTask(text: string) {
  tasksStore.addNewTask(text);
  newTask.value = ''
}

</script>

<template>
  <div id="app">
    <div class="header">
      <h1 class="app__title">My Awesome Todo</h1>
      <div class="app__input-container">
        <input class="input-container__input" type="text" v-model="newTask" @keydown.enter="addNewTask(newTask)">
        <button class="input-container__button" @click="addNewTask(newTask)" v-html="'Add'" />
      </div>
      <FilterBar />
      <input type='checkbox' v-model="statuses" class="input-container__button" @click="checkAllTasks(value)" v-html="'CHECK'" />
    </div>
    <div class="hero">

      
      <button :disabled="showDeleteButton" @click.prevent="deleteCompletedTasks(statuses)">DELETE</button>
      <div class="tasks" :class="{
        red: activeTasksColor,
        green: allTasksColor,
        blue: completedTasksColor
      }">
        <Task v-for="task of getCurrentTasks" :key="task.id" :task="task" />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
#app {
  background: #20c997;;
  font-family: Georgia, 'Times New Roman', Times, serif;
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
  padding: 0 2em;
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
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 40px 20px;
}
</style> 
