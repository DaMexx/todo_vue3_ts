<script setup lang="ts">
import TASK from "@/components/TASK.vue";
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";

const tasksStore = useTasksStore()

let newTask = ref('');

function addNewTask(text:string){
  tasksStore.addNewTask(text);
  newTask.value = ''
}

const arr = useTasksStore().tasks

</script>

<template>
  <div>
    <input 
      type="text" 
      v-model="newTask" 
      @keydown.enter="addNewTask(newTask)"
    >
    <button 
      @click="addNewTask(newTask)"
    >Ok
    </button>

    <div>=======================================</div>

    <TASK 
      v-for="task in arr" 
      :key="task.id" 
      :task="task"
    />

  </div>
</template>

<style scoped>
</style> 
