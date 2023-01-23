<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { taskType } from "@/types/TodoTypes";

const tasksStore = useTasksStore()
function deleteTask(id: number) {
  tasksStore.deleteTask(id);
}
let props = defineProps<{
  task: Ref<taskType>
}>()


// defineProps<{
//   content: string,
//   status: boolean,
//   id: number
// }>()
const task = computed(()=>{
  return props.task.value
})

console.log(task.value);

// withDefaults(defineProps<{
//    title?: string
//    likes: number,
//  }>(), {
//      // here we have default values
//      title: '---',
//  })





let isEditable: Ref<boolean> = ref(false);
const editTask = () => isEditable.value = true
const cancel = () => isEditable.value = false;


</script>

<template>
  <div class="task">
    <input 
      type="checkbox" 
      name="status" 
      :id="task.id" 
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
       class="task__content--editable"
    >
    <button
        @click.prevent="deleteTask(task.id)"
        class="task__delete-button"
    >X</button>
  </div> -->
  <!-- <div>{{status}}</div>
  <div>{{id}}</div>
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
