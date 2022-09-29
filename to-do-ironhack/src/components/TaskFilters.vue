<script setup>
import taskStore from '@/store/tasks';

const store = taskStore();

function filter(selected) {
  store.fetchTasks(selected);
}
</script>

<template>
    <span >
        <font-awesome-icon icon="fa-solid fa-filter" size="lg" />
        <label for="filters">
            <select @change="filter($event.target.value)"  name="filters" id="filters">
                <option value="all">All tasks</option>
                <option value="complete">Complete</option>
                <option value="ongoing">Ongoing</option>
            </select>
        </label>
    </span>
</template>

<style scoped>
    select {
        appearance: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        outline: none;
        text-align: center;
        cursor: pointer;
    }
</style>
