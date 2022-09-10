import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore(
  'tasks',
  () => {
    const currentTasks = ref([]);

    async function fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      currentTasks.value = tasks;
    }

    const active = ref(null);

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
