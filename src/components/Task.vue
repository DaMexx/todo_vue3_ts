<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { taskType } from "@/types/TodoTypes";

interface Props {
  task: taskType
}
const props = defineProps<Props>()
const tasksStore = useTasksStore()

function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}
const id = props.task.id
const content = props.task.content
const status = props.task.status

function editTask(id: number, content: string){
  tasksStore.editTask(id, content);
  isEditable.value = false;
}

function changeStatus(id: number){
  tasksStore.changeStatus(id)
}

const editContent = ref<null | {focus: ()=>null}>(null)

let newContent = content
  
let isEditable: Ref<boolean> = ref(false);

const showInputForEdit = () => {
  isEditable.value = true; 
  editContent.value?.focus()
}

</script>

<template>
  <li class="task">
    <input 
      type="checkbox" 
      name="status" 
      :checked="status"
      class="task__checkbox"
      @click="changeStatus(id)"
    >
    <span
      v-if="!isEditable"
      @dblclick.prevent="showInputForEdit"
      class="task__content"
    >{{ task.content }}</span>
    <input 
      v-else
      @blur="editTask(id, newContent)"
      @keydown.enter="editTask(id, newContent)"
      v-model="newContent"
      type="text"
      class="task__content--editable"
      autofocus
    >
    <button
        @click.prevent="deleteTask(id)"
        class="task__delete-button"
    >X</button>
  </li>
</template>

<style lang="scss" scoped>
.task{
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  background: aquamarine;
  border-radius: 30px;
  &__checkbox{
    margin: 10px 20px;
  }
  &__content{
    display: block;
    width: 100%;
    &--editable{
      width: 100%;
      text-decoration: none;
    }
  }
  &__delete-button{
    margin: 10px 20px;
  }
}
</style>
