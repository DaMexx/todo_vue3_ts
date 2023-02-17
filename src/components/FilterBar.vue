<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import type {filterType} from "@/types/TodoTypes"
const taskStore = useTasksStore();

const {toggleFilter} = taskStore;
const {getCountOfActiveTasks, getCountOfAllTasks,getCountOfCompletedTasks, filters} = storeToRefs(taskStore)

</script>

<template>
    <div class="filters">
        <button 
        v-for="(filter, index) in filters"
        :key="index"
        class="filters__item"
        @click="toggleFilter(filter.type)"
        >
        {{ filter.type }}  {{ filter.count }}
        </button>
    </div>
</template>

<style lang="scss" scoped>
.filters{
    
}
</style>