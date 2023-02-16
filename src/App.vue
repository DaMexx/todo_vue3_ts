<script setup lang="ts">
import Task from "@/components/Task.vue";
import FilterBar from "@/components/FilterBar.vue";
import { ref, computed } from "vue";
import { useTasksStore } from "@/stores/tasks";

const tasksStore = useTasksStore()

let newTask = ref<string>('');
let selected = ref<string>('');
// let isREd = ref<boolean>(false)
function addNewTask(text:string){
  tasksStore.addNewTask(text);
  newTask.value = ''
}
let currentColor = computed<string>(()=>{
  return `${selected.value}` 
})
const tasks = useTasksStore().tasks
const filters = useTasksStore().filters

</script>

<template>
  <div id="app" :class="currentColor">
    <input 
      type="text" 
      v-model="newTask" 
      @keydown.enter="addNewTask(newTask)"
    >
    <button 
      @click="addNewTask(newTask)"
    >Ok
    </button>
{{ filters }}
    <div>=======================================</div>
    <FilterBar 
    :filters="filters"
    />
    <div class="tasks">
      <Task
          v-for="task of tasks"
          :key="task.id"
          :task="task"
          />
    </div>

    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>Red</option>
      <option>Blue</option>
      <option>Green</option>
      <option>none</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
#app{
  background: aqua;
}
.red{
  background: red !important;
}
.green{
  background: green !important;
}
.blue{
  background: green !important;
}
.tasks{
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: blueviolet;
  padding: 40px 20px;
}
</style> 
