<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { ref } from "vue";
import type { Ref } from "vue";

const tasksStore = useTasksStore()
function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}
// defineProps<{
//   task: { content: string, id: number, status: boolean },
// }>()
const props = defineProps<{
  task:
  {
    content: string,
    id: number,
    status: boolean
  },
}>()
let isEditable = ref(false);
const edit:Ref<null> = ref(null)
const editTask = () => isEditable.value = true
const cancel = () => isEditable.value = false;
// console.log('task', task);

let taskContent: Ref<String> = ref(props.task.content)
console.log('task', taskContent);

</script>

<template>
  <div class="task">
    <input 
      type="checkbox" 
      name="status" 
      :id:number="task.id" 
      :checked="task.status"
      class="task__checkbox"
    >
    <span
      v-if="!isEditable"
      @dblclick="editTask"
      class="task__content"
    >{{ task.content }}</span>
    <input 
       v-else
      type="text"
      @blur="cancel"
      ref="edit"
      v-model="taskContent"
       class="task__content--editable"
    >
    <!-- <input type="text"> -->
    <button
        @click.prevent="deleteTask(task.id)"
        class="task__delete-button"
    >X</button>
  </div>
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