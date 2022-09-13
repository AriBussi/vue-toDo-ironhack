<script setup>
import { computed } from 'vue';
import useTaskStore from '@/store/tasks';

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
    <div>
        <button type="button">x</button>
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
        border: 5px solid var(--primary);

        text-align: start;
        position: absolute;
        bottom: -6px;
        left: 6px;
        right: 6px;
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
</style>
