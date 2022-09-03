import { ref } from 'vue';
import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore(
  'user',
  () => {
    const currentUser = ref(null);

    const fetchUser = async () => {
      const user = await supabase.auth.user();
      currentUser.value = user;
    };

    const signUp = async (email, password) => {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      console.log(user);

      if (user) currentUser.value = user;
    };

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

// export default defineStore('user', {
//   state: () => ({
//     user: null,
//   }),

//   actions: {
//     async fetchUser() {
//       const user = await supabase.auth.user();
//       this.user = user;
//     },
//     async signUp(email, password) {
//       const { user, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) throw error;
//       if (user) this.user = user;
//     },
//   },
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'user',
//         storage: localStorage,
//       },
//     ],
//   },
// });
