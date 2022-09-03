<script setup>
import taskStore from '@/store/tasks';

const store = taskStore();

store.fetchTasks();

</script>

<template>
    <div v-for="task in store.currentTasks"
    :key="task.id"
    :class="{ active: task.id === store.active.id }"
    @click="store.setActive(task.id)"
    @keydown="()=>{}">
        <p class="p">{{task.title}}</p>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        background-color: azure;
        cursor: pointer;
    }

    p {
        flex-grow: 1;
        font-weight: 700;
    }

    .active {
        background-color: rgb(210, 255, 239);
    }
</style>
