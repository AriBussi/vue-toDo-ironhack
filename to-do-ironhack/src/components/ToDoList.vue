<script setup>
import taskStore from '@/store/tasks';

const store = taskStore();

store.fetchTasks();

</script>

<template>
    <div v-for="task in store.currentTasks"
    :key="task.id">
        <p class="p">{{task.title}}</p>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        background-color: azure;
    }

    p {
        flex-grow: 1;
    }
</style>
