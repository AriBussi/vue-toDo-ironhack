<script setup>
import taskStore from '@/store/tasks';
import ControlButton from './ControlButton.vue';

const store = taskStore();

store.fetchTasks();
</script>

<template>
    <div v-for="task in store.currentTasks"
    :key="task.id"
    :class="{
        active: store.active && task.id === store.active.id,
        completed: task.is_complete
        }"
    @click="store.setActive(task.id)"
    @keyup.enter="store.setActive(task.id)">
        <p>{{task.title}}</p>
        <ControlButton @click="store.deleteTask(task.id)">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </ControlButton>
    </div>
</template>

<style scoped>
    button {
        margin-right: 0.6rem;
    }

    div {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        background-color: var(--neutral--light);
        cursor: pointer;
    }

    p {
        flex-grow: 1;
        font-weight: 700;
    }

    .active {
        background-color: var(--primary);
    }

    .completed p {
        text-decoration: line-through;
    }
</style>
