<script setup>
import taskStore from '@/store/tasks';

const store = taskStore();

store.fetchTasks();

</script>

<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>
