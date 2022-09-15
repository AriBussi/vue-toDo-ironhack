<script setup>
import { computed } from 'vue';
import useTaskStore from '@/store/tasks';
import ControlButton from './ControlButton.vue';

const store = useTaskStore();

const cleanActiveDate = computed(() => {
  const activeInsertionDate = store.active.inserted_at.split('T');
  return {
    date: activeInsertionDate[0],
    time: activeInsertionDate[1].slice(0, 5),
  };
});

</script>

<template>
    <div v-if="store.active" :class="{ show: !store.active}">
        <ControlButton @click="store.active = null">
            <font-awesome-icon icon="fa-solid fa-xmark" size="xl"/>
        </ControlButton>
        <h2>{{store.active.title}}</h2>
        <p v-if="store.active.description">{{store.active.description}}</p>

        <label for="checkbox">
            Completed
            <input type="checkbox" id="checkbox" v-model="store.active.is_complete"/>
        </label>
        <p>Created on
            <span>{{cleanActiveDate.date}}</span> at <span>{{cleanActiveDate.time}}</span>
        </p>
    </div>
</template>

<style scoped>
    div {
        border: 5px solid var(--primary--dark);
        background-color: var(--white);

        text-align: start;
        position: sticky;
        bottom: 0;
        left: 1rem;
        right: 1rem;
        border-top-left-radius: var(--border-radii);
        border-top-right-radius: var(--border-radii);
        padding: 1rem;
    }

    button {
        position: absolute;
        right: 1.1rem;
        top: 1.1rem;
    }

    h2 {
        margin-top: 0;
    }

    span {
        color: var(--primary--dark);
        font-weight: var(--font-bold);
        font-size: .8rem;
    }

    .show {
        display: none;
    }

    .edit {
        margin-right: 2.5rem;
    }
</style>
