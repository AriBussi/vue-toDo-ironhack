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
      const { user, error } = await supabase.auth.signUp(email, password);

      if (error) throw error;

      if (user) currentUser.value = user;
    }

    async function logIn(email, password) {
      const { user, error } = await supabase.auth.signIn(email, password);

      if (error) throw error;

      if (user) currentUser.value = user;
    }

    async function logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }

    return {
      currentUser,
      fetchUser,
      signUp,
      logIn,
      logOut,
    };
  },
  {
    persist: true,
  },
);
