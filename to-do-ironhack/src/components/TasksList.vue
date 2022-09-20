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
        active: task.id === store.active?.id,
        completed: task.is_complete
        }"
    @click="store.setActive(task.id)"
    @keyup.enter="store.setActive(task.id)">
        <p>{{task.title}}</p>
        <router-link class="ab-nav-item" :to="{ name: 'edit', params: { id: task?.id }}">
            <ControlButton
                :type="task.id === store.active?.id ? 'active' : 'regular'" >
                    <font-awesome-icon icon="fa-solid fa-pen" size="xl" fixed-width/>
            </ControlButton>
        </router-link>
        <ControlButton
            @click.stop="store.deleteTask(task.id)"
            type="danger"
            >
                <font-awesome-icon icon="fa-solid fa-trash" size="xl" fixed-width/>
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
        font-weight: var(--weight-bold);
        margin: 1rem;
    }

    .active {
        background-color: var(--primary);
    }

    .completed p {
        text-decoration: line-through;
    }
</style>
