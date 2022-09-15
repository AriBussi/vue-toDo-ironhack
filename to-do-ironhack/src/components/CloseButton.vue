<script setup>

</script>

<template>
    <button type="button" >
        <slot></slot>
    </button>
</template>

<style>
    button {
        background-color: transparent;
        width: 2rem;
        height: 2rem;
        margin-right: 0.6rem;
        border-radius: 6px;
        border: 2px solid var(--neutral--dark);
        color: var(--neutral--dark);
        font-weight: 700;
    }

    button:hover {
        border-color: var(--danger);
        color: var(--danger);
    }
</style>
