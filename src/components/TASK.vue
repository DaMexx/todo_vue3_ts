<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
const tasksStore = useTasksStore()
function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}
defineProps<{
  task: { content: string, id: number, status: boolean },
}>()
</script>

<template>
  <div>
    <input 
      type="checkbox" 
      name="status" 
      :id:number="task.id" 
      :checked="task.status"
    >
    <span>{{ task.content }}</span>
    <!-- <input type="text"> -->
    <button @click.prevent="deleteTask(task.id)">X</button>
  </div>
</template>