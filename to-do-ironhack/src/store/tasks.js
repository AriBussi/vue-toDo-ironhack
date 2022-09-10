import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore(
  'tasks',
  () => {
    const currentTasks = ref([]);
    const active = ref(null);

    async function fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      currentTasks.value = tasks;
    }

    // async function addTask() {
    //   const { data, error } = await supabase
    //     .from('tasks')
    //     .insert([
    //       { some_column: 'someValue', other_column: 'otherValue' },
    //     ]);
    // }

    function getIndexById(id) {
      return currentTasks.value.findIndex((task) => task.id === id);
    }

    function setActive(id) {
      active.value = currentTasks.value[getIndexById(id)];
    }

    function deleteTask(id) {
      currentTasks.value.splice(getIndexById(id), 1);
      active.value = null;
    }

    return {
      currentTasks,
      fetchTasks,
      active,
      setActive,
      deleteTask,
    };
  },
  {
    persist: true,
  },
);
