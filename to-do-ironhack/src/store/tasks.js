import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', () => {
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

  const active = ref(0);

  function setActive(id) {
    const activeTask = currentTasks.value.filter((task) => task.id === id);
    active.value = { ...activeTask };
  }

  function deleteTask(id) {
    const taskToDelete = currentTasks.value.find((task) => task.id === id);
    currentTasks.value.splice(currentTasks.value.indexOf(taskToDelete), 1);
  }

  return {
    currentTasks,
    fetchTasks,
    active,
    setActive,
    deleteTask,
  };
});
