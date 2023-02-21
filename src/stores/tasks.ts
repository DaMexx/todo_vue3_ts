import { ref, computed, reactive, nextTick } from "vue";
import { defineStore } from "pinia";
import type { taskType, filterType } from "@/types";

export const useTasksStore = defineStore("tasks", () => {
  const lS: taskType[] = JSON.parse(localStorage.tasks || "{}")._value;

  let tasks = ref<taskType[]>(lS || []);

  const CURRENT_FILTER = ref<string>(localStorage.filter || "all");

  const addNewTask = (content: string): void => {
    if (content.trim()) {
      let task = {
        id: Date.now(),
        content,
        status: false,
      };
      tasks.value.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getActiveTasks = computed<taskType[]>(() => {
    return tasks.value.filter((el: taskType) => !el.status);
  });

  const getCompletedTasks = computed<taskType[]>(() => {
    return tasks.value.filter((el: taskType) => el.status);
  });

  const getCurrentTasks = computed<taskType[]>(() => {
    if (CURRENT_FILTER.value === "all") {
      return tasks.value;
    } else if (CURRENT_FILTER.value === "active") {
      return getActiveTasks.value;
    } else {
      return getCompletedTasks.value;
    }
  });

  const tasksLength = computed<boolean>(() =>
    tasks.value.length === 0 ? true : false
  );

  const getCountOfActiveTasks = computed<number>(() => tasks.value.length);
  const getCountOfAllTasks = computed<number>(
    () => getActiveTasks.value.length
  );
  const getCountOfCompletedTasks = computed<number>(
    () => getCompletedTasks.value.length
  );

  const isAllTasksCompleted = computed<boolean>(() => {
    if (tasks.value.length) {
      return tasks.value.every((el) => el.status);
    }
    return false;
  });

  const filters = reactive<filterType[]>([
    { type: "all", count: getCountOfAllTasks as unknown as number },
    { type: "active", count: getCountOfActiveTasks as unknown as number },
    { type: "complete", count: getCountOfCompletedTasks as unknown as number },
  ]);

  const deleteTask = (id: number): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const editTask = (id: number, content: string): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].content = content;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const changeStatus = (id: number): void => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    tasks.value[taskIndex].status = !tasks.value[taskIndex].status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const toggleFilter = (filter: string): void => {
    localStorage.setItem("filter", filter);
    CURRENT_FILTER.value = filter;
  };

  const clearCompleted = (): void => {
    tasks.value = getActiveTasks.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const checkAllTasks = (status: boolean) => {
    tasks.value.forEach((el) => (el.status = status));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const logAllData = () => {
    console.log("tasks", tasks);
    console.log("currentFilter", CURRENT_FILTER);
  };
  return {
    tasks,
    currentFilter: CURRENT_FILTER,
    filters,
    addNewTask,
    deleteTask,
    editTask,
    changeStatus,
    toggleFilter,
    clearCompleted,
    checkAllTasks,
    logAllData,
    getCurrentTasks,
    getCountOfActiveTasks,
    getCountOfAllTasks,
    getCountOfCompletedTasks,
    tasksLength,
    isAllTasksCompleted,
  };
});
