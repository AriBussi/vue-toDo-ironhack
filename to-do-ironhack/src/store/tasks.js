import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore(
  'tasks',
  () => {
    const currentTasks = ref([
      {
        id: 0,
        title: 'Create a toDo app',
        description: 'https://my.ironhack.com/cohorts/626174a718a13d002ccb605b/lms/courses/course-v1:IRONHACK+FEWDPT+2022_06_20_CONFORCAT/modules/ironhack-course-chapter_11/units/ironhack-course-chapter_11-sequential-vertical',
      },
      {
        id: 1,
        title: 'Find a place to live',
      },
    ]);

    async function fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      tasks.value = tasks;
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
  // {
  //   persist: true,
  // },
);
