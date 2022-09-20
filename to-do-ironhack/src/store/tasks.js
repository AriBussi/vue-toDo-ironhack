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

    function getIndexById(id) {
      return currentTasks.value.findIndex((task) => task.id === id);
    }

    function fetchTaskById(id) {
      return currentTasks.value[getIndexById(id)];
    }

    function takeMeHome() {
      active.value = null;
      router.push({ name: 'home' });
    }

    function setActive(id) {
      active.value = fetchTaskById(id);
    }

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
        takeMeHome();
      }
    }

    async function deleteTask(id) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });

      if (error) throw error;
      if (data) {
        currentTasks.value.splice(getIndexById(id), 1);
        takeMeHome();
      }
    }

    async function completeTask(isComplete) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: !isComplete })
        .match({ id: active.value.id });

      if (error) throw error;
      return data;
    }

    async function editTask(id, newValues) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: newValues.title, description: newValues.description })
        .match({ id });

      if (error) throw error;
      if (data) {
        takeMeHome();
      }
    }

    return {
      currentTasks,
      fetchTasks,
      fetchTaskById,
      active,
      setActive,
      deleteTask,
      createTask,
      completeTask,
      editTask,
    };
  },
  {
    persist: true,
  },
);
