<script setup lang="ts">
import Task from "@/components/Task.vue";
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
    <div class="tasks">
      <Task
          v-for="task of arr"
          :key="task.id"
          :task="task"
      />

    </div>

  </div>
</template>

<style lang="scss" scoped>
.tasks{
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: blueviolet;
  padding: 40px 20px;
}
</style> 
