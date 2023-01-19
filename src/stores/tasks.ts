import { ref, computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

interface TASK {
  id: number;
  status: boolean;
  content: string;
}

export const useTasksStore = defineStore("tasks", () => {

  const tasks: Ref<TASK[]> = ref([
    {
      id: 1,
      content: "GOVNO",
      status: false,
    },
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
