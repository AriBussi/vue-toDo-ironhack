<script setup>
const props = defineProps({
  error: String,
});
</script>

<template>
    <span class="error-message" v-if="error" >{{props.error}}</span>
</template>

<style scoped>
    .error-message {
        color: var(--danger);
        font-weight: 600;
        display: block;
        margin-top: 1rem;
        font-size: .8rem;
    }
</style>
