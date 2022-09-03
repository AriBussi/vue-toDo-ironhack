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
    @keyup.enter="store.setActive(task.id)">
        <p>{{task.title}}</p>
        <button @click="store.deleteTask(task.id)">X</button>
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
        background-color: rgb(185, 218, 205);
    }

    button {
        background-color: transparent;
        width: 2rem;
        height: 2rem;
        margin-right: 0.6rem;
        border-radius: 6px;
        border: 2px solid rgb(166, 199, 187);
        color: rgb(166, 199, 187);
    }

    .active button {
        border-color: azure;
        color: azure;
    }

</style>
