// import { ref, computed } from "vue";
// import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { taskType } from "@/types/TodoTypes";

// export const useTasksStore = defineStore("tasks", () => {
//   const tasks: Ref<taskType[]> = ref([
//   ]);
//   const currentFilter: Ref<string> = ref('');

//   const addNewTask = (content: string) => {
//     if (content.trim()) {
//       let task = {
//         id: Date.now(),
//         content: content,
//         status: false,
//       };
//       tasks.value.push(task);
//     }
//   };

//   const deleteTask = (id: number) => {
//     const taskIndex = tasks.value.findIndex((task) => task.id === id);
//     tasks.value.splice(taskIndex, 1);
//   };

//   const editTask = (id: number, content: string) => {
//     const taskIndex = tasks.value.findIndex((task) => task.id === id);
//     tasks.value[taskIndex].content = content
//   }

//   const changeStatus = (id: number) => {
//     const taskIndex = tasks.value.findIndex((task) => task.id === id);
//     tasks.value[taskIndex].status = !tasks.value[taskIndex].status
//   }

//   return { tasks, addNewTask, deleteTask, editTask, changeStatus };
// });
export const useTasksStore = defineStore({
  id: 'task',
  state: ()=>({
    tasks: [] as taskType[],
    currentFilter: '' as string
  }),
  getters:{

  },
  actions: {
    addNewTask(content: string) {
      if (content.trim()) {
        let task = {
          id: Date.now(),
          content: content,
          status: false,
        };
        this.tasks.push(task);
      }
    },

    deleteTask(id: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(taskIndex, 1);
    },

    editTask(id: number, content: string) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks[taskIndex].content = content
    },
    
    changeStatus(id: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks[taskIndex].status = !this.tasks[taskIndex].status
    }
  }
})
