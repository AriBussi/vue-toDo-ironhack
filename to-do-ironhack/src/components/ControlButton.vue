<script setup>
const props = defineProps({
  type: String,
});
</script>

<template>
    <button type="button" :class="props.type">
        <slot></slot>
    </button>
</template>

<style scoped>
    button {
        background-color: transparent;
        min-width: 2rem;
        height: 2rem;
        border-radius: 6px;
        border: 2px solid var(--neutral--dark);
        color: var(--neutral--dark);
        font-weight: 700;
    }

    .regular:hover {
        border-color: var(--primary--dark);
        color: var(--primary--dark);
    }

    .active:hover {
        border-color: var(--white);
        color: var(--white);
    }

    .danger:hover {
        border: 2px solid var(--danger);
        color: var(--danger);
    }
</style>
