<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useTasksStore } from "@/stores/tasks";
import type { taskType } from "@/types/TodoTypes";

interface Props {
  task: taskType
}
const props = defineProps<Props>();
const tasksStore = useTasksStore();

function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}

const id = props.task.id
const content = props.task.content
const status = props.task.status

function editTask(id: number, content: string) {
  tasksStore.editTask(id, content);
  isEditable.value = false;
}

function changeStatus(id: number) {
  tasksStore.changeStatus(id)
}

const input = ref<null | { focus: () => null }>(null)

let newContent = content

let isEditable = ref<boolean>(false);

const makeEdit = async () => {
  isEditable.value = true;
  await nextTick()
  input.value?.focus()
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
      @dblclick.prevent="makeEdit" 
      class="task__content"
    > 
    {{ task.content }}
    </span>
    <input 
      v-show="isEditable" 
      @blur="editTask(id, newContent)" 
      @keydown.enter="editTask(id, newContent)"
      v-model="newContent" 
      ref="input" 
      type="text" 
      class="task__content--editable"
    >
    <button 
    @click.prevent="deleteTask(id)" 
    class="task__delete-button"
    >
      X
    </button>
  </li>
</template>

<style lang="scss" scoped>
.task {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  background: aquamarine;
  border-radius: 30px;

  &__checkbox {
    margin: 10px 20px;
  }

  &__content {
    display: block;
    width: 100%;

    &--editable {
      width: 100%;
      text-decoration: none;
    }
  }

  &__delete-button {
    margin: 10px 20px;
  }
}
</style>
