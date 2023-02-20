import { ref, computed, reactive, nextTick } from "vue";
import { defineStore } from "pinia";
import type { taskType, filterType } from "@/types/TodoTypes";

export const useTasksStore = defineStore("tasks", () => {
  const lS: taskType[] = JSON.parse(localStorage.tasks || "{}")._value;

  const tasks = ref<taskType[]>(lS || []);
  const currentFilter = ref<string>(localStorage.filter || "all");

  const addNewTask = (content: string): void => {
    if (content.trim()) {
      let task = {
        id: Date.now(),
        content: content,
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
    if (currentFilter.value === "all") {
      return tasks.value;
    } else if (currentFilter.value === "active") {
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

  const filters = ref<filterType[]>([
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

  // const activeFilter = reactive<filterType>({
  //   type: "all",
  //   count: getCountOfAllTasks.value,
  // });
  // const allFilter = reactive<filterType>({
  //   type: "active",
  //   count: getCountOfActiveTasks.value,
  // });
  // const completedFilter = reactive<filterType>({
  //   type: "complete",
  //   count: getCountOfCompletedTasks.value,
  // });

  // const filters = ref<filterType[]>([activeFilter, allFilter, completedFilter]);

  const toggleFilter = (filter: string): void => {
    localStorage.setItem("filter", filter);
    currentFilter.value = filter;
  };

  const clearCompleted = (): void => {
    tasks.value = getActiveTasks.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const checkAllTasks = (status: boolean) => {
    tasks.value.forEach((el) => (el.status = status));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return {
    tasks,
    currentFilter,
    filters,
    addNewTask,
    deleteTask,
    editTask,
    changeStatus,
    toggleFilter,
    clearCompleted,
    checkAllTasks,
    getCurrentTasks,
    getCountOfActiveTasks,
    getCountOfAllTasks,
    getCountOfCompletedTasks,
    tasksLength,
    isAllTasksCompleted,
  };
});
