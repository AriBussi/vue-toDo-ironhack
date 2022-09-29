<script setup>
import taskStore from '@/store/tasks';
import ControlButton from './ControlButton.vue';

const store = taskStore();

store.fetchTasks();

</script>

<template>
    <TransitionGroup name="list" tag="ul">
        <li v-for="task in store.currentTasks"
        :key="task.id"
        :class="{
            active: task.id === store.active?.id,
            completed: task.is_complete
            }"
        @click="store.setActive(task.id)"
        @keyup.enter="store.setActive(task.id)">
            <p>{{task.title}}</p>
            <div class="controls">
                <router-link v-show="!task.is_complete"
                :to="{ name: 'edit', params: { id: task?.id }}">
                    <ControlButton
                        :type="task.id === store.active?.id ? 'btn-active' : 'btn-regular'" >
                            <font-awesome-icon icon="fa-solid fa-pen" size="xl" fixed-width/>
                    </ControlButton>
                </router-link>
                <ControlButton
                    @click.stop="store.deleteTask(task.id)"
                    type="btn-danger"
                    >
                        <font-awesome-icon icon="fa-solid fa-trash" size="xl" fixed-width/>
                </ControlButton>
            </div>
        </li>
    </TransitionGroup>
</template>

<style scoped>
    .controls {
        width: 120px;
        text-align: right;
    }

    button {
        margin-right: 0.6rem;
    }

    ul {
        padding: 0 0 1rem 0;
        margin: 0;
    }

    li {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        background: var(--primary--light);
        cursor: pointer;
        min-width: 100%;
        border-radius: var(--border-radii--soft);
    }

    li:last-of-type {
        margin: 0;
    }

    p {
        flex-grow: 1;
        font-weight: var(--weight-bold);
    }

    .completed {
        background: var(--neutral--light);
    }

    .completed p {
        text-decoration: line-through;
    }

    .active {
        background: var(--primary);
        transition: all var(--transition--soft);
        transform: scaleX(1.05);
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all var(--transition--soft);
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>
