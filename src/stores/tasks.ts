import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { taskType } from "@/types/TodoTypes";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<taskType[]>([
  ]);
  const filters: string[] = ['all', 'active', 'complete']
  const currentFilter = ref<string>('');

  const addNewTask = (content: string): void => {
    if (content.trim()) {
      let task = {
        id: Date.now(),
        content: content,
        status: false,
      };
      tasks.value.push(task);
    }
  };

  const getCurrentFilter = computed(() => { })

  const deleteTask = (id: number): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value.splice(taskIndex, 1);
  };

  const editTask = (id: number, content: string): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].content = content
  }

  const changeStatus = (id: number): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].status = !tasks.value[taskIndex].status
  }

  const toogleFilter = (filter: string): void => {
    currentFilter.value = filter;
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

