import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore(
  'error',
  () => {
    const error = ref(null);

    function showError(er) {
      error.value = er;
      setTimeout(() => {
        error.value = null;
      }, 4000);
    }

    return {
      error,
      showError,
    };
  },
  {
    persist: true,
  },
);
