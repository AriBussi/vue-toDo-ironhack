<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useTaskStore from '@/store/tasks';
import useErrorStore from '@/store/error';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const route = useRoute();
const store = useTaskStore();
const errorStore = useErrorStore();

const title = ref(null);
const description = ref(null);

onMounted(() => {
  const toBeEdited = store.fetchTaskById(+route.params.id);

  title.value = toBeEdited.title;
  description.value = toBeEdited.description;
});

function handleEdit() {
  if (!title.value) {
    errorStore.showError('Title is required');
    return;
  }

  const newValues = {
    title: title.value,
    description: description.value,
  };

  store.editTask(route.params.id, newValues);
}
</script>

<template>
    <form @submit.prevent="handleEdit" class="ab-form">
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
            Edit task
        </button>
    </form>
    <ErrorDisplay :error="errorStore.error"/>
</template>
