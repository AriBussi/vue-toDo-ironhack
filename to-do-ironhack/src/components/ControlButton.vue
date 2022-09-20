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
        border: 2px solid transparent;
        color: var(--neutral--dark);
        font-weight: var(--weight-bold);
        transition: color var(--transition--soft), border var(--transition--soft);
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
