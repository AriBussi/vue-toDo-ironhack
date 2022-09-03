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

  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    tasks.value = tasks;
  };

  const active = ref(0);

  const setActive = (id) => {
    const activeTask = currentTasks.value.filter((task) => task.id === id)[0];
    active.value = { ...activeTask };
  };

  return {
    currentTasks,
    fetchTasks,
    active,
    setActive,
  };
});
