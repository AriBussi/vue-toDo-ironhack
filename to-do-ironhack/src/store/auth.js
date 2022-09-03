import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore(
  'user',
  () => {
    const currentUser = ref(null);

    async function fetchUser() {
      const user = await supabase.auth.user();
      currentUser.value = user;
    }

    async function signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      console.log(user);

      if (user) currentUser.value = user;
    }

    return {
      currentUser,
      fetchUser,
      signUp,
    };
  },
  {
    persist: true,
  },
);
