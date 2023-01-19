<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { ref } from "vue";
import type { Ref } from "vue";

const tasksStore = useTasksStore()
function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}
defineProps<{
  task: { content: string, id: number, status: boolean },
}>()
let isEditable = ref(false);
const edit:Ref<null> = ref(null)
const editTask = () => {isEditable.value = true
  edit.value.focus()};
const cancel = () => isEditable.value = false;
</script>

<template>
  <div>
    <input 
      type="checkbox" 
      name="status" 
      :id:number="task.id" 
      :checked="task.status"
    >
    <span
      v-if="!isEditable"
      @dblclick="editTask"
     
    >{{ task.content }}</span>
    <input 
       v-else
      type="text"
      @blur="cancel"
      ref="edit"
      :value="task.content"
      autofocus
    >
    <!-- <input type="text"> -->
    <button @click.prevent="deleteTask(task.id)">X</button>
  </div>
</template>