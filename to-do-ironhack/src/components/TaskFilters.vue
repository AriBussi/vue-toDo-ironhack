<!-- eslint-disable vuejs-accessibility/label-has-for -->
<script setup>

</script>

<template>
    <span >
        <font-awesome-icon icon="fa-solid fa-filter" size="lg" />
        <label for="filters">
            <select  name="filters" id="filters">
                <option value="all">All tasks</option>
                <option value="completed">Complete</option>
                <option value="active">Ongoing</option>
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
    }
</style>
