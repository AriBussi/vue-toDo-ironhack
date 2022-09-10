import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import supabase from '../supabase/index';
import useUserStore from './auth';

export default defineStore(
  'tasks',
  () => {
    const store = useUserStore();
    const router = useRouter();
    const currentTasks = ref([]);
    const active = ref(null);

    async function fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('inserted_at', { ascending: false });
      currentTasks.value = tasks;
    }

    async function createTask(task) {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...task, user_id: store.currentUser.id }]);

      if (error) throw error;
      if (data) {
        currentTasks.value = data;
        router.push({ name: 'home' });
      }
    }

    function getIndexById(id) {
      return currentTasks.value.findIndex((task) => task.id === id);
    }

    function setActive(id) {
      active.value = currentTasks.value[getIndexById(id)];
    }

    async function deleteTask(id) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });

      if (error) throw error;
      if (data) {
        currentTasks.value.splice(getIndexById(id), 1);
        active.value = null;
        router.push({ name: 'home' });
      }
    }

    return {
      currentTasks,
      fetchTasks,
      active,
      setActive,
      deleteTask,
      createTask,
    };
  },
  {
    persist: true,
  },
);
