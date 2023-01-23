import { ref, computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { taskType } from "@/types/TodoTypes";

export const useTasksStore = defineStore("tasks", () => {
  const tasks: Ref<taskType[]> = ref([
  ]);

  const addNewTask = (content: string) => {
    if (content.trim()) {
      let task = {
        id: Date.now(),
        content: content,
        status: false,
      };
      tasks.value.push(task);
    }
  };

  const deleteTask = (id: number) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value.splice(taskIndex, 1);
  };

  return { tasks, addNewTask, deleteTask };
});
