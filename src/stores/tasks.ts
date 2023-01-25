import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { taskType } from "@/types/TodoTypes";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<taskType[]>([
  ]);
  const currentFilter = ref<string>('');
  const filters = ref<string[]>(['all','active','complete'])

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

  const editTask = (id: number, content: string) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].content = content
  }

  const changeStatus = (id: number) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].status = !tasks.value[taskIndex].status
  }

  return { 
    tasks,
    currentFilter,
    filters,
    addNewTask,
    deleteTask, 
    editTask, 
    changeStatus 
    };
});

