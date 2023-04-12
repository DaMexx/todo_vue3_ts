<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import type { filterType } from "@/types/index.js";
const taskStore = useTasksStore();

const { toggleFilter } = taskStore;
const { filters } = storeToRefs(taskStore);

const formatString = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
</script>

<template>
  <div class="filters">
    <button
      v-for="(filter, index) in filters"
      :key="index"
      class="filters__item"
      :class="{}"
      @click="toggleFilter(filter.type)"
    >
      {{ formatString(filter.type) }} {{ filter.count }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
// .filters {
//   display: flex;
//   justify-content: center;
//   gap: 2px;

//   &__item {
//     border: none;

//     &:hover {
//       background: blue;
//     }
//     &--active {
//       background: red;
//     }
//   }
// }
</style>
