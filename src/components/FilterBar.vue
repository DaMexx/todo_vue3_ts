<script setup lang="ts">

interface Props {
  filters: string[]
}

const props = defineProps<Props>()

</script>

<template>
    <div class="filters">
        <button 
        v-for="(filter, index) in props.filters"
        :key="index"
        class="filters__item"
        >
        {{ filter }}    
        </button>
    </div>
</template>

<style lang="scss" scoped>
.filters{
    
}
</style>