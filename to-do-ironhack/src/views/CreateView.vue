<script setup>
import { ref } from 'vue';
import useTaskStore from '@/store/tasks';
import useErrorStore from '@/store/error';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const errorStore = useErrorStore();

const store = useTaskStore();

const title = ref(null);
const description = ref(null);

function createTask() {
  if (!title.value) {
    errorStore.showError('Title is required');
    return;
  }
  const task = { title: title.value, description: description.value };
  store.createTask(task);
}
</script>

<template>
    <form @submit.prevent="createTask" class="ab-form">
        <label for="title">
            <input
                v-model="title"
                class="ab-form-input"
                type="text"
                placeholder="Task title"
                name="title" >
        </label>
        <label for="description">
            <textarea
                v-model="description"
                class="ab-form-input ab-form-textarea"
                type="text"
                placeholder="Task description"
                name="description" >
            </textarea>
        </label>

        <button
            class="ab-btn ab-btn--primary"
            type="submit">
            Add new task
        </button>
    </form>
    <ErrorDisplay :error="errorStore.error"/>
</template>
